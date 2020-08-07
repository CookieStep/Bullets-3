onload = function() {
	var {body} = document;
	document.title = "Bullets 3";
	body.appendChild(canvas);
	onresize();
	if(localStorage.tipNum) localStorage.tipNum = Number(localStorage.tipNum);
	else localStorage.tipNum = 0;
	if(localStorage.keyBind) keyBind = JSON.parse(localStorage.keyBind);
	else{
		resetKeybind();
		localStorage.keyBind = JSON.stringify(keyBind);
	}
	setupKeybind();
	({tipNum} = localStorage);
	setupLevels();
	update();
};
var tipNum;
onresize = function() {
	Object.assign(canvas, {
		width: innerWidth,
		height: innerHeight
	});
	ctx.scale(scale, scale);
}
onblur = function() {
	keys = {};
	Level_1.pause();
	Boss_1.pause();
	Level_2.pause();
	Boss_2.pause();
	cancelAnimationFrame(request);
}
var mouse = {x: 0, y: 0}
onmousedown = function(mouse) {
	if(bindMenu.active) window.mouse = {x: mouse.x/scale, y: mouse.y/scale, click: true};
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
	if(bindMenu.active) bindMenu();
	else{
		if(menu.active) menu.call(menu);
		else main();
	}
	onfocus();
}
var keyBind;
var bind = [];
function resetKeybind() {
	keyBind = {
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
}
function setupKeybind() {
	bind = [];
	for(let id in keyBind) {
		bind[keyBind[id]] = id;
	}
}
var keys = {};
onkeydown = function(pressed) {
	let key = bind[pressed.keyCode];
	if(pressed.key == "F1") {
		pressed.preventDefault();
		bindMenu.active = !bindMenu.active;
	}
	if(pressed.key == "F2") {
		pressed.preventDefault();
		resetKeybind();
		setupKeybind();
		localStorage.keyBind = JSON.stringify(keyBind);
	}
	if(pressed.key == "F3") {
		pressed.preventDefault();
		enemies = [];
		enemies2 = [];
		bullets = [];
		exp = [];
		level = 0;
		added = 0;
		lives = 3;
		score = 0;
		multiplier = 1;
		menu.active = "player";
		setupLevels();
	}
	if(bindMenu.active && bindMenu.selected && !(pressed.key.length == 2 && pressed.key[0] == "F")) {
		bindMenu.add = pressed.keyCode;
	}else{
		if(!keys[key]) keys[key] = 1;
		else keys[key] = 3;
	}
}
onkeyup = function(released) {
	let key = bind[released.keyCode];
	delete keys[key];
}