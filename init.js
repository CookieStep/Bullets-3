const
	canvas = document.createElement("canvas"),
	ctx = canvas.getContext("2d", {alpha: false}),
	scale = 30,
	fps = 40,
	random = (max=1) => Math.random() * max,
	distance = (x, y, x2=0, y2=0) => Math.sqrt(Math.pow(x - x2, 2) + Math.pow(y - y2, 2));
const
	{abs, atan2, cos, PI, round, sign, sin} = Math,
	{assign} = Object;
var player,
	enemies = [],
	bullets = [];