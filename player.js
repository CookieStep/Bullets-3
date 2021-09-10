class Player extends Entity{
	velocity2 = {x: 0, y: 0};
	get dis2() {
		var {velocity2} = this;
		return distance(velocity2.x, velocity2.y);
	}
	get rad2() {
		var {velocity2} = this;
		return atan2(velocity2.y, velocity2.x);
	}
	set dis2(dis2) {
		var {velocity2, rad2} = this;
		velocity2.x = cos(rad2) * dis2;
		velocity2.y = sin(rad2) * dis2;
	}
	set rad2(rad2) {
		var {velocity2, dis2} = this;
		velocity2.x = cos(rad2) * dis2;
		velocity2.y = sin(rad2) * dis2;
	}
	constructor() {
		super();
		this.rspd = super.spd;
		this.inv = 50;
	}
	hitWall(x, y) {
		var {velocity, velocity2} = this;
		velocity.x *= x;
		velocity.y *= y;
		velocity2.x *= x;
		velocity2.y *= y;
		Wall.play();
	}
	forces() {
		var {velocity, spd, velocity2} = this;
		if(this.dis > spd) this.dis = spd;
		this.x += velocity.x; this.y += velocity.y;
		this.x += velocity2.x; this.y += velocity2.y;
		this.dis2 *= this.friction;
		if(!this.isMoving) this.dis *= this.friction;
		else this.isMoving = false;
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
		if((mov.x || mov.y) && (this.lastShot <= 0 || this.power == 2)) {
			let opt = ["shoot", "dash", "targets"];
			this[opt[this.power]](mov);
		}else{
			this.mov = {x: 0, y: 0};
		}
		if(keys.glide == 1 && this.power == 2 && this.lastShot <= 0)
			this.control();
		if(keys.glide) this.isMoving = true;
	}
	power = 0;
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
		this.lastShot = 10;
		Shoot.play();
		Bullet.summon(this, new Bullet(rad));
	}
	dash(mov) {
		let rad = atan2(mov.y, mov.x);
		Dash_.play();
		this.lastShot = 40;
		this.inv = 25;
		this.velocity2.x += cos(rad) * this.spd * 2;
		this.velocity2.y += sin(rad) * this.spd * 2;
	}
	targets(mov) {
		this.mov = mov;
	}
	control() {
		if(bullets.length > 9) return;
		this.lastShot = 30;
		let bul = new Controlled(this);
		bul.move = function(mov) {
			var {velocity, acl} = this;
			let rad = atan2(mov.y, mov.x);
			velocity.x += cos(rad) * acl;
			velocity.y += sin(rad) * acl;
			this.isMoving = true;
		}
		bul.mx = this.mx;
		bul.my = this.my;
		bullets.push(bul);
	}
	static draw(ctx, s) {
		ctx.rect2(0, 0, s, s, s/3);
	}
	draw() {
		var {x, y, mx, my, s, rad, color, color2, inv, hp, maxHp} = this;
		ctx.save();
		ctx.translate(mx, my);
		ctx.rotate(rad);
		ctx.translate(-mx, -my);
		ctx.drawImage(this.image.image(hp, maxHp, color, inv, s), x, y, s, s);
		ctx.drawImage(this.image.image(this.lastShot? 0: hp, maxHp, color2, 0, s/2), x + s/4, y + s/4, s/2, s/2);
		ctx.restore();
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
	atk = 3; lastShot = 0;
	color = "#55f";
	color2 = "#55f";
}
class Player2 extends Player{
// 	shoot(mov) {
// 		let rad = atan2(mov.y, mov.x);
// 		this.lastShot = 10;
// 		Bullet.summon(this, new Bullet(rad + this.rad + PI/2));
// 		Shoot.play();
// 	}
// 	dash(mov) {
// 		Dash_.play();
// 		let rad = atan2(mov.y, mov.x);
// 		this.lastShot = 40;
// 		this.inv = 25;
// 		this.velocity2.x += cos(rad + this.rad + PI/2) * this.spd * 2;
// 		this.velocity2.y += sin(rad + this.rad + PI/2) * this.spd * 2;
// 	}
// 	targets(mov) {
// 		this.mov = mov;
// 		this.r2 += PI/28 * sign(mov.x);
// 	}
// 	control() {
// 		let bul = new Controlled(this);
// 		this.lastShot = 30;
// 		bul.move = function(mov) {
// 			var {velocity, acl, parent} = this;
// 			var {r2} = parent;
// 			if(mov.y) {
// 				this.isMoving = true;
// 				velocity.x -= cos(r2) * acl * sign(mov.y);
// 				velocity.y -= sin(r2) * acl * sign(mov.y);
// 			}
// 		}
// 		bul.mx = this.mx;
// 		bul.my = this.my;
// 		bullets.push(bul);
// 	}
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
// 	r2 = 0;
	static store = {};
	image = Player2;
	color = "#5f5";
	color2 = "#5f5";
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
// 	draw() {
// 		var {x, y, mx, my, s, r, color, color2, inv, hp, maxHp, r} = this;
// 		ctx.save();
// 		ctx.translate(mx, my);
// 		ctx.rotate(r);
// 		ctx.translate(-mx, -my);
// 		ctx.drawImage(this.image.image(hp, maxHp, color, inv, s), x, y, s, s);
// 		ctx.drawImage(this.image.image(this.lastShot? 0: hp, maxHp, color2, 0, s/2), x + s/4, y + s/4, s/2, s/2);
// 		ctx.restore();
// 	}
// 	move(mov) {
// 		var {velocity, acl, r} = this
// 		this.r += PI/28 * sign(mov.x);
// 		if(mov.y) {
// 			this.isMoving = true;
// 			velocity.x -= cos(r) * acl * sign(mov.y);
// 			velocity.y -= sin(r) * acl * sign(mov.y);
// 		}
// 	}
// 	shoot(mov) {
// 		let rad = atan2(mov.y, mov.x);
// 		this.lastShot = 10;
// 		Bullet.summon(this, new Bullet(rad + this.r + PI/2));
// 		Shoot.play();
// 	}
// 	dash(mov) {
// 		Dash_.play();
// 		let rad = atan2(mov.y, mov.x);
// 		this.lastShot = 40;
// 		this.inv = 25;
// 		this.velocity2.x += cos(rad + this.r + PI/2) * this.spd * 2;
// 		this.velocity2.y += sin(rad + this.r + PI/2) * this.spd * 2;
// 	}
// 	targets(mov) {
// 		this.mov = mov;
// 		this.r2 += PI/28 * sign(mov.x);
// 	}
// 	control() {
// 		let bul = new Controlled(this);
// 		this.lastShot = 30;
// 		bul.move = function(mov) {
// 			var {velocity, acl, parent} = this;
// 			var {r2} = parent;
// 			if(mov.y) {
// 				this.isMoving = true;
// 				velocity.x -= cos(r2) * acl * sign(mov.y);
// 				velocity.y -= sin(r2) * acl * sign(mov.y);
// 			}
// 		}
// 		bul.mx = this.mx;
// 		bul.my = this.my;
// 		bullets.push(bul);
// 	}
// 	r = 0; r2 = 0;
	static store = {};
	image = Player3;
	color = "#f55";
	color2 = "#f55";
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
// 	draw() {
// 		var {x, y, mx, my, s, r, color, color2, inv, hp, maxHp, r} = this;
// 		ctx.save();
// 		ctx.translate(mx, my);
// 		ctx.rotate(r);
// 		ctx.translate(-mx, -my);
// 		ctx.drawImage(this.image.image(hp, maxHp, color, inv, s), x, y, s, s);
// 		ctx.drawImage(this.image.image(this.lastShot? 0: hp, maxHp, color2, 0, s/2), x + s/4, y + s/4, s/2, s/2);
// 		ctx.restore();
// 	}
// 	move(mov) {
// 		var {velocity, acl, r} = this
// 		this.r += PI/28 * sign(mov.x);
// 		if(mov.y) {
// 			this.isMoving = true;
// 			velocity.x -= cos(r) * acl * sign(mov.y);
// 			velocity.y -= sin(r) * acl * sign(mov.y);
// 		}
// 	}
// 	targets(mov) {
// 		this.mov = mov;
// 	}
// 	control() {
// 		let bul = new Controlled(this);
// 		this.lastShot = 30;
// 		bul.move = function(mov) {
// 			var {velocity, acl} = this;
// 			let rad = atan2(mov.y, mov.x);
// 			velocity.x += cos(rad) * acl;
// 			velocity.y += sin(rad) * acl;
// 			this.isMoving = true;
// 		}
// 		bul.mx = this.mx;
// 		bul.my = this.my;
// 		bullets.push(bul);
// 	}
// 	r = 0;
	static store = {};
	image = Player4;
	color = "#ff5";
	color2 = "#ff5";
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
	color = "#5ff";
	color2 = "#5ff";
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
	color = "#f5f";
	color2 = "#f5f";
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
	color = "#aaa";
	color2 = "#aaa";
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
	color = "#fff";
	color2 = "#fff";
}
