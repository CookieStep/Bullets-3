class Player extends Entity{
	constructor() {
		super();
		this.rspd = super.spd;
		this.inv = 50;
	}
	tick() {
		var mov = {x: 0, y: 0};
		if(keys.right) mov.x++;
		if(keys.left) mov.x--;
		if(keys.down) mov.y++;
		if(keys.up) mov.y--;
		if(keys.right == 1) {
			mov.x++; keys.right = 2;
		}
		if(keys.left == 1) {
			mov.x--; keys.left = 2;
		}
		if(keys.down == 1) {
			mov.y++; keys.down = 2;
		}
		if(keys.up == 1) {
			mov.y--; keys.up = 2;
		}
		if(mov.x || mov.y) {
			this.move(mov);
		}
		mov = {x: 0, y: 0};
		if(keys.right2) mov.x++;
		if(keys.left2) mov.x--;
		if(keys.down2) mov.y++;
		if(keys.up2) mov.y--;
		if(keys.right2 == 1) {
			mov.x++; keys.right2 = 2;
		}
		if(keys.left2 == 1) {
			mov.x--; keys.left2 = 2;
		}
		if(keys.down2 == 1) {
			mov.y++; keys.down2 = 2;
		}
		if(keys.up2 == 1) {
			mov.y--; keys.up2 = 2;
		}
		if((mov.x || mov.y) && this.lastShot <= 0) {
			this.shoot(mov);
		}
		if(keys.glide) this.isMoving = true;
	}
	image = Player;
	move(mov) {
		var {velocity, acl} = this;
		let rad = atan2(mov.y, mov.x);
		velocity.x += cos(rad) * acl;
		velocity.y += sin(rad) * acl;
		this.isMoving = true;
	}
	shoot(mov) {
		let rad = atan2(mov.y, mov.x);
		// let n = PI/64;
		// rad += random(n) - n/2;
		this.lastShot = 10;
		Shoot.play();
		Bullet.summon(this, new Bullet(rad));
	}
	static draw(ctx, s) {
		ctx.rect2(0, 0, s, s, s/3);
	}
	static store = {};
	onHit(attacker) {
		if(!this.inv) {
			this.hp -= attacker.hit();
			if(!this.alive) {
				Death.play();
				if(lives && !this.hardcore) {
					lives--; multiplier = 1;
					this.inv = 50;
					this.velocity = {x: 0, y: 0};
					this.hp = this.maxHp;
					this.x = (game.width - player.s)/2;
					this.y = (game.height - player.s)/2;
				}else
					display(["Press the 'Select' key to retry.", "This will reset your score!"], 100, "red");
			}
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
		Shoot.play();
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
class Player3 extends Player{
	static draw(ctx, s) {
		let r = s/3;
		ctx.moveTo(r, 0);
		ctx.lineTo(s-r, 0);
		ctx.lineTo(s, r);
		ctx.lineTo(s, s-r);
		ctx.lineTo(s-r, s);
		ctx.lineTo(0, s);
		ctx.lineTo(0, 0);
		ctx.closePath();
	}
	draw() {
		var {x, y, mx, my, s, r, color, inv, hp, maxHp, r} = this;
		ctx.save();
		ctx.translate(mx, my);
		ctx.rotate(r);
		ctx.translate(-mx, -my);
		var {x, y, s, color, hp, maxHp, inv} = this;
		ctx.drawImage(this.image.image(hp, maxHp, color, inv, s), x, y, s, s);
		ctx.restore();
	}
	move(mov) {
		var {velocity, acl, r} = this
		this.r += PI/28 * sign(mov.x);
		if(mov.y) {
			this.isMoving = true;
			velocity.x -= cos(r) * acl * sign(mov.y);
			velocity.y -= sin(r) * acl * sign(mov.y);
		}
	}
	shoot(mov) {
		let rad = atan2(mov.y, mov.x);
		this.lastShot = 10;
		Bullet.summon(this, new Bullet(rad + this.r + PI/2));
		Shoot.play();
	}
	r = 0;
	static store = {};
	image = Player3;
	color = "#f55";
}
class Player4 extends Player{
	static draw(ctx, s) {
		let r = s/2;
		ctx.moveTo(r, 0);
		ctx.lineTo(s-r, 0);
		ctx.quadraticCurveTo(s, 0, s, r);
		ctx.lineTo(s, s-r);
		ctx.quadraticCurveTo(s, s, s-r, s);
		ctx.lineTo(0, s);
		ctx.lineTo(0, 0);
		ctx.closePath();
	}
	draw() {
		var {x, y, mx, my, s, r, color, inv, hp, maxHp, r} = this;
		ctx.save();
		ctx.translate(mx, my);
		ctx.rotate(r);
		ctx.translate(-mx, -my);
		var {x, y, s, color, hp, maxHp, inv} = this;
		ctx.drawImage(this.image.image(hp, maxHp, color, inv, s), x, y, s, s);
		ctx.restore();
	}
	move(mov) {
		var {velocity, acl, r} = this
		this.r += PI/28 * sign(mov.x);
		if(mov.y) {
			this.isMoving = true;
			velocity.x -= cos(r) * acl * sign(mov.y);
			velocity.y -= sin(r) * acl * sign(mov.y);
		}
	}
	shoot(mov) {
		let rad = atan2(mov.y, mov.x);
		this.lastShot = 10;
		Bullet.summon(this, new Bullet(rad));
		Shoot.play();
	}
	r = 0;
	static store = {};
	image = Player4;
	color = "#ff5";
}
class HPlayer extends Player{
	static draw(ctx, s) {
		let r = s/2;
		ctx.moveTo(0, 0);
		ctx.lineTo(s/2, s/8);
		ctx.lineTo(s, 0);
		ctx.lineTo(s * 7/8, s/2);
		ctx.lineTo(s, s);
		ctx.lineTo(s/2, s * 7/8);
		ctx.lineTo(0, s);
		ctx.lineTo(s/8, s/2);
		ctx.closePath();
	}
	static store = {};
	image = HPlayer;
	hardcore = true;
	color = "#5ff"
}
class HPlayer2 extends Player2{
	static draw(ctx, s) {
		let r = s/3;
		ctx.moveTo(0, 0);
		ctx.lineTo(s/2, s/8);
		ctx.lineTo(s/2, 0);
		ctx.lineTo(s-r, 0);
		ctx.quadraticCurveTo(s, 0, s, r);
		ctx.lineTo(s, s-r);
		ctx.quadraticCurveTo(s, s, s-r, s);
		ctx.lineTo(s/2, s);
		ctx.lineTo(s/2, s * 7/8);
		ctx.lineTo(0, s);
		ctx.closePath();
	}
	static store = {};
	image = HPlayer2;
	hardcore = true;
	color = "#f5f"
}
class HPlayer3 extends Player3{
	static draw(ctx, s) {
		let r = s/3;
		ctx.moveTo(r, 0);
		ctx.lineTo(s-r, 0);
		ctx.lineTo(s, s/2);
		ctx.lineTo(s-r, s);
		ctx.lineTo(0, s);
		ctx.lineTo(0, 0);
		ctx.closePath();
	}
	static store = {};
	image = HPlayer3;
	hardcore = true;
	color = "#aaa"
}
class HPlayer4 extends Player4{
	static draw(ctx, s) {
		let r = s/2;
		ctx.moveTo(0, 0);
		ctx.lineTo(s/2, s/8);
		ctx.lineTo(s-r, 0);
		ctx.quadraticCurveTo(s, 0, s, r);
		ctx.lineTo(s, s-r);
		ctx.quadraticCurveTo(s, s, s-r, s);
		ctx.lineTo(s/2, s * 7/8);
		ctx.lineTo(0, s);
		ctx.closePath();
	}
	static store = {};
	image = HPlayer4;
	hardcore = true;
	color = "#fff"
}