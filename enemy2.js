class Tracer extends Enemy{
	phase = floor(random(4));
	image = Player3; xp = 40;
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
	xp = 40;
}
class Bouncer extends Enemy{
    
}