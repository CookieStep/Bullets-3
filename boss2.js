class Boss2 extends Boss{
	tick() {
		switch(this.phase) {
			case 0:
				this.color = "#a55";
				if(this.moveTo(game.width/2, this.s) < 0.1) {
					this.phase++;
					this.time = 75;
				}
			break;
			case 1:
				if(this.time > 50) {
					var off = random(PI * 2);
					if(this.time % 5 == 0) {
						for(let i = 0; i < 4; i++) {
							let enemy = new Minion2;
							enemy.mx = player.mx + cos(i/2 * PI + off) * 5;
							enemy.my = player.my + sin(i/2 * PI + off) * 5;
							enemy.dis = enemy.spd;
							enemy.rad = (i/2 * PI + off) + PI;
							if(!enemy.screenlock()) enemies2.push(enemy);
						}
					}
					this.time--;
				}else if(this.time) {
					this.color = "#a5a";
					this.time--;
				} else{
					this.phase++;
					this.time = 100;
					let a = floor(random(3)) + 1;
					for(let i = 0; i < 5; i++) {
						if(i == a) continue;
						let enemy = new Minion2_2;
						enemy.spd *= 3/2;
						enemy.dis = enemy.acl;
						enemy.rad = 0;
						enemy.mx = enemy.s * 2;
						enemy.my = game.height/5 * i + game.height/12;
						enemies2.push(enemy);
					}
				}
			break;
			case 2:
				if(this.moveTo(this.s, game.height/2) < 1) {
					this.phase++;
					this.time = 100;
					this.color = "#5aa"
				}
			break;
			case 3:
				if(this.time % 10 == 0){
					let enemy = new Minion2;
					enemy.time *= 2;
					enemy.spd *= 2;
					enemy.dis = enemy.acl;
					enemy.rad = PI/2;
					enemy.mx = (1 - this.time/100) * game.width;
					enemy.my = enemy.s;
					enemies2.push(enemy);
				}
				if(this.time) this.time--;
				else{
					this.phase++;
					this.color = "#aa5";
				}
			break;
			case 4:
				if(this.moveTo(player.mx, player.my) < 10) {
					this.phase++;
					this.time = 150;
				}
			break;
			case 5:
				if(this.time > 50) {
					var off = Entity.radian(this, player);
					if(this.time % 15 == 0) {
						for(let i = 0; i < 4; i++) {
							let enemy = new Minion2_2;
							enemy.s /= 2; enemy.spd /= 2;
							enemy.mx = this.mx + cos(i/2 * PI + off) * 2;
							enemy.my = this.my + sin(i/2 * PI + off) * 2;
							enemy.hitWall = function() {this.hp = 0}
							enemy.dis = enemy.spd;
							enemy.rad = (i/2 * PI + off);
							enemies2.push(enemy);
						}
					}
					this.time--;
				}else if(this.time) {
					this.time--;
					this.color = "#a5a"
				}else{
					this.phase++;
					this.time = 100;
					let a = floor(random(3)) + 1;
					for(let i = 0; i < 5; i++) {
						if(i == a) continue;
						let enemy = new Minion2_2;
						enemy.spd *= 3/2;
						enemy.dis = enemy.acl;
						enemy.rad = PI;
						enemy.mx = game.width - enemy.s * 2;
						enemy.my = game.height/5 * i + game.height/12;
						enemies2.push(enemy);
					}
				}
			break;
			case 6:
				if(enemies2.length == 1) {
					this.phase++;
					this.time = 100;
					let a = floor(random(3));
					for(let i = 0; i < 5; i++) {
						if(i == a) continue;
						let enemy = new Minion2_2;
						enemy.spd *= 3/2;
						enemy.dis = enemy.acl;
						enemy.rad = 0;
						enemy.mx = enemy.s * 2;
						enemy.my = game.height/5 * i + game.height/12;
						enemies2.push(enemy);
					}
				}
			break;
			case 7:
				if(this.time) this.time--;
				else this.phase = 0;
			break;
		}
	}
	maxHp = 40;
	hp = 40;
	image = HPlayer;
	s = 2; color = "#a55";
}
class Minion2 extends Mover{
	color = "#5aa";
	time = 13;
	tick() {
		super.tick();
		this.time--;
		if(this.time <= 0) this.hp = 0;
	}
	image = HPlayer;
}
class Minion2_2 extends Mover{
	color = "#a5a";
	time = 100;
	maxHp = 2;
	hp = 2;
	tick() {
		super.tick();
		this.time--;
		if(this.time <= 0) this.hp = 0;
	}
	image = HPlayer;
}