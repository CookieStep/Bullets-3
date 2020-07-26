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
			chk = check() || Entity.distance(player, what) < 10;
			if(chk && i++ > 100) {
				return;
			}
		}while(chk)
		enemies.push(what)
		return true;
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
	image = Player;
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
		Wall.play();
	}
}