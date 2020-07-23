class Enemy extends Entity{
	color = "#fff";
	static spawn(what) {
		function check() {
			if(enemies.length) for(let enemy of enemies)
				if(Entity.isTouching(what, enemy) && what.uid != enemy.uid)
					return true;
		}
		var i = 0, chk;
		do{
			assign(what, {
				x: random(game.width - what.s),
				y: random(game.height - what.s)
			});
			chk = check() || Entity.distance(player, what) < 15;
			if(chk && i++ > 100) {
				return;
			}
		}while(chk)
		enemies.push(what)
	}
}
class Walker extends Enemy{
	color = "#faa";
	tick() {
		if(!this.dis) {
			this.dis += this.acl;
			this.rad = random(PI * 2);
		}else this.dis += this.acl;
		this.isMoving = true;
	}
	draw() {
		var {x, y, s, color, inv, hp, maxHp} = this;
		ctx.beginPath();
		ctx.lineWidth = s/10;
		ctx.fillStyle = color;
		ctx.strokeStyle = (inv % 10 > 5)? "white": color;
		ctx.rect(x, y, s, s, s/3);
		ctx.globalAlpha = hp/maxHp;
		ctx.fill();
		ctx.globalAlpha = 1;
		ctx.stroke();
	}
}
class Stayer extends Enemy{
	color = "#afa";
	r = random(PI * 2);
	tick() {
		var {velocity} = this;
		velocity.x += cos(this.r) * this.acl;
		velocity.y += sin(this.r) * this.acl;
		this.isMoving = true;
	}
	hitWall(x, y) {
		var {r, velocity} = this;
		velocity.x *= x;
		velocity.y *= y;
		var dir = {x: cos(r), y: sin(r)};
		dir.x *= x; dir.y *= y;
		this.r = atan2(dir.y, dir.x);
	}
	draw() {
		var {x, y, s, rad, color, inv, hp, maxHp, r} = this;
		s /= 2; x += s; y += s; rad += PI/2;
		rad = (rad + r)/2;
		ctx.beginPath();
		s /= sin(PI / 4);
		var a = cos(rad) * s, b = sin(rad) * s;
		ctx.lineWidth = s/5;
		ctx.fillStyle = color;
		ctx.strokeStyle = (inv % 10 > 5)? "white": color;
		ctx.moveTo(x + a, y + b);
		ctx.lineTo(x + b, y - a);
		ctx.lineTo(x - a, y - b);
		ctx.lineTo(x - b, y + a);
		ctx.closePath();
		ctx.globalAlpha = hp/maxHp;
		ctx.fill();
		ctx.globalAlpha = 1;
		ctx.stroke();
	}
}