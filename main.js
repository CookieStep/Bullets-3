function main() {
	genLevel(level);
	if(player.alive) player.update();
	for(let bullet of bullets) bullet.update();
	for(let a = 0; a < enemies.length; a++) {
		let enemy = enemies[a];
		enemy.update();
		if(player.alive) if(Entity.isTouching(player, enemy)) {
			player.onHit(enemy);
			enemy.onHit(player);
		}
		for(let bullet of bullets) {
			if(Entity.isTouching(enemy, bullet)) {
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
			}
		}
	}
	clear();
	if(player.alive) player.draw();
	for(let enemy of enemies) enemy.draw();
	for(let bullet of bullets) bullet.draw();
	if(tip.time > 0) {
		tip.time--;
		let size = game.height/6, {text} = tip;
		ctx.font = `${size/2}px Comic Sans`;
		ctx.fillStyle = tip.color;
		ctx.fillText(text, (game.width - ctx.measureText(text).width)/2, size * 2);
	}
	enemies = enemies.filter((enemy) => enemy.alive);
    bullets = bullets.filter((bullet) => bullet.alive);
}
function tip(text, time, color) {
	Object.assign(tip, {text, time, color});
	localStorage.tipNum++; tipNum++;
}