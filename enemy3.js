class Chaser extends Mover{
    tick() {
        if(Enemy.distance(this, player) < 7.5) {
            this.color = "#f55";
            this.time += 2;
            this.isMoving = true;
            this.chase(player);
        }else{
            super.tick();
            this.time++;
            this.color = "#faa";
        }
	}
    spd = this.spd/2;
	draw() {
		var {x, y, mx, my, s, rad, color, inv, hp, maxHp, r} = this;
		ctx.save();
		ctx.translate(mx, my);
		ctx.rotate(rad);
		ctx.translate(-mx, -my);
		color = forceColor || color;
		ctx.drawImage(this.image.image(hp, maxHp, color, inv, s, this.time), x, y, s, s);
		ctx.restore();
	}
    time = 0;
	multiplier = 0.03;
	xp = 60;
    image = Chaser;
    static max = 25;
	static image(hp, maxHp, color, inv, s, time) {
        hp = Math.floor(hp);
        time = time % Chaser.max;
        time /= Chaser.max/2;
        time = abs(time - 1);
		inv = inv % 10 > 5;
		var id = `${hp/maxHp} ${inv} ${color} ${s} ${time}`;
		if(!this.store[id]) {
			this.store[id] = this.create(hp/maxHp, color, inv, s, time);
		}
		return this.store[id];
	}
	static create(hp, color, inv, s, time) {
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
		this.draw(ctx, s, time);
		ctx.translate(-s/10, -s/10);
		ctx.globalAlpha = hp;
		ctx.fill();
		ctx.globalAlpha = 1;
		ctx.stroke();
		return canvas;
	}
	static draw(ctx=canvas.getContext("2d"), s, time) {
        ctx.moveTo(s/2, s/2)
		ctx.arc(s/2, s/2, s/2, time, PI * 2 - time);
		ctx.closePath();
	}
	static store = {};
}
class Patrol extends Mover{
	color = "#ddd";
	color2 = "#555";
	xp = 60;
	multiplier = 0.03;
	time = 0;
	loc = {};
	tick() {
		if(this.time) {
			this.time--;
			if(Entity.distance(this, this.loc) > 1) this.chase(this.loc);
		}else{
			this.loc = {
				mx: this.mx + random(10) - 5,
				my: this.my + random(10) - 5
			}
			this.time = round(random(40)) + 10
		}
	}
	hitWall() {
		this.time = 0;
	}
	draw() {
		var {x, y, mx, my, s, rad, color, color2, inv, hp, maxHp} = this;
		color = forceColor || color;
		let r = Entity.radian(this, this.loc);
		let dis = Entity.distance(this, this.loc);
		if(dis > 1) dis = 1;
		ctx.save();
		ctx.translate(mx, my);
		ctx.rotate(rad);
		ctx.translate(-mx, -my);
		ctx.drawImage(this.image.image(hp, maxHp, color, inv, s), x, y, s, s);
		ctx.drawImage(this.image.image(hp, maxHp, color2, 0, s/2), x + s/4 + cos(r - rad) * s/8 * dis, y + s/4 + sin(r - rad) * s/8 * dis, s/2, s/2);
		ctx.restore();
	}
}
class Pusher extends Chaser{
	tick() {
		let targets = enemies.filter((a) => a instanceof Pushed && !a.target && Entity.distance(this, a) < 7.5);
		if(!targets.length) {
			targets = enemies2.filter((a) => a instanceof Pushed && !a.target && Entity.distance(this, a) < 7.5);
		}
		targets.sort((a, b) => Entity.distance(this, a) - Entity.distance(this, b));
		let [target] = targets;
		if(target) {
			if(this.change) this.color = "#5f5";
			this.time += 2;
			this.isMoving = true;
			target.target = true;
			this.chase(target);
		}else{
			if(!this.dis) {
				this.dis += this.acl;
				this.rad = random(PI * 2);
			}else this.dis += this.acl;
			this.isMoving = true;
			this.time++;
			if(this.change) this.color = "#afa";
		}
	}
	multiplier = 0.03;
	xp = 75;
	spd = this.spd * 2;
	image = Pusher;
	change = true;
	static store = {};
	static draw(ctx=canvas.getContext("2d"), s, time) {
        ctx.arc(s/2, s/2, s/2, time, PI * 2 - time);
	}
}
class Pushed extends Enemy{
	tick() {
		delete this.target;
	}
	xp = 50;
	multiplier = 0.03;
	friction = 0.99;
	color = "#0f0"
}
class Tough extends Mover{
	hp = 2; maxHp = 2;
	color = "#a5a";
	xp = 90;
	multiplier = 0.03;
}