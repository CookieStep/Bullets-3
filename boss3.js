class Boss3 extends Boss{
    tick() {
        this.time2++;
        this.chase(this.partner);
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
    time2 = 0;
    xp = 500;
    multiplier = 1;
    maxHp = 25;
    hp = 25;
    image = Chaser;
}
class Boss3_2 extends Boss{
    tick() {}
    friction = 0.99;
    xp = 500;
    multiplier = 1;
    maxHp = 25;
    hp = 25;
    image = Entity;
}