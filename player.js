class Player extends Entity{
	constructor() {
		super();
		this.rspd = super.spd;
		this.inv = 50;
	}
	tick() {
		var {velocity, acl} = this,
			mov = {x: 0, y: 0};
		if(keys.d) mov.x++;
		if(keys.a) mov.x--;
		if(keys.s) mov.y++;
		if(keys.w) mov.y--;
		if(keys.d == 1) {
			mov.x++; keys.d = 2;
		}
		if(keys.a == 1) {
			mov.x--; keys.a = 2;
		}
		if(keys.s == 1) {
			mov.y++; keys.s = 2;
		}
		if(keys.w == 1) {
			mov.y--; keys.w = 2;
		}
		if(mov.x || mov.y) {
			let rad = atan2(mov.y, mov.x);
			velocity.x += cos(rad) * acl;
			velocity.y += sin(rad) * acl;
			this.isMoving = true;
		}
		mov = {x: 0, y: 0};
		if(keys.ArrowRight) mov.x++;
		if(keys.ArrowLeft) mov.x--;
		if(keys.ArrowDown) mov.y++;
		if(keys.ArrowUp) mov.y--;
		if(keys.ArrowRight == 1) {
			mov.x++; keys.ArrowRight = 2;
		}
		if(keys.ArrowLeft == 1) {
			mov.x--; keys.ArrowLeft = 2;
		}
		if(keys.ArrowDown == 1) {
			mov.y++; keys.ArrowDown = 2;
		}
		if(keys.ArrowUp == 1) {
			mov.y--; keys.ArrowUp = 2;
		}
		if((mov.x || mov.y) && this.lastShot <= 0) {
			let rad = atan2(mov.y, mov.x);
			let n = PI/64;
			rad += random(n) - n/2;
			this.lastShot = 5;
			Bullet.summon(this, new Bullet(rad));
		}
	}
	onHit(attacker) {
		if(!this.inv) {
			this.hp -= attacker.hit();
			this.inv = 50;
		}
	}
	draw() {
		var {x, y, s, color, hp, maxHp, inv} = this;
		ctx.drawImage(Player.image(hp, maxHp, s, color, inv), x, y, s, s);
	}
	lastShot = 0;
	color = "#aaf";
	static create(hp, maxHp, s, color, inv) {
		let canvas = document.createElement("canvas"),
			ctx = canvas.getContext("2d");
		Object.assign(canvas, {
			width: s * scale * 1.2,
			height: s * scale * 1.2
		})
		ctx.scale(scale, scale);
		ctx.beginPath();
		ctx.lineWidth = s/10;
		ctx.fillStyle = color;
		ctx.strokeStyle = inv? "white": color;
		ctx.rect(0.1, 0.1, s, s, s/3);
		ctx.globalAlpha = hp/maxHp;
		ctx.fill();
		ctx.globalAlpha = 1;
		ctx.stroke();
		return canvas;
	}
}
player = new Player;