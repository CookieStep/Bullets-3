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
		var {x, y, s, color, hp, maxHp, inv} = this;
		ctx.drawImage(Player.image(hp, maxHp, s, color, inv), x, y, s, s);
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
		ctx.save();
		ctx.translate(x, y);
		ctx.rotate(rad * 180/PI);
		ctx.translate(-x, -y);
		var {x, y, s, color, hp, maxHp, inv} = this;
		ctx.drawImage(Entity.image(hp, maxHp, s, color, inv), x, y, s, s);
		ctx.restore();
	}
}