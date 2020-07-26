function menu() {
	clear();
	var text, size;
	switch(menu.active) {
		case "player":
			let {
				players=[new Player, new Player2, new Player3, new Player4],
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
			text = "Ship Select";
			ctx.font = `${edge}px Sans`;
			size = ctx.measureText(text);
			ctx.fillStyle = "white";
			ctx.fillText(text, (game.width - size.width)/2, edge);
			for(let i = 0; i < players.length; i++) {
				let player = players[i];
				player.s = edge;
				player.my = game.height/2;
				player.mx = (i - selected - offset) * (edge * 3) + game.width/2;
				player.draw();
			}
			let desc = this.descriptions[selected];
			ctx.font = `${edge/3}px Sans`;
			for(let i = 0; i < desc.length; i++) {
				text = desc[i];
				size = ctx.measureText(text);
				ctx.fillStyle = players[selected].color;
				ctx.fillText(text, (game.width - size.width)/2, edge/3 * (i + 13));
			}
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
				let sel = [Player, Player2, Player3, Player4]
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
			"Four-way Movement",
			"Four-way Shooting",
			"",
			"Can't argue with the classics."
		],
		[
			"Four-way Movement",
			"Directional Shooting",
			"",
			"Close shooting, not recommeded"
		],
		[
			"Directional Movement",
			"Directional Shooting",
			"",
			"Totally not stolen from another game"
		],
		[
			"Directional Movement",
			"Four-way Shooting",
			"",
			"I don't know why I added this.",
			"But I don't regret it"
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
		text = `${key[0].toUpperCase() + key.slice(1)} : ${keyBind[key]}`;
		size = ctx.measureText(text);
		ctx.fillStyle = i == selected? "#000": "#77f";
		ctx.beginPath();
		ctx.rect2((game.width - size.width - edge/4)/2, edge/3 * i - edge/6, size.width + edge/4, edge/4, edge/8);
		ctx.fill();
		ctx.fillStyle = "#00f";
		ctx.fillText(text, (game.width - size.width)/2, edge/3 * (i + 0.05));
	}
	bindMenu.selected = selected;
}