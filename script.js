onload = function() {
	var {body} = document;
	body.appendChild(canvas);
	onresize();
	player.x = (game.width - player.s)/2;
	player.y = (game.height - player.s)/2;
	for(let i = 0; i < 5; i++) Enemy.spawn(new Enemy)
	for(let i = 0; i < 5; i++) Enemy.spawn(new Walker)
	for(let i = 0; i < 5; i++) Enemy.spawn(new Stayer)
	update();
};
onresize = function() {
	Object.assign(canvas, {
		width: innerWidth,
		height: innerHeight
	});
	ctx.scale(scale, scale);
}
onblur = function() {
	cancelAnimationFrame(request);
}
onfocus = function() {request = requestAnimationFrame(update);}
var game = {
	get width() {return innerWidth/scale},
	get height() {return innerHeight/scale}
}
function clear() {
	ctx.beginPath();
	ctx.rect(0, 0, game.width, game.height);
	ctx.fillStyle = "#0007"; ctx.fill();
}
var last = Date.now(), request;
function update() {
	var now = Date.now();
	if(now < last + (1000)/fps) {
		onfocus();
		return;
	}else last = now;
	if(player.hp > 0) player.update();
	for(let bullet of bullets) bullet.update();
	for(let a = 0; a < enemies.length; a++) {
		let enemy = enemies[a];
		enemy.update();
		if(player.hp > 0) if(Entity.isTouching(player, enemy)) {
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
				if(x <= s) {
					enemy.velocity.x += bullet.velocity.x * -x;
				}
				if(y <= s) {
					enemy.velocity.y += bullet.velocity.y * -y;
				}
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
	if(player.hp > 0) player.draw();
	for(let enemy of enemies) enemy.draw();
	for(let bullet of bullets) bullet.draw();
	enemies = enemies.filter((enemy) => enemy.hp > 0);
	bullets = bullets.filter((bullet) => bullet.time > 0);
	onfocus();
}
var keys = {};
onkeydown = function(pressed) {
	if(!keys[pressed.key]) keys[pressed.key] = 1;
	else keys[pressed.key] = 3;
}
onkeyup = function(released) {
	delete keys[released.key];
}