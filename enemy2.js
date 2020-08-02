class Tracer extends Enemy{
	phase = floor(random(4));
	image = Player3; xp = 30;
	multiplier = 0.02;
	color = "#aaf";
	tick() {
        var x, y, r;
        let i = 2;
		switch(this.phase) {
			case 0:
				x = this.s * i; y = this.s * i; r = atan2(y - this.my, x - this.mx);
				this.velocity.x += cos(r) * this.acl;
				this.velocity.y += sin(r) * this.acl;
				if(distance(this.mx, this.my, x, y) < 1) ++this.phase;
			break;
			case 1:
				x = game.width - this.s * i; y = this.s * i; r = atan2(y - this.my, x - this.mx);
				this.velocity.x += cos(r) * this.acl;
				this.velocity.y += sin(r) * this.acl;
				if(distance(this.mx, this.my, x, y) < 1) ++this.phase;
			break;
			case 2:
				x = game.width - this.s * i; y = game.height - this.s * i; r = atan2(y - this.my, x - this.mx);
				this.velocity.x += cos(r) * this.acl;
				this.velocity.y += sin(r) * this.acl;
				if(distance(this.mx, this.my, x, y) < 1) ++this.phase;
			break;
			case 3:
				x = this.s * i; y = game.height - this.s * i; r = atan2(y - this.my, x - this.mx);
				this.velocity.x += cos(r) * this.acl;
				this.velocity.y += sin(r) * this.acl;
				if(distance(this.mx, this.my, x, y) < 1) this.phase = 0;
			break;
		}
	}
}
class Swerve extends Enemy{
	color = "#faf";
    r = random(PI * 2);
    bias = random(10) - 5;
	multiplier = 0.02;
	tick() {
        var {rad, velocity, bias} = this;
        rad += (random(1 - abs(bias/5)) + bias/5 - (1 - abs(bias/5))/2) * PI/6;
        bias += random(2) - 1;
        if(bias > 5) bias = 5;
        if(bias < -5) bias = -5;
        velocity.x += Math.cos(rad) * this.acl;
        velocity.y += Math.sin(rad) * this.acl;
        this.bias = bias;
    }
    image = Player2;
	xp = 30;
}
class Bounce extends Stayer{
	color = "#aff"; time = 100;
	r = random(PI * 2);
	multiplier = 0.02;
	image = Player4;
	tick() {
		var {velocity} = this;
		velocity.x += cos(this.r) * this.acl;
		velocity.y += sin(this.r) * this.acl;
		if(this.time > 75) this.color = "#00f";
		else if(this.time > 50) this.color = "#55d";
		else if(this.time > 25) this.color = "#aab";
		else this.color = "#ffa";
		if(this.time > 0) this.time--; 
		else{
			this.time = 100;
			this.r = random(PI * 2);
		}
		this.isMoving = true;
	}
	xp = 40;
}
class Dash extends Mover{
	tick() {
		if(!this.dis) {
			this.dis += this.acl;
			this.rad = random(PI * 2);
		}else this.dis += this.acl;
		if(this.time) {
			this.time--;
			this.color = "#555";
		}else{
			this.color = "#fff";
			if(Entity.distance(this, player) < 5) {
				this.rad = Entity.radian(this, player);
				this.time = 100;
			}
		}
	}
	xp = 50;
	multiplier = 0.02;
	image = Player4;
}