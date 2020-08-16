class Boss3 extends Boss{
	tick() {
		this.time2++;
		if(this.phase == 0) {
			if(this.partner.alive) {
				this.chase(this.partner);
				this.time++;
				if(this.time == 250) {
					this.time = 0;
					var enemy = new Pusher;
					enemy.color = this.color;
					enemy.change = false;
					enemy.mx = this.mx;
					enemy.my = this.my;
					enemies2.push(enemy);
				}
			}else{
				this.phase++;
				this.time = 0;
			}
		}else{
			if(player.alive) {
				if(this.time < 100) {
					this.chase(player);
					this.time++;
					this.color = "#aaf";
				}else
				if(this.time < 200) {
					this.acl = this.racl/10;
					this.chase(player);
					this.time++;
					this.color = "#faa";
				}else
				if(this.time == 200) {
					this.time++;
					this.color = "#faf";
					this.spd = this.rspd * 5;
					this.acl = this.rspd * 5;
					this.friction = 0.99;
					var {rad, velocity} = this;
					velocity.x += this.spd * cos(rad);
					velocity.y += this.spd * sin(rad);
				}else
				if(this.time < 300) this.time++;
				else{
					this.time = 0;
					this.spd = this.rspd;
					this.acl = this.racl;
					this.friction = 0.9;
				}
			}
		}
	}
	draw() {
		var {x, y, mx, my, s, rad, color, inv, hp, maxHp, r} = this;
		ctx.save();
		ctx.translate(mx, my);
		ctx.rotate(rad);
		ctx.translate(-mx, -my);
		ctx.drawImage(this.image.image(hp, maxHp, color, inv, s, this.time2), x, y, s, s);
		ctx.restore();
	}
	rspd = this.spd;
	racl = this.acl;
	time = 0;
	time2 = 0;
	xp = 500;
	multiplier = 1;
	maxHp = 25;
	hp = 25;
	color = "#aaf";
	image = Chaser;
}
class Boss3_2 extends Boss{
	tick() {
		switch(this.phase) {
			case(0):
				if(this.partner.alive) {
					this.time++;
					if(this.time == 250) {
						this.time = 0;
						var enemy = new Pushed;
						enemy.color = this.color;
						enemy.mx = this.mx;
						enemy.my = this.my;
						enemies2.push(enemy);
					}
				}else{
					++this.phase; this.time = 0;
					this.r = floor(random(8))/4 * PI;
					this.color = "#faa";
				}
			break;
			case(1):
				this.time++;
				if(this.time % 25 == 0 && this.time > 50) {
					var enemy = new Mover;
					enemy.dis = enemy.spd;
					enemy.rad = this.r;
					this.r += PI/4;
					this.r %= PI * 2;
					enemy.color = this.color;
					enemy.mx = this.mx;
					enemy.my = this.my;
					enemies2.push(enemy);
				}
				if(this.time == 250) {
					this.time = 0;
					this.phase++;
					this.color = "#faf";
					this.dis = this.spd;
					this.rad = random(PI * 2);
				}
			break;
			case(2):
				this.dis += this.acl;
				this.time++;
				if(this.time > 250) this.phase = 0;
			break;
		}
	}
	color = "#aaf";
	friction = 0.99;
	xp = 500;
	multiplier = 1;
	maxHp = 25;
	hp = 25;
	time = 0;
	image = Entity;
}