onload = function() {
	var {body} = document;
	body.appendChild(canvas);
	onresize();
	setupLevels();
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
	if(menu.active) menu.call(menu);
	else main();
	onfocus();
}
var keyBind = {
	up: 87,
	left: 65,
	down: 83,
	right: 68,
	left2: 37,
	right2: 39,
	down2: 40,
	up2: 38,
	glide: 16,
	enter: 13,
	select: 32
};
var bind = [];
function setupKeybind() {
	for(let id in keyBind) {
		bind[keyBind[id]] = id;
	}
}
setupKeybind();
var keys = {};
onkeydown = function(pressed) {
	let key = bind[pressed.keyCode];
	if(!keys[key]) keys[key] = 1;
	else keys[key] = 3;
}
onkeyup = function(released) {
	let key = bind[released.keyCode];
	delete keys[key];
}