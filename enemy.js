class Enemy extends Entity{
	constructor() {
		super();
	}
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
		Spawn.play();
		return true;
	}
	static spawn2(what) {
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
		enemies2.push(what)
		Spawn.play();
		return true;
	}
	xp = 10;
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
	xp = 15;
	image = Player;
}
class Stayer extends Enemy{
	color = "#afa";
	r = random(PI * 2);
	tick() {
		var {velocity} = this;
		velocity.x += cos(this.r) * this.spd;
		velocity.y += sin(this.r) * this.spd;
		this.isMoving = true;
	}
	xp = 20;
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
class Waller extends Enemy{
	tick() {
		let x = this.mov.x * (game.width - this.s) + this.s/2,
			y = this.mov.y * (game.height - this.s) + this.s/2;
		let r = atan2(y - this.my, x - this.mx);
		this.velocity.x += cos(r) * this.acl;
		this.velocity.y += sin(r) * this.acl;
	}
	hitWall(x, y) {
		var {r, velocity} = this;
		velocity.x *= x;
		velocity.y *= y;
		this.mov = {x: round(random()), y: round(random())}
	}
	color = "#ffa"; xp = 30;
	mov = {x: round(random()), y: round(random())}
}