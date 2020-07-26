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
				if(tipNum < 1)
					tip("Shoot the white boxes", 100, "#fff");
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
				if(tipNum < 2)
					tip("Easy enough right?", 100, "#fff");
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
				if(tipNum < 3)
					tip("Your not the only one able to move.", 100, "#faa");
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
				if(tipNum < 4)
					tip("Beware, reds can bounce off other boxes", 100, "#faa");
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
				if(tipNum < 5)
					tip("Watch out, these boxes are determined", 200, "#afa");
			};
			if(this.summon > 0) {if(Enemy.spawn(new Stayer) && this.summon) this.summon--}
			if(this.summon2 > 0) {if(Enemy.spawn(new Walker) && this.summon2) this.summon2--}
		}
	]
}