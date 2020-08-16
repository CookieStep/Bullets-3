class Boss extends Enemy{
	tick() {
		var x, y, r;
		switch(this.phase) {
			case 0:
				x = this.s; y = game.height/2; r = atan2(y - this.my, x - this.mx);
				this.velocity.x += cos(r) * this.acl;
				this.velocity.y += sin(r) * this.acl;
				if(distance(this.mx, this.my, x, y) < 3) {
					for(let i = 0; i < 5; i++) {
						if(i == 2) continue;
						let enemy = new Mover;
						enemy.dis = enemy.acl;
						enemy.rad = 0;
						enemy.mx = this.s
						enemy.my = game.height/5 * i + game.height/12;
						enemies2.push(enemy);
					}
					++this.phase;
				}
			break;
			case 1:
				x = game.width/2; y = this.s; r = atan2(y - this.my, x - this.mx);
				this.velocity.x += cos(r) * this.acl;
				this.velocity.y += sin(r) * this.acl;
				if(distance(this.mx, this.my, x, y) < 3) {
					for(let i = 0; i < 5; i++) {
						if(i == 2) continue;
						let enemy = new Mover;
						enemy.dis = enemy.acl;
						enemy.rad = PI/2;
						enemy.my = this.s;
						enemy.mx = game.width/5 * i + game.width/12;
						enemies2.push(enemy);
					}
					++this.phase;
				}
			break;
			case 2:
				x = game.width/8; y = game.height/8; r = atan2(y - this.my, x - this.mx);
				this.velocity.x += cos(r) * this.acl;
				this.velocity.y += sin(r) * this.acl;
				if(distance(this.mx, this.my, x, y) < 3) ++this.phase;
			break;
			case 3:
				x = game.width * 7/8; y = game.height/8; r = atan2(y - this.my, x - this.mx);
				this.velocity.x += cos(r) * this.acl;
				this.velocity.y += sin(r) * this.acl;
				if(distance(this.mx, this.my, x, y) < 3) ++this.phase;
			break;
			case 4:
				x = game.width * 7/8; y = game.height * 7/8; r = atan2(y - this.my, x - this.mx);
				this.velocity.x += cos(r) * this.acl;
				this.velocity.y += sin(r) * this.acl;
				if(distance(this.mx, this.my, x, y) < 3) ++this.phase;
			break;
			case 5:
				x = game.width/8; y = game.height * 7/8; r = atan2(y - this.my, x - this.mx);
				this.velocity.x += cos(r) * this.acl;
				this.velocity.y += sin(r) * this.acl;
				if(distance(this.mx, this.my, x, y) < 3) this.phase = 2;
			break;
			case 6:
				this.dis = 1e-25;
				this.rad = this.time * PI/16;
				this.color = `rgb(255, ${floor(this.time * 1.275)}, 0)`;
				this.inv = this.time;
				if(this.time) --this.time;
				else{
					++this.phase;
					this.color = "red";
					this.time = 50;
				}
			break;
			case 7:
				r = Entity.radian(this, player);
				this.velocity.x += cos(r) * this.acl;
				this.velocity.y += sin(r) * this.acl;
				if(this.time) {
					--this.time;
					if(this.time % 25 == 0) {
						for(let i = 0; i < 2; i++) {
							let enemy = new Mover;
							enemy.dis = enemy.spd;
							enemy.rad = r + PI * i + PI/2;
							let rad = enemy.rad;
							let mov = {x: cos(rad), y: sin(rad)};
							if(abs(mov.x) == abs(mov.y)) {
								mov = {x: sign(mov.x), y: sign(mov.y)};
							}else if(abs(mov.x) > abs(mov.y)) {
								mov = {x: sign(mov.x), y: mov.y/abs(mov.x)}
							}else{
								mov = {x: mov.x/abs(mov.y), y: sign(mov.y)}
							}
							mov.x *= 2; mov.y *= 2;
							let s = (this.s - enemy.s)/2;
							enemy.x = this.x + s * (mov.x + 1);
							enemy.y = this.y + s * (mov.y + 1);
							enemies2.push(enemy);
						}
					}
				}else ++this.phase;
			break;
			case 8:
				x = game.width/8; y = game.height/8; r = atan2(y - this.my, x - this.mx);
				this.velocity.x += cos(r) * this.acl;
				this.velocity.y += sin(r) * this.acl;
				if(distance(this.mx, this.my, x, y) < 3) {
					++this.phase;
					let enemy = new Minion;
					let s = (this.s - enemy.s)/2;
					enemy.x = this.x + s;
					enemy.y = this.y + s;
					if(this.spawn) {
						this.spawn--;
						enemies2.push(enemy);
					}
				}
			break;
			case 9:
				x = game.width * 7/8; y = game.height/8; r = atan2(y - this.my, x - this.mx);
				this.velocity.x += cos(r) * this.acl;
				this.velocity.y += sin(r) * this.acl;
				if(distance(this.mx, this.my, x, y) < 3) {
					++this.phase;
					let enemy = new Minion;
					let s = (this.s - enemy.s)/2;
					enemy.x = this.x + s;
					enemy.y = this.y + s;
					if(this.spawn) {
						this.spawn--;
						enemies2.push(enemy);
					}
				}
			break;
			case 10:
				x = game.width * 7/8; y = game.height * 7/8; r = atan2(y - this.my, x - this.mx);
				this.velocity.x += cos(r) * this.acl;
				this.velocity.y += sin(r) * this.acl;
				if(distance(this.mx, this.my, x, y) < 3) {
					++this.phase;
					let enemy = new Minion;
					let s = (this.s - enemy.s)/2;
					enemy.x = this.x + s;
					enemy.y = this.y + s;
					if(this.spawn) {
						this.spawn--;
						enemies2.push(enemy);
					}
				}
			break;
			case 11:
				x = game.width/8; y = game.height * 7/8; r = atan2(y - this.my, x - this.mx);
				this.velocity.x += cos(r) * this.acl;
				this.velocity.y += sin(r) * this.acl;
				if(distance(this.mx, this.my, x, y) < 3) {
					this.phase = 8;
					let enemy = new Minion;
					let s = (this.s - enemy.s)/2;
					enemy.x = this.x + s;
					enemy.y = this.y + s;
					if(this.spawn) {
						this.spawn--;
						enemies2.push(enemy);
					}
				}
			break;
		}
		if(this.phase <= 5) {
			if(this.hp < 25) {
				this.phase = 6;
				this.time = 100;
			}
		}
		if(enemies2.length > 10) {
			enemies2.pop();
			this.spawn++;
		}
	}
	spawn = 20; multiplier = 1;
	static store = {};
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
	static create(hp, color, inv) {
		let canvas = document.createElement("canvas"),
			ctx = canvas.getContext("2d"),
			s = 2,
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
	onHit(attacker) {
		if(!this.inv && this.alive) {
			this.hp -= attacker.hit();
			if(attacker.uid == player.uid) this.inv = 10;
			if(!this.alive) {
				if(attacker.uid != player.uid || player.inv) multiplier += this.multiplier;
				Boom.play();
				xp(this);
				if(!localStorage.dash) display(["New skill unlocked"], 100, menu.powCol[1]);
				localStorage.dash = true;
			}else Wall.play();
		}
	}
	image = Boss;
	phase = 0;
	s = 2;
	color = "orange";
	hp = 50; xp = 1000;
	maxHp = 50;
}
class Minion extends Enemy{
	phase = floor(random(4));
	image = Player3;
	color = "#aff";
	tick() {
		var x, y, r;
		switch(this.phase) {
			case 0:
				x = game.width/4; y = game.height/4; r = atan2(y - this.my, x - this.mx);
				this.velocity.x += cos(r) * this.acl;
				this.velocity.y += sin(r) * this.acl;
				if(distance(this.mx, this.my, x, y) < 1) ++this.phase;
			break;
			case 1:
				x = game.width * 3/4; y = game.height/4; r = atan2(y - this.my, x - this.mx);
				this.velocity.x += cos(r) * this.acl;
				this.velocity.y += sin(r) * this.acl;
				if(distance(this.mx, this.my, x, y) < 1) ++this.phase;
			break;
			case 2:
				x = game.width * 3/4; y = game.height * 3/4; r = atan2(y - this.my, x - this.mx);
				this.velocity.x += cos(r) * this.acl;
				this.velocity.y += sin(r) * this.acl;
				if(distance(this.mx, this.my, x, y) < 1) ++this.phase;
			break;
			case 3:
				x = game.width/4; y = game.height * 3/4; r = atan2(y - this.my, x - this.mx);
				this.velocity.x += cos(r) * this.acl;
				this.velocity.y += sin(r) * this.acl;
				if(distance(this.mx, this.my, x, y) < 1) this.phase = 0;
			break;
		}
	}
}