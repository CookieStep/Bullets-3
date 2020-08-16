function menu() {
	clear();
	var text, size, edge = game.height/6, desc;
	switch(menu.active) {
		case "player":
			var {
				players=[new Player, new Player2, new Player3, new Player4, new HPlayer, new HPlayer2, new HPlayer3, new HPlayer4],
				selected=0,
				offset=0,
				moveTo=selected
			} = this;
			if(this.screenLines) {
				ctx.beginPath();
				ctx.lineWidth = 1/scale;
				ctx.strokeStyle = "white";
				ctx.moveTo(0, edge);
				ctx.lineTo(game.width, edge);
				ctx.moveTo(0, edge * 5);
				ctx.lineTo(game.width, edge * 5);
				ctx.stroke();
			}
			ctx.scale(1/scale, 1/scale);
			text = "Ship Select";
			ctx.font = `${edge * scale}px Sans`;
			size = ctx.measureText(text);
			ctx.fillStyle = "white";
			ctx.fillText(text, (canvas.width - size.width)/2, edge * scale);
			ctx.scale(scale, scale);
			for(let i = 0; i < players.length; i++) {
				let player = players[i];
				player.s = edge;
				player.my = game.height/2;
				player.mx = (i - selected - offset) * (edge * 3) + game.width/2;
				player.draw();
			}
			ctx.scale(1/scale, 1/scale);
			desc = this.descriptions[selected];
			ctx.font = `${edge/3 * scale}px Sans`;
			for(let i = 0; i < desc.length; i++) {
				text = desc[i];
				size = ctx.measureText(text);
				ctx.fillStyle = players[selected].color;
				ctx.fillText(text, (canvas.width - size.width)/2, scale * edge/3 * (i + 12 - (i == 0? 6: 0)));
			}
			ctx.scale(scale, scale);
			var n = 10;
			if(moveTo != selected) {
				offset += sign(moveTo - selected) * 1/n;
				let s = offset % 1;
				selected += (offset - s);
				offset %= 1;
			}else if(offset > 0) {
				offset -= 1/n;
				if(offset < 0) offset = 0;
			}else if(offset < 0) {
				offset += 1/n;
				if(offset > 0) offset = 0;
			}
			if(keys.left2 == 1 || keys.left2 == 3) {
				keys.left2 = 2;
				moveTo--;
				if(moveTo < 0) moveTo++;
			}
			if(keys.right2 == 1 || keys.right2 == 3) {
				keys.right2 = 2;
				moveTo++;
				if(moveTo >= players.length) moveTo--;
			}
			if(keys.select == 1) {
				let sel = [Player, Player2, Player3, Player4, HPlayer, HPlayer2, HPlayer3, HPlayer4];
				player = new sel[selected];
				this.players2 = [];
				let unlocked = [true, Boolean(localStorage.dash), Boolean(localStorage.control)];
				for(let i = 0; i < unlocked.length; i++) {
					if(!unlocked[i]) continue;
					let player = new sel[selected];
					player.power = i;
					player.color2 = this.powCol[i];
					this.players2.push(player);
				}
				player.x = (game.width - player.s)/2;
				player.y = (game.height - player.s)/2;
				keys.select = 2;
				if(this.players2.length > 1) this.active = "power";
				else{
					this.active = "level";
					player.color2 = this.powCol[0];
				}
			}
			Object.assign(this, {
				players,
				selected,
				offset,
				moveTo
			});
		break;
		case "power":
			var n = 10, {players2, selected2=0, moveTo2=selected2, offset2=0, hardcore} = this;
			if(moveTo2 != selected2) {
				offset2 += sign(moveTo2 - selected2) * 1/n;
				let s = offset2 % 1;
				selected2 += (offset2 - s);
				offset2 %= 1;
			}else if(offset2 > 0) {
				offset2 -= 1/n;
				if(offset2 < 0) offset2 = 0;
			}else if(offset2 < 0) {
				offset2 += 1/n;
				if(offset2 > 0) offset2 = 0;
			}
			if(keys.left2 == 1 || keys.left2 == 3) {
				keys.left2 = 2;
				moveTo2--;
				if(moveTo2 < 0) moveTo2++;
			}
			if(keys.right2 == 1 || keys.right2 == 3) {
				keys.right2 = 2;
				moveTo2++;
				if(moveTo2 >= players2.length) moveTo2--;
			}
			for(let i = 0; i < players2.length; i++) {
				let player = players2[i];
				player.s = edge;
				player.my = game.height/2;
				player.mx = (i - selected2 - offset2) * (edge * 3) + game.width/2;
				player.draw();
			}
			ctx.scale(1/scale, 1/scale);
			text = "Power Select";
			ctx.font = `${edge * scale}px Sans`;
			size = ctx.measureText(text);
			ctx.fillStyle = "white";
			ctx.fillText(text, (canvas.width - size.width)/2, edge * scale);
			desc = this.powdesc[selected2];
			ctx.font = `${edge/3 * scale}px Sans`;
			for(let i = 0; i < desc.length; i++) {
				text = desc[i];
				size = ctx.measureText(text);
				ctx.fillStyle = players2[selected2].color2;
				if(i == 4) ctx.fillStyle = "#fa5";
				if(i == 5) ctx.fillStyle = "#afa";
				ctx.fillText(text, (canvas.width - size.width)/2, scale * edge/3 * (i + 12 - (i == 0? 6: 0)));
			}
			if(keys.back == 1) {
				this.active = "player";
				keys.back = 2;
			}
			if(keys.select == 1) {
				let sel = [Player, Player2, Player3, Player4, HPlayer, HPlayer2, HPlayer3, HPlayer4];
				player = new sel[this.selected];
				player.power = players2[selected2].power;
				player.color2 = this.powCol[players2[selected2].power];
				player.x = (game.width - player.s)/2;
				player.y = (game.height - player.s)/2;
				keys.select = 2;
				this.active = "level";
			}
			ctx.scale(scale, scale);
			Object.assign(this, {
				players2,
				selected2,
				offset2,
				moveTo2
			});
		break;
		case "level":
			let {
				levels,
				bosses
			} = this;
			if(!Number(localStorage.level)) {
				this.active = false;
				return;
			}
			var max = Number(localStorage.level);
			if(max > window.levels.length - 1) max = window.levels.length - 1;
			ctx.scale(1/scale, 1/scale);
			text = "Level Select";
			ctx.font = `${edge * scale}px Sans`;
			size = ctx.measureText(text);
			ctx.fillStyle = "white";
			ctx.fillText(text, (canvas.width - size.width)/2, edge * scale);
			if(level % 10 == 9) {
				let n = (level + 1)/10
				ctx.fillStyle = bosses[n - 1];
				desc = this.bossdesc[n - 1];
				text = `Boss ${n}`;
			}else{
				let n = floor(level/10);
				ctx.fillStyle = levels[n];
				desc = this.leveldesc[n];
				text = `Level ${level + 1}`;
			}
			ctx.font = `${edge * scale * 3/4}px Veranda`;
			size = ctx.measureText(text);
			var wid = size.width/scale, hei = (game.height + edge * 1/4)/2;
			ctx.fillText(text, (canvas.width - size.width)/2, (game.height + edge * 3/4) * scale/2);
			ctx.font = `${edge/3 * scale}px Sans`;
			for(let i = 0; i < desc.length; i++) {
				if(i) ctx.font = `${edge/3 * scale}px Sans`;
				else ctx.font = `${edge * 3/6 * scale}px Sans`;
				text = desc[i];
				size = ctx.measureText(text);
				ctx.fillText(text, (canvas.width - size.width)/2, scale * edge/3 * (i + 12 - (i == 0? 6: 0)));
			}
			ctx.scale(scale, scale);
			if(level > 0) {
				ctx.beginPath();
				ctx.moveTo((game.width - wid)/2 - edge/2, hei);
				ctx.lineTo((game.width - wid)/2 - edge/8, hei + edge/4);
				ctx.lineTo((game.width - wid)/2 - edge/8, hei - edge/4);
				ctx.closePath();
				ctx.fill();
			}
			if(level < max) {
				ctx.beginPath();
				ctx.moveTo((game.width + wid)/2 + edge/2, hei);
				ctx.lineTo((game.width + wid)/2 + edge/8, hei + edge/4);
				ctx.lineTo((game.width + wid)/2 + edge/8, hei - edge/4);
				ctx.closePath();
				ctx.fill();
			}
			if(keys.left2 == 1 || keys.left2 == 3) {
				keys.left2 = 2;
				level--;
				if(level < 0) level++;
			}
			if(keys.right2 == 1 || keys.right2 == 3) {
				keys.right2 = 2;
				level++;
				if(level > max) level--;
			}
			if(keys.back == 1) {
				keys.back = 2;
				if(this.players2.length > 1) this.active = "power";
				else this.active = "player";
			}
			if(keys.select == 1) {
				keys.select = 2;
				this.active = false;
			}
		break;
	}
}
Object.assign(menu, {
	active: "player",
	screenLines: false,
	descriptions: [
		[
			"Softcore",
			"Four-way Movement",
			"Four-way Shooting",
			"",
			"Can't argue with the classics."
		],
		[
			"Softcore",
			"Four-way Movement",
			"Directional Shooting",
			"",
			"Close shooting. not recommeded."
		],
		[
			"Softcore",
			"Directional Movement",
			"Directional Shooting",
			"",
			"Totally not stolen from another game."
		],
		[
			"Softcore",
			"Directional Movement",
			"Four-way Shooting",
			"",
			"I don't know why I added this...",
			"But I don't regret it."
		],
		[
			"HARDCORE",
			"Four-way Movement",
			"Four-way Shooting",
			"",
			"Remain. Calm."
		],
		[
			"HARDCORE",
			"Four-way Movement",
			"Directional Shooting",
			"",
			"Using this ship. Not recommended."
		],
		[
			"HARDCORE",
			"Directional Movement",
			"Directional Shooting",
			"",
			"Will you be the one?"
		],
		[
			"HARDCORE",
			"Directional Movement",
			"Four-way Shooting",
			"",
			"Here we go again."
		]
	],
	levels: [
		"#faa",
		"#faf",
		"#f55"
	],
	bosses: [
		"#f50",
		"#5aa"
	],
	leveldesc: [
		[
			"Stage 1",
			"The Begining",
			"Basic enemies with",
			"movement that lacks any sense of purpose."
		],
		[
			"Stage 2",
			"Step up, step up!",
			"Movement is more layered and",
			"a bit harder to pin down."
		],
		[]
	],
	bossdesc: [
		[
			"Tracer Boss",
			"The first challenge of many.",
			"The name is a big hint."
		],
		[
			"MoveMaster",
			"Master the pattern,",
			"Master the movement,",
			"Master the boss."
		],
		[]
	],
	powCol: [
		"#aff",
		"#ffa",
		"#faf"
	],
	powdesc: [
		[
			"Shoot",
			"Fire bullets at your enemies.",
			"",
			"",
			"Damage: 1",
			"Reload: 10"
		],
		[
			"Dash",
			"Dash at your enemies while invincible",
			"",
			"",
			"Damage: 3",
			"Reload: 40"
		],
		[
			"Remote Bullets",
			"Have total control over your bullets",
			"Press Glide to summon",
			"",
			"Damage: 3",
			"Reload: 30"
		]
	]
});
function bindMenu() {
	let i = 0;
	let edge = game.height/6;
	ctx.font = `${edge/4}px Sans`;
	clear();
	var {selected} = bindMenu;
	for(let key in keyBind) ++i;
	let m = i;
	i = 0;
	ctx.beginPath();
	ctx.fillStyle = "#aaf";
	ctx.rect2(game.width* 2/5, 0, game.width/5, edge/3 * (m + 2), game.width/10);
	if(mouse.click) {
		if(mouse.x > game.width * 2/5 && mouse.x < game.width * 3/5) {
			selected = (mouse.y + edge/6) * 3/edge;
			selected = Math.floor(selected);
			if(selected == m + 1) {
				resetKeybind();
				setupKeybind();
				localStorage.keyBind = JSON.stringify(keyBind);
			}
			if(selected >= m + 1 || selected < 1) selected = undefined;
			mouse.click = false;
		}else selected = undefined;
	}
	ctx.fill();
	ctx.font = `${edge/4 * scale}px Sans`;
	for(let key in keyBind) {
		i++;
		if(i == selected && bindMenu.add) {
			keyBind[key] = bindMenu.add;
			delete bindMenu.add;
			setupKeybind();
			localStorage.keyBind = JSON.stringify(keyBind);
		}
		text = `${key[0].toUpperCase() + key.slice(1)} : ${keyBind[key]}`;
		size = ctx.measureText(text);
		ctx.fillStyle = i == selected? "#000": "#77f";
		ctx.beginPath();
		ctx.rect2((game.width - size.width/scale - edge/4)/2, edge/3 * i - edge/6, size.width/scale + edge/4, edge/4, edge/8);
		ctx.fill();
		ctx.fillStyle = "#00f";
		ctx.scale(1/scale, 1/scale);
		ctx.fillText(text, (canvas.width - size.width)/2, edge/3 * (i + 0.05) * scale);
		ctx.scale(scale, scale);
	}
	{
		i++;
		ctx.font = `${edge/4 * scale}px Sans`;
		text = "Reset keybind";
		size = ctx.measureText(text);
		ctx.fillStyle = "#f77";
		ctx.beginPath();
		ctx.rect2((game.width - size.width/scale - edge/4)/2, edge/3 * i - edge/6, size.width/scale + edge/4, edge/4, edge/8);
		ctx.fill();
		ctx.fillStyle = "#f00";
		ctx.scale(1/scale, 1/scale);
		ctx.fillText(text, (canvas.width - size.width)/2, edge/3 * (i + 0.05) * scale);
		ctx.scale(scale, scale);
	}
	bindMenu.selected = selected;
}