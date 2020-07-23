function spawn(what) {
	function check() {
		if(enemies.length) for(let enemy of enemies) {
			if(Entity.isTouching(what, enemy) && what.uid != enemy.uid) return true;
		}
		return false;
	}
	i = 0;
	do{
		assign(what, {
			x: random(game.width - what.s),
			y: random(game.height - what.s)
		});
		if((check() || Entity.distance(player, what) < 15) && i++ > 100) {
			return;
		}
	}while(check() || Entity.distance(player, what) < 15)
	enemies.push(what)
}
class Enemy extends Entity{
	color = "#fff";
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
		var {x, y, s, color} = this;
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.rect(x, y, s, s, s/3);
		ctx.fill();
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
		var {x, y, s, rad} = this;
		s /= 2; x += s; y += s; rad += PI/2;
		rad = (rad + this.r)/2;
		ctx.beginPath();
		s /= Math.sin(Math.PI / 4);
		var a = Math.cos(rad) * s, b = Math.sin(rad) * s;
		ctx.fillStyle = this.color;
		ctx.moveTo(x + a, y + b);
		ctx.lineTo(x + b, y - a);
		ctx.lineTo(x - a, y - b);
		ctx.lineTo(x - b, y + a);
		ctx.fill();
	}
}