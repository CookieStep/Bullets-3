class Bullet extends Entity{
    constructor(rad) {
        super();
        this.inv = 0;
        this.dis = this.spd;
        this.rad = rad;
    }
    s = 0.2; atk = 7;
    spd = 0.2; time = 100;
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