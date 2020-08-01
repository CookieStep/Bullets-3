function menu() {
	clear();
	var text, size;
	switch(menu.active) {
		case "player":
			let {
				players=[new Player, new Player2, new Player3, new Player4, new HPlayer, new HPlayer2, new HPlayer3, new HPlayer4],
				selected=0,
				offset=0,
				moveTo=0
			} = this;
			let edge = game.height/6;
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
			let desc = this.descriptions[selected];
			ctx.font = `${edge/3 * scale}px Sans`;
			for(let i = 0; i < desc.length; i++) {
				text = desc[i];
				size = ctx.measureText(text);
				ctx.fillStyle = players[selected].color;
				ctx.fillText(text, (canvas.width - size.width)/2, scale * edge/3 * (i + 12 - (i == 0? 6: 0)));
			}
			ctx.scale(scale, scale);
			let n = 10;
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
			if(keys.select) {
				let sel = [Player, Player2, Player3, Player4, HPlayer, HPlayer2, HPlayer3, HPlayer4]
				player = new sel[selected];
				player.x = (game.width - player.s)/2;
				player.y = (game.height - player.s)/2;
				this.active = false;
			}
			Object.assign(this, {
				players,
				selected,
				offset,
				moveTo
			});
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
	ctx.rect2(game.width* 2/5, 0, game.width/5, edge/3 * (m + 1), game.width/10);
	if(mouse.click) {
		selected = (mouse.y + edge/6) * 3/edge;
		selected = Math.floor(selected);
		if(selected >= m + 1 || selected < 1) selected = undefined;
		mouse.click = false;
	}
	ctx.fill();
	for(let key in keyBind) {
		i++;
		if(i == selected && bindMenu.add) {
			keyBind[key] = bindMenu.add;
			delete bindMenu.add;
			setupKeybind();
			localStorage.keyBind = JSON.stringify(keyBind);
		}
		ctx.font = `${edge/4 * scale}px Sans`;
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
	bindMenu.selected = selected;
}