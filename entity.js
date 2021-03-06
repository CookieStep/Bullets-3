class Entity{
	constructor() {
		this.uid = Entity.uid++;
		this.hp = this.maxHp; this.inv = 0;
	}
	friction = 0.9;
	tick() {}
	forces() {
		var {velocity, spd} = this;
		if(this.dis > spd) this.dis = spd;
		this.x += velocity.x; this.y += velocity.y;
		if(!this.isMoving) this.dis *= this.friction;
		else this.isMoving = false;
	}
	screenlock() {
		let value = false;
		if(this.x < 0) {
			value = true;
			this.x = 0;
			this.hitWall(-1, 1);
		}
		if(this.x > game.width - this.s) {
			value = true;
			this.x = game.width - this.s;
			this.hitWall(-1, 1);
		}
		if(this.y < 0) {
			value = true;
			this.y = 0;
			this.hitWall(1, -1);
		}
		if(this.y > game.height - this.s) {
			value = true;
			this.y = game.height - this.s;
			this.hitWall(1, -1);
		}
		return value;
	}
	hitWall(x, y) {
		var {velocity} = this;
		velocity.x *= x;
		velocity.y *= y;
		Wall.play();
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
		var {x, y, mx, my, s, rad, color, inv, hp, maxHp, r} = this;
		ctx.save();
		ctx.translate(mx, my);
		ctx.rotate(rad);
		ctx.translate(-mx, -my);
		ctx.drawImage(this.image.image(hp, maxHp, color, inv, s), x, y, s, s);
		ctx.restore();
	}
	get alive() {
		return this.hp > 0;
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
		return this.x + this.s/2;
	}
	get my() {
		return this.y + this.s/2;
	}
	set my(my) {
		this.y = my - this.s/2;
	}
	set mx(mx) {
		this.x = mx - this.s/2;
	}
	onHit(attacker) {
		if(!this.inv && this.alive) {
			this.hp -= attacker.hit();
			if(!this.alive) {
				Boom.play();
				if(attacker.uid != player.uid || player.inv) multiplier += this.multiplier;
				xp(this);
			}
		}
	}
	hit() {
		return this.atk;
	}
	spd = 0.2; acl = 0.02;
	velocity = {x: 0, y: 0};
	color = "grey"; s = 1;
	maxHp = 1; inv = 0;
	regen = 0; atk = 1;
	xp = 0; multiplier = 0.01;
	isMoving = false; inf = [];
	image = Entity;
	chase(what) {
		return this.moveTo(what.mx, what.my);
	}
	moveTo(x, y) {
		var r = atan2(y - this.my, x - this.mx),
			dis = distance(this.mx + this.velocity.x, this.my + this.velocity.y, x, y);
		if(dis > this.acl) dis = this.acl;
		this.velocity.x += cos(r) * dis;
		this.velocity.y += sin(r) * dis;
		return distance(this.mx, this.my, x, y);
	}
	static isTouching = (a, b) => (
		abs(a.mx - b.mx) < (a.s + b.s)/2
	) && (
		abs(a.my - b.my) < (a.s + b.s)/2
	);
	static distance = (a, b) => distance(a.mx, a.my, b.mx, b.my);
	static radian = (a, b) => atan2(b.my - a.my, b.mx - a.mx);
	static uid = 0n;
	static image(hp, maxHp, color, inv, s) {
		hp = Math.floor(hp);
		inv = inv % 10 > 5;
		var id = `${hp/maxHp} ${inv} ${color} ${s}`;
		if(!this.store[id]) {
			this.store[id] = this.create(hp/maxHp, color, inv, s);
		}
		return this.store[id];
	}
	static create(hp, color, inv, s) {
		let canvas = document.createElement("canvas"),
			ctx = canvas.getContext("2d"),
			s2 = ceil(s * scale * 1.2);
		Object.assign(canvas, {
			width: s2,
			height: s2
		});
		ctx.scale(scale, scale);
		ctx.beginPath();
		ctx.lineWidth = s/10;
		ctx.fillStyle = color;
		ctx.strokeStyle = inv? "white": color;
		ctx.translate(s/10, s/10);
		this.draw(ctx, s);
		ctx.translate(-s/10, -s/10);
		ctx.globalAlpha = hp;
		ctx.fill();
		ctx.globalAlpha = 1;
		ctx.stroke();
		return canvas;
	}
	static draw(ctx, s) {
		ctx.rect(0, 0, s, s);
	}
	static store = {};
	static clearImages() {
		this.store = {};
	}
}