class Entity{
	constructor() {
		this.uid = Entity.uid++;
		this.hp = this.maxHp; this.inv = 0;
	}
	tick() {}
	forces() {
		var {velocity, spd} = this;
		if(this.dis > spd) this.dis = spd;
		this.x += velocity.x; this.y += velocity.y;
		if(!this.isMoving) this.dis *= 0.95;
		else this.isMoving = false;
	}
	screenlock() {
		var {velocity} = this;
		if(this.x < 0) {
			this.x = 0;
			this.hitWall(-1, 1);
		}
		if(this.x > game.width - this.s) {
			this.x = game.width - this.s;
			this.hitWall(-1, 1);
		}
		if(this.y < 0) {
			this.y = 0;
			this.hitWall(1, -1);
		}
		if(this.y > game.height - this.s) {
			this.y = game.height - this.s;
			this.hitWall(1, -1);
		}
	}
	hitWall(x, y) {
		var {velocity} = this;
		velocity.x *= x;
		velocity.y *= y;
	}
	update() {
		if(this.lastShot > 0) this.lastShot--;
		if(this.inv > 0) this.inv--;
		if(this.hp < this.maxHp) this.hp += this.regen;
		if(this.hp > this.maxHp) this.hp = this.maxHp;
		this.tick();
		this.forces();
		this.screenlock();
	}
	draw() {
		var {x, y, s, color, hp, maxHp, inv} = this;
		ctx.beginPath();
		ctx.lineWidth = s/10;
		ctx.globalAlpha = hp/maxHp;
		ctx.fillStyle = color;
		ctx.strokeStyle = (inv % 10 > 5)? "white": color;
		ctx.rect(x, y, s, s);
		ctx.fill();
		ctx.globalAlpha = 1;
		ctx.stroke();
	}
	get dis() {
		var {velocity} = this;
		return distance(velocity.x, velocity.y);
	}
	get rad() {
		var {velocity} = this;
		return atan2(velocity.y, velocity.x);
	}
	set dis(dis) {
		var {velocity, rad} = this;
		velocity.x = cos(rad) * dis;
		velocity.y = sin(rad) * dis;
	}
	set rad(rad) {
		var {velocity, dis} = this;
		velocity.x = cos(rad) * dis;
		velocity.y = sin(rad) * dis;
	}
	get mx() {
		return this.x + this.s/2
	}
	get my() {
		return this.y + this.s/2
	}
	onHit(attacker) {
		if(!this.inv) this.hp -= attacker.hit();
	}
	hit() {
		return this.atk;
	}
	spd = 0.2; acl = 0.02;
	velocity = {x: 0, y: 0};
	color = "grey"; s = 1;
	maxHp = 10; inv = 0;
	regen = 0.01; atk = 5;
	isMoving = false; inf = [];
	static isTouching = (a, b) => (
		abs(a.mx - b.mx) < (a.s + b.s)/2
	) && (
		abs(a.my - b.my) < (a.s + b.s)/2
	);
	static distance = (a, b) => distance(a.mx, a.my, b.mx, b.my);
	static uid = 0n;
}