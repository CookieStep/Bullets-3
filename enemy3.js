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
		var {x, y, s, color, hp, maxHp, inv} = this;
		ctx.drawImage(this.image.image(hp, maxHp, color, inv, s, this.time), x, y, s, s);
		ctx.restore();
	}
    time = 0;
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
	}
}