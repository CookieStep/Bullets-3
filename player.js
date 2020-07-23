class Player extends Entity{
	constructor() {
		super();
		this.rspd = super.spd;
	}
	draw() {
		var {x, y, s, color} = this;
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.rect(x, y, s, s, s/3);
		ctx.fill();
	}
	tick() {
		var {velocity, acl} = this,
			mov = {x: 0, y: 0};
		if(keys.d) mov.x++;
		if(keys.a) mov.x--;
		if(keys.s) mov.y++;
		if(keys.w) mov.y--;
		if(keys.d == 1) {
			mov.x++; keys.d = 2;
		}
		if(keys.a == 1) {
			mov.x--; keys.a = 2;
		}
		if(keys.s == 1) {
			mov.y++; keys.s = 2;
		}
		if(keys.w == 1) {
			mov.y--; keys.w = 2;
		}
		if(mov.x || mov.y) {
			let rad = atan2(mov.y, mov.x);
			velocity.x += cos(rad) * acl;
			velocity.y += sin(rad) * acl;
			this.isMoving = true;
		}
	}
	color = "#aaf";
}
var player = new Player;