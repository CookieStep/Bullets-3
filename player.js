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
			this.shoot(mov);
		}
	}
	image = Player;
	shoot(mov) {
		let rad = atan2(mov.y, mov.x);
		// let n = PI/64;
		// rad += random(n) - n/2;
		this.lastShot = 10;
		Bullet.summon(this, new Bullet(rad));
	}
	static draw(ctx, s) {
		ctx.rect(0, 0, s, s, s/3);
	}
	static store = {};
	onHit(attacker) {
		if(!this.inv) {
			this.hp -= attacker.hit();
			this.inv = 50;
		}
	}
	atk = 1; lastShot = 0;
	color = "#55f";
}
class Player2 extends Player{
	shoot(mov) {
		let rad = atan2(mov.y, mov.x);
		this.lastShot = 10;
		Bullet.summon(this, new Bullet(rad + this.rad + PI/2));
	}
	static draw(ctx, s) {
		let r = s/3;
		ctx.moveTo(r, 0);
		ctx.lineTo(s-r, 0);
		ctx.quadraticCurveTo(s, 0, s, r);
		ctx.lineTo(s, s-r);
		ctx.quadraticCurveTo(s, s, s-r, s);
		ctx.lineTo(0, s);
		ctx.lineTo(0, 0);
		ctx.closePath();
	}
	static store = {};
	image = Player2;
	color = "#5f5";
}