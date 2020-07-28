class Exp extends Entity{
    tick() {
        this.r += this.rot;
        if(player.alive && Entity.distance(player, this) < 5) {
            var {velocity} = this;
            let dis = (Entity.distance(this, player) - (this.s + player.s)/2)/5;
            dis = 1 - dis;
            let r = Entity.radian(this, player);
            velocity.x += cos(r) * this.acl * dis;
            velocity.y += sin(r) * this.acl * dis;
            this.isMoving = true;
        }
    }
	draw() {
        var {x, y, mx, my, s, color, inv, hp, maxHp, r} = this;
		ctx.save();
		ctx.translate(mx, my);
		ctx.rotate(r);
		ctx.translate(-mx, -my);
		ctx.drawImage(this.image.image(hp, maxHp, color, inv, s), x, y, s, s);
		ctx.restore();
    }
    onHit() {
        this.hp = 0;
        Xp.play();
    }
    color = "#ff0";
    rot = random(PI/32);
    r = random(PI * 2);
    friction = 0.99;
    s = 0.2; spd = 0.1;
}
function xp(what) {
    if(what.xp > 0) {
        for(let i = 0; i < 10; i++) {
            let xp = new Exp();
            xp.x = what.x + (what.s - xp.s)/2;
            xp.y = what.y + (what.s - xp.s)/2;
            xp.dis = xp.spd;
            xp.xp = what.xp/10;
            xp.rad = PI * i/5;
            exp.push(xp);
        }
    }
}