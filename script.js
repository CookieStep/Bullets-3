onload = function() {
	var {body} = document;
	body.appendChild(canvas);
	onresize();
	update();
};
onresize = function() {
	Object.assign(canvas, {
		width: innerWidth,
		height: innerHeight
	});
	ctx.scale(scale, scale);
}
onblur = function() {
	cancelAnimationFrame(request);
}
onfocus = function() {request = requestAnimationFrame(update);}
var game = {
	get width() {return innerWidth/scale},
	get height() {return innerHeight/scale}
}
function clear() {
	ctx.beginPath();
	ctx.rect(0, 0, game.width, game.height);
	ctx.fillStyle = "#0007"; ctx.fill();
}
var last = Date.now(), request;
function update() {
	var now = Date.now();
	if(now < last + (1000)/fps) {
		onfocus();
		return;
	}else last = now;
	if(menu.active) menu();
	else main();
	onfocus();
}
var keys = {};
onkeydown = function(pressed) {
	if(!keys[pressed.key]) keys[pressed.key] = 1;
	else keys[pressed.key] = 3;
}
onkeyup = function(released) {
	delete keys[released.key];
}