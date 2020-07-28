class Bullet extends Entity{
    constructor(rad) {
        super();
        this.inv = 0;
        this.dis = this.spd;
        this.rad = rad;
    }
    s = 0.3; atk = 1;
    spd = 0.3; time = 75;
	draw() {
		var {x, y, mx, my, s, rad, color, inv, hp, maxHp} = this;
        ctx.save();
        ctx.translate(mx, my);
        ctx.rotate(rad);
		ctx.translate(-mx, -my);
		var {x, y, s, color, hp, maxHp, inv} = this;
		ctx.drawImage(Entity.image(hp, maxHp, color, inv, s), x, y, s, s);
		ctx.restore();
	}
    onHit() {
        this.time = 0;
    }
    tick() {
        var {acl, parent} = this;
        this.dis += acl;
        this.color = parent.color;
        this.hp = parent.hp;
        this.maxHp = parent.maxHp;
        --this.time;
    }
    get alive() {
        return this.time > 0;
    }
    static summon(parent, bullet) {
        let rad = bullet.rad;
        let mov = {x: cos(rad), y: sin(rad)};
        if(abs(mov.x) == abs(mov.y)) {
            mov = {x: sign(mov.x), y: sign(mov.y)};
        }else if(abs(mov.x) > abs(mov.y)) {
            mov = {x: sign(mov.x), y: mov.y/abs(mov.x)}
        }else{
            mov = {x: mov.x/abs(mov.y), y: sign(mov.y)}
        }
        let s = (parent.s - bullet.s)/2;
        bullet.x = parent.x + s * (mov.x + 1);
        bullet.y = parent.y + s * (mov.y + 1);
        Object.assign(bullet, {parent});
        bullets.push(bullet);
    }
}