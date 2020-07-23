function spawn(what) {
	function check() {
		if(enemies.length) for(let enemy of enemies) {
			if(Entity.isTouching(what, enemy) && what.uid != enemy.uid) return true;
		}
		return false;
	}
	i = 0;
	do{
		assign(what, {
			x: random(game.width - what.s),
			y: random(game.height - what.s)
		});
		if((check() || Entity.distance(player, what) < 15) && i++ > 100) {
			return;
		}
	}while(check() || Entity.distance(player, what) < 15)
	enemies.push(what)
}
class Enemy extends Entity{
	color = "white";
}
class Walker extends Enemy{
	color = "red";
	tick() {
		if(!this.dis) {
			this.dis = this.spd;
			this.rad = random(PI * 2);
		}else this.dis = this.spd;
		this.isMoving = true;
	}
}