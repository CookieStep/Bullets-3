Object.assign(CanvasRenderingContext2D.prototype, {
	rect2(x, y, w, h, r=0){
		var v = x + w, b = y + h;
		this.moveTo(x+r, y);
		this.lineTo(v-r, y);
		this.quadraticCurveTo(v, y, v, y+r);
		this.lineTo(v, b-r);
		this.quadraticCurveTo(v, b, v-r, b);
		this.lineTo(x+r, b);
		this.quadraticCurveTo(x, b, x, b-r);
		this.lineTo(x, y+r);
		this.quadraticCurveTo(x, y, x+r, y);
	}
});