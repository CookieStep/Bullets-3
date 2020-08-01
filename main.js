function main() {
	genLevel(level);
	if(player.alive) player.update();
	for(let bullet of bullets) bullet.update();
	for(let xp of exp) {
		xp.update();
		if(Entity.isTouching(player, xp) && player.alive) {
			xp.onHit(player);
			while(score + xp.xp * multiplier >= ((added + 1) * 100) + (pow(2, added) * 10)) {
				lives++; added++;
			}
			score += xp.xp * multiplier;
		}
	}
	for(let a = 0; a < enemies.length; a++) {
		let enemy = enemies[a];
		enemy.update();
		if(player.alive) if(Entity.isTouching(player, enemy)) {
			player.onHit(enemy);
			enemy.onHit(player);
		}
		for(let bullet of bullets) {
			if(Entity.isTouching(enemy, bullet) && enemy.alive && bullet.alive) {
				bullet.onHit(enemy);
				enemy.onHit(bullet);
				let enemy2 = bullet;
				let s = (enemy.s + enemy2.s)/2,
					x = enemy.mx - enemy2.mx,
					y = enemy.my - enemy2.my;
				if(x <= s) enemy.velocity.x += bullet.velocity.x * -x;
				if(y <= s) enemy.velocity.y += bullet.velocity.y * -y;
			}
		}
		for(let b = a + 1; b < enemies.length; b++) {
			let enemy2 = enemies[b];
			if(Entity.isTouching(enemy, enemy2)) {
				let s = (enemy.s + enemy2.s)/2,
					x = enemy.mx - enemy2.mx,
					y = enemy.my - enemy2.my;
				if(x <= s) {
					enemy.velocity.x += x/10;
					enemy2.velocity.x -= x/10;
				}
				if(y <= s) {
					enemy.velocity.y += y/10;
					enemy2.velocity.y -= y/10;
				}
				Wall.play();
			}
		}
	}
	for(let a = 0; a < enemies2.length; a++) {
		let enemy = enemies2[a];
		enemy.update();
		if(player.alive) if(Entity.isTouching(player, enemy)) {
			enemy.onHit(player);
			player.onHit(enemy);
		}
		for(let bullet of bullets) {
			if(Entity.isTouching(enemy, bullet) && enemy.alive && bullet.alive) {
				enemy.onHit(bullet);
				bullet.onHit(enemy);
			}
		}
	}
	clear();
	if(player.alive) player.draw();
	for(let enemy of enemies) enemy.draw();
	for(let enemy of enemies2) enemy.draw();
	for(let bullet of bullets) bullet.draw();
	for(let xp of exp) xp.draw();
	ctx.scale(1/scale, 1/scale);
	if(tip.time > 0) {
		tip.time--;
		let size = canvas.height/6, i = 0;
		for(let text of tip.text) {
			ctx.font = `${size/2}px Comic Sans MS`;
			ctx.fillStyle = tip.color;
			ctx.fillText(text, (canvas.width - ctx.measureText(text).width)/2, size * (2 + i++));
		}
	}
	let size = canvas.height/6, text = `Level ${level + 1}`;
	if(level % 10 == 9) text = `Boss ${(level + 1)/10}`;
	ctx.font = `${size/2}px Arial`;
	ctx.fillStyle = player.hardcore? "#fa5": "#aaf";
	ctx.fillText(text, (canvas.width - ctx.measureText(text).width), size/2);
	let mult = `x${floor(multiplier * 100)/100}`, m2 = `${floor(multiplier)}`;
	if(mult.length - m2.length == 1) {
		mult += ".00"
	}else if(mult.length - m2.length == 3) mult += "0";
	ctx.fillText(`Score: ${round(score)} (${mult})`, 0, size/2);
	ctx.scale(scale, scale);
	let x = (game.width - lives)/2;
	ctx.beginPath();
	ctx.strokeStyle = player.color;
	ctx.lineWidth = 1/10;
	for(var i = 0; i < lives && !player.hardcore; i++) {
		ctx.rect2(x + i, 0, 1, 1, 1/3);
	}
	ctx.stroke();
	ctx.beginPath();
	enemies = enemies.filter((enemy) => enemy.alive);
	enemies2 = enemies2.filter((enemy) => enemy.alive);
	exp = exp.filter((xp) => xp.alive);
	bullets = bullets.filter((bullet) => bullet.alive);
	if(keys.select && !player.alive) {
		lives = 3;
		added = 0;
		score = 0;
		exp = [];
		bullets = [];
		enemies = [];
		enemies2 = [];
		multiplier = 1;
		player.inv = 50;
		player.hp = player.maxHp;
		player.velocity = {x: 0, y: 0};
		player.x = (game.width - player.s)/2;
		player.y = (game.height - player.s)/2;
		setupLevels();
		tip.time = 0;
	}
}
var score = 0;
function tip(text, time, color) {
	Object.assign(tip, {text, time, color});
	localStorage.tipNum++; tipNum++;
}
function display(text, time, color) {
	Object.assign(tip, {text, time, color});
}