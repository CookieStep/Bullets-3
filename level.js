let levels = [function() {}]
function genLevel(num) {
	return levels[num].call(levels[num]);
}
function setupLevels() {
	levels = [
		function() {
			if(this.summon == undefined) {
				this.summon = 5;
				this.time = 50;
				tip("Shoot the white ones", 200, "#fff");
			};
			if(this.summon > 0) {if(Enemy.spawn(new Enemy) && this.summon) this.summon--}
			else if(enemies.length == 0) {
				if(this.time <= 0) level++;
				else this.time--;
			}
		},
		function() {
			if(this.summon == undefined) {
				this.summon = 5;
				this.time = 50;
				tip("Easy enough right?", 200, "#fff");
			};
			if(this.summon > 0) {if(Enemy.spawn(new Enemy) && this.summon) this.summon--}
			else if(enemies.length == 0) {
				if(this.time <= 0) level++;
				else this.time--;
			}
		},
		function() {
			if(this.summon == undefined) {
				this.summon = 5;
				this.time = 50;
				tip("Your not the only one able to move.", 200, "#faa");
			};
			if(this.summon > 0) {if(Enemy.spawn(new Walker) && this.summon) this.summon--}
			else if(enemies.length == 0) {
				if(this.time <= 0) level++;
				else this.time--;
			}
		},
		function() {
			if(this.summon == undefined) {
				this.summon = 5;
				this.summon2 = 5;
				this.time = 50;
				tip("Beware, reds can bounce off whites", 200, "#faa");
			};
			if(this.summon > 0) {if(Enemy.spawn(new Enemy) && this.summon) this.summon--}
			else if(this.summon2 > 0) {if(Enemy.spawn(new Walker) && this.summon2) this.summon2--}
			else if(enemies.length == 0) {
				if(this.time <= 0) level++;
				else this.time--;
			}
		},
		function() {
			if(this.summon == undefined) {
				this.summon = 5;
				this.summon2 = 5;
				this.time = 50;
				tip("Watch out, these ones are determined", 200, "#afa");
			};
			if(this.summon > 0) {if(Enemy.spawn(new Stayer) && this.summon) this.summon--}
			if(this.summon2 > 0) {if(Enemy.spawn(new Walker) && this.summon2) this.summon2--}
		}
	]
}