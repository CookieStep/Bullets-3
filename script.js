let canvas = document.createElement("canvas"), ctx = canvas.getContext("2d");
let page = document.createElement("canvas"), pen = page.getContext("2d");
let {assign} = Object,
	{sin, cos, floor, PI, random, sqrt, pow} = Math;
	game = {
		width: 500,
		height: 500
	}
onload = () => {
	let {width, height} = game;
	assign(canvas, {width, height});
	page.width = innerWidth;
	page.height = innerHeight;
	document.body.appendChild(page);
	update();
};
let time = 0
let update = () => {
	player.update();
	let imageData = ctx.getImageData(0, 0, 500, 500);
	for(let i = 3; i < (imageData.data.length); i += 4) {
		if(imageData.data[i]) imageData.data[i] -= 15;
		if(imageData.data[i] < 0) imageData.data[i] = 0;
	}
	ctx.putImageData(imageData, 0, 0);
	player.draw();
	let lL = innerWidth < innerHeight? innerWidth: innerHeight;
	for(var _x = -1; _x <= 1; _x++) for(var _y = -1; _y <= 1; _y++) {
		pen.fillRect((innerWidth - lL)/2 + _x * lL, (innerHeight - lL)/2 + _y * lL, lL, lL);
		pen.drawImage(canvas, (innerWidth - lL)/2 + _x * lL, (innerHeight - lL)/2 + _y * lL, lL, lL);
	}
	requestAnimationFrame(update);
};
let Player = function() {
	var velocity = {x: 0, y: 0};
	assign(this, {
		velocity, radian: PI * 3/2,
		x: game.width/2, y: game.height/2,
		r: 15, rot: 0, friction: 0.8,
		spd: 0.02,
		turn(d) {this.rot += d * PI/180},
		draw() {
			for(var _x = -1; _x <= 1; _x++) for(var _y = -1; _y <= 1; _y++) {
				var {x, y, r, radian} = this;
				x += _x * game.width; y += _y * game.height;
				r /= PI/4; radian += PI/4;
				var a = cos(radian) * r, b = sin(radian) * r,
					c = a/4, d = b/4;
				ctx.fillStyle = "#aaf";
				ctx.strokeStyle = "#aaf";
				ctx.lineWidth = r/15;
				ctx.lineJoin = "round";
				ctx.lineCap = "round";
				ctx.beginPath();
				ctx.moveTo(x + a - c + d, y + b - c - d);
				ctx.lineTo(x + b + c - d, y - a + c + d);
				ctx.quadraticCurveTo(x + b, y - a, x + b - c - d, y - a + c - d);
				ctx.lineTo(x - a + c + d, y - b - c + d);
				ctx.quadraticCurveTo(x - a, y - b, x - a + c - d, y - b + c + d);
				ctx.lineTo(x - b - c + d, y + a - c - d);
				ctx.quadraticCurveTo(x - b, y + a, x - b + c + d, y + a - c + d);
				ctx.lineTo(x + a - c - d, y + b + c - d);
				ctx.quadraticCurveTo(x + a, y + b, x + a - c + d, y + b - c - d);
				ctx.fill(); ctx.stroke();
				ctx.beginPath();
				ctx.fillStyle = "#afa";
				ctx.strokeStyle = "#9e9";
				ctx.lineWidth = r/15;
				r /= 3; radian -= PI/4;
				ctx.moveTo(x + cos(radian) * r, y + sin(radian) * r)
				radian += PI * 2/3;
				ctx.lineTo(x + cos(radian) * r, y + sin(radian) * r)
				radian += PI * 2/3;
				ctx.lineTo(x + cos(radian) * r, y + sin(radian) * r)
				radian += PI * 2/3;
				ctx.lineTo(x + cos(radian) * r, y + sin(radian) * r)
				ctx.fill(); ctx.stroke();
			}
		},
		update() {
			if(keys.a) this.turn(-1);
			if(keys.d) this.turn(1);
			if(keys.w) {
				velocity.x += cos(this.radian) * this.r * this.spd;
				velocity.y += sin(this.radian) * this.r * this.spd;
			}
			if(keys.s) {
				velocity.x -= cos(this.radian) * this.r * this.spd;
				velocity.y -= sin(this.radian) * this.r * this.spd;
			}
			if(this.x < 0) this.x += game.width;
			if(this.x > game.width) this.x -= game.width;
			if(this.y < 0) this.x += game.height;
			if(this.y > game.height) this.x -= game.height;
			this.x += velocity.x;
			this.y += velocity.y;
			this.radian += this.rot;
			this.rot *= this.friction;
			velocity.x *= sqrt(this.friction);
			velocity.y *= sqrt(this.friction);
		}
	});
}
let keys = {}, player = new Player;
onkeydown = (e) => keys[e.key] = 1;
onkeyup = (e) => delete keys[e.key];