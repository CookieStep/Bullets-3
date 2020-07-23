class Entity{
	constructor() {this.uid = Entity.uid++;}
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
			velocity.x *= -1;
		}
		if(this.x > game.width - this.s) {
			this.x = game.width - this.s;
			velocity.x *= -1;
		}
		if(this.y < 0) {
			this.y = 0;
			velocity.y *= -1;
		}
		if(this.y > game.height - this.s) {
			this.y = game.height - this.s;
			velocity.y *= -1;
		}
	}
	update() {
		this.tick();
		this.forces();
		this.screenlock();
	}
	draw() {
		var {x, y, s, color} = this;
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.rect(x, y, s, s);
		ctx.fill();
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
	spd = 0.2; acl = 0.02;
	velocity = {x: 0, y: 0};
	color = "grey"; s = 1;
	isMoving = false;
	static isTouching = (a, b) => (
		abs(a.mx - b.mx) < (a.s + b.s)/2
	) && (
		abs(a.my - b.my) < (a.s + b.s)/2
	);
	static distance = (a, b) => distance(a.mx, a.my, b.mx, b.my);
	static uid = 0n;
}