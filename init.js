const
	canvas = document.createElement("canvas"),
	ctx = canvas.getContext("2d", {alpha: false}),
	enemies = [],
	scale = 40,
	fps = 60,
	random = (max=1) => Math.random() * max,
	distance = (x, y, x2=0, y2=0) => Math.sqrt(Math.pow(x - x2, 2) + Math.pow(y - y2, 2));
const
	{abs, atan2, cos, PI, sign, sin} = Math,
	{assign} = Object;