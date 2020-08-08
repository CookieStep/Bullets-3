var levels = [function() {}]
function genLevel(num) {
	return levels[num].call(levels[num]);
}
function setupLevels() {
	levels = [
		function() {
			Level_1.play();
			if(this.summon == undefined) {
				this.summon = 5;
				this.time = 50;
				if(tipNum < 1)
					tip(["Shoot the white boxes"], 100, "#fff");
			};
			if(this.summon > 0) {if(Enemy.spawn(new Enemy)) this.summon--}
			else if(enemies.length == 0) {
				if(this.time <= 0) level++;
				else this.time--;
			}
		},
		function() {
			Level_1.play();
			if(this.summon == undefined) {
				this.summon = 5;
				this.time = 50;
				if(tipNum < 2)
					tip(["Easy enough right?"], 100, "#fff");
			};
			if(this.summon > 0) {if(Enemy.spawn(new Enemy) && this.summon) this.summon--}
			else if(enemies.length == 0) {
				if(this.time <= 0) level++;
				else this.time--;
			}
		},
		function() {
			Level_1.play();
			if(this.summon == undefined) {
				this.summon = 5;
				this.time = 50;
				if(tipNum < 3)
					tip(["Your not the only one able to move."], 100, "#faa");
			};
			if(this.summon > 0) {if(Enemy.spawn(new Mover)) this.summon--}
			else if(enemies.length == 0) {
				if(this.time <= 0) level++;
				else this.time--;
			}
		},
		function() {
			Level_1.play();
			if(this.summon == undefined) {
				this.summon = 5;
				this.summon2 = 5;
				this.time = 50;
				if(tipNum < 4)
					tip(["Beware, reds can bounce off other boxes"], 100, "#faa");
			}
			if(this.summon > 0) {if(Enemy.spawn(new Enemy)) this.summon--}
			else if(this.summon2 > 0) {if(Enemy.spawn(new Mover)) this.summon2--}
			else if(enemies.length == 0) {
				if(this.time <= 0) level++;
				else this.time--;
			}
		},
		function() {
			Level_1.play();
			if(this.summon == undefined) {
				this.summon = 5;
				this.summon2 = 5;
				this.time = 50;
				if(tipNum < 5)
					tip(["Watch out, these boxes are determind"], 100, "#afa");
			};
			if(this.summon > 0) {if(Enemy.spawn(new Stayer) && this.summon) this.summon--}
			else if(this.summon2 > 0) {if(Enemy.spawn(new Mover) && this.summon2) this.summon2--}
			else if(enemies.length == 0) {
				if(this.time <= 0) level++;
				else this.time--;
			}
		},
		function() {
			Level_1.play();
			if(this.summon == undefined) {
				this.summon = 5;
				this.time = 50;
				if(tipNum < 6)
					tip(["You've been cornered"], 100, "#ffa");
			};
			if(this.summon > 0) {if(Enemy.spawn(new Waller)) this.summon--}
			else if(enemies.length == 0) {
				if(this.time <= 0) level++;
				else this.time--;
			}
		},
		function() {
			Level_1.play();
			if(this.summon == undefined) {
				this.summon = 5;
				this.summon2 = 5;
				this.time = 50;
			};
			if(this.summon > 0) {if(Enemy.spawn(new Waller)) this.summon--}
			else if(this.summon2 > 0) {if(Enemy.spawn(new Mover)) this.summon2--}
			else if(enemies.length == 0) {
				if(this.time <= 0) level++;
				else this.time--;
			}
		},
		function() {
			Level_1.play();
			if(this.summon == undefined) {
				this.summon = 5;
				this.summon2 = 5;
				this.time = 50;
			};
			if(this.summon > 0) {if(Enemy.spawn(new Waller)) this.summon--}
			else if(this.summon2 > 0) {if(Enemy.spawn(new Stayer)) this.summon2--}
			else if(enemies.length == 0) {
				if(this.time <= 0) level++;
				else this.time--;
			}
		},
		function() {
			Level_1.play();
			if(this.summon == undefined) {
				this.summon = 10;
				this.time = 150;
			};
			if(this.summon > 0) {if(Enemy.spawn(new Waller)) this.summon--}
			else if(enemies.length == 0) {
				if(tipNum < 7)
					tip(["Oh no... Looks like someone isn't", "happy with how far you've come..."], 100, "#d00");
				Level_1.stop();
				Boss_1.play();
				if(this.time <= 0) level++;
				else this.time--;
			}
		},
		function() {
			Boss_1.play();
			if(!this.summon) {
				this.time = 100;
				display(["Tracer Boss"], 50, "orange");
				if(Enemy.spawn2(new Boss)) this.summon = true;
			}else if(enemies2.length == 0) {
				Boss_1.stop();
				Level_2.play();
				if(this.time <= 0) level++;
				else this.time--;
			}
		},
		function() {
			Level_2.play();
			if(this.summon == undefined) {
				this.summon = 5;
				this.summon2 = 5;
				this.time = 50;
				if(tipNum < 8)
					tip(["Sorry to throw you a curve-ball like this"], 100, "#faf");
			};
			if(this.summon > 0) {if(Enemy.spawn(new Swerve)) this.summon--}
			else if(this.summon2 > 0) {if(Enemy.spawn(new Enemy)) this.summon2--}
			else if(enemies.length == 0) {
				if(this.time <= 0) level++;
				else this.time--;
			}
		},
		function() {
			Level_2.play();
			if(this.summon == undefined) {
				this.summon = 5;
				this.summon2 = 5;
				this.time = 50;
				if(tipNum < 9)
					tip(["Round and round and round it goes", "will it stop? Yes, shoot it."], 100, "#aaf");
			};
			if(this.summon > 0) {if(Enemy.spawn(new Mover)) this.summon--}
			else if(this.summon2 > 0) {if(Enemy.spawn(new Tracer)) this.summon2--}
			else if(enemies.length == 0) {
				if(this.time <= 0) level++;
				else this.time--;
			}
		},
		function() {
			Level_2.play();
			if(this.summon == undefined) {
				this.summon = 5;
				this.summon2 = 5;
				this.time = 50;
			};
			if(this.summon > 0) {if(Enemy.spawn(new Swerve)) this.summon--}
			else if(this.summon2 > 0) {if(Enemy.spawn(new Tracer)) this.summon2--}
			else if(enemies.length == 0) {
				if(this.time <= 0) level++;
				else this.time--;
			}
		},
		function() {
			Level_2.play();
			if(this.summon == undefined) {
				this.summon = 5;
				this.summon2 = 5;
				this.time = 50;
			};
			if(this.summon > 0) {if(Enemy.spawn(new Swerve)) this.summon--}
			else if(this.summon2 > 0) {if(Enemy.spawn(new Mover)) this.summon2--}
			else if(enemies.length == 0) {
				if(this.time <= 0) level++;
				else this.time--;
			}
		},
		function() {
			Level_2.play();
			if(this.summon == undefined) {
				this.summon = 5;
				this.time = 50;
				if(tipNum < 10)
					tip(["These will switch up on you"], 100, "#aff");
			};
			if(this.summon > 0) {if(Enemy.spawn(new Bounce)) this.summon--}
			else if(enemies.length == 0) {
				if(this.time <= 0) level++;
				else this.time--;
			}
		},
		function() {
			Level_2.play();
			if(this.summon == undefined) {
				this.summon = 5;
				this.summon2 = 5;
				this.time = 50;
			};
			if(this.summon > 0) {if(Enemy.spawn(new Swerve)) this.summon--}
			else if(this.summon2 > 0) {if(Enemy.spawn(new Bounce)) this.summon2--}
			else if(enemies.length == 0) {
				if(this.time <= 0) level++;
				else this.time--;
			}
		},
		function() {
			Level_2.play();
			if(this.summon == undefined) {
				this.summon = 5;
				this.time = 50;
				if(tipNum < 11)
					tip(["Don't get too close, they", "might just sense your presence"], 100, "#555");
			};
			if(this.summon > 0) {if(Enemy.spawn(new Dash)) this.summon--}
			else if(enemies.length == 0) {
				if(this.time <= 0) level++;
				else this.time--;
			}
		},
		function() {
			Level_2.play();
			if(this.summon == undefined) {
				this.summon = 5;
				this.summon2 = 5;
				this.time = 50;
			};
			if(this.summon > 0) {if(Enemy.spawn(new Tracer)) this.summon--}
			else if(this.summon2 > 0) {if(Enemy.spawn(new Bounce)) this.summon2--}
			else if(enemies.length == 0) {
				if(this.time <= 0) level++;
				else this.time--;
			}
		},
		function() {
			Level_2.play();
			if(this.summon == undefined) {
				this.summon = 5;
				this.summon2 = 5;
				this.time = 50;
			};
			if(this.summon > 0) {if(Enemy.spawn(new Tracer)) this.summon--}
			else if(this.summon2 > 0) {if(Enemy.spawn(new Dash)) this.summon2--}
			else if(enemies.length == 0) {
				Level_2.stop();
				Boss_2.play();
				if(this.time == 0) {
					if(tipNum < 12)
						tip(["Remain calm."], 100, "#d00");
				}
				if(this.time <= 0) level++;
				else this.time--;
			}
		},
		function() {
			Boss_2.play();
			if(!this.summon) {
				this.time = 100;
				display(["MoveMaster"], 50, "#5aa");
				if(Enemy.spawn2(new Boss2)) {
					this.summon = true;
					Minion2.count = 10;
					Minion2_2.count = 10;
				}
			}else if(enemies2.length == 0) {
				if(this.time <= 0) level++;
				else this.time--;
				Boss_2.stop();
				Level_3.play();
			}
		},
		function() {
			Level_3.play();
			if(this.summon == undefined) {
				if(tipNum < 12)
					tip(["I think these ones can see you"], 100, "#f55");
				this.summon = 5;
				this.time = 50;
			};
			if(this.summon > 0) {if(Enemy.spawn(new Chaser)) this.summon--}
			else if(enemies.length == 0) {
				if(this.time <= 0) level++;
				else this.time--;
			}
		},
		function() {
			Level_3.play();
			if(this.summon == undefined) {
				this.summon = 5;
				this.time = 50;
			};
			if(this.summon > 0) {if(Enemy.spawn(new Patrol)) this.summon--}
			else if(enemies.length == 0) {
				if(this.time <= 0) level++;
				else this.time--;
			}
		},
		function() {
			Level_3.play();
			if(this.summon == undefined) {
				this.summon = 5;
				this.summon2 = 5;
				this.time = 50;
			};
			if(this.summon > 0) {if(Enemy.spawn(new Pushed)) this.summon--}
			else if(this.summon2 > 0) {if(Enemy.spawn(new Pusher)) this.summon2--}
			else if(enemies.length == 0) {
				if(this.time <= 0) level++;
				else this.time--;
			}
		},
		function() {
			Level_3.play();
			if(this.summon == undefined) {
				this.summon = 5;
				this.summon2 = 5;
				this.time = 50;
			};
			if(this.summon > 0) {if(Enemy.spawn(new Chaser)) this.summon--}
			else if(this.summon2 > 0) {if(Enemy.spawn(new Patrol)) this.summon2--}
			else if(enemies.length == 0) {
				if(this.time <= 0) level++;
				else this.time--;
			}
		},
		function() {
			Level_3.play();
			if(this.summon == undefined) {
				this.summon = 3;
				this.summon2 = 2;
				this.summon3 = 5;
				this.time = 50;
			};
			if(this.summon > 0) {if(Enemy.spawn(new Pushed)) this.summon--}
			else if(this.summon2 > 0) {if(Enemy.spawn(new Pusher)) this.summon2--}
			else if(this.summon3 > 0) {if(Enemy.spawn(new Patrol)) this.summon3--}
			else if(enemies.length == 0) {
				if(this.time <= 0) level++;
				else this.time--;
			}
		},
		function() {
			Level_3.play();
			if(this.summon == undefined) {
				this.summon = 3;
				this.summon2 = 2;
				this.summon3 = 5;
				this.time = 50;
			};
			if(this.summon > 0) {if(Enemy.spawn(new Pushed)) this.summon--}
			else if(this.summon2 > 0) {if(Enemy.spawn(new Pusher)) this.summon2--}
			else if(this.summon3 > 0) {if(Enemy.spawn(new Chaser)) this.summon3--}
			else if(enemies.length == 0) {
				if(this.time <= 0) level++;
				else this.time--;
			}
		},
		function() {
			Level_3.play();
			if(this.summon == undefined) {
				this.summon = 3;
				this.summon2 = 2;
				this.summon3 = 3;
				this.summon4 = 2;
				this.time = 50;
			};
			if(this.summon > 0) {if(Enemy.spawn(new Pushed)) this.summon--}
			else if(this.summon2 > 0) {if(Enemy.spawn(new Pusher)) this.summon2--}
			else if(this.summon3 > 0) {if(Enemy.spawn(new Chaser)) this.summon3--}
			else if(this.summon4 > 0) {if(Enemy.spawn(new Dash)) this.summon4--}
			else if(enemies.length == 0) {
				if(this.time <= 0) level++;
				else this.time--;
			}
		},
		function() {
			Level_3.play();
			if(this.summon == undefined) {
				this.summon = 5;
				this.time = 50;
			};
			if(this.summon > 0) {if(Enemy.spawn(new Tough)) this.summon--}
			else if(enemies.length == 0) {
				if(this.time <= 0) level++;
				else this.time--;
			}
		},
		function() {
			Level_3.play();
			if(this.summon == undefined) {
				this.summon = 10;
				this.time = 50;
			};
			if(this.summon > 0) {if(Enemy.spawn(new Tough)) this.summon--}
			else if(enemies.length == 0) {
				Level_3.stop();
				Boss_2.play();
				if(this.time <= 0) level++;
				else this.time--;
			}
		},
		function() {
			Boss_2.play();
			if(!this.summon) {
				this.time = 100;
				display(["MoveMaster"], 50, "#5aa");
				if(Enemy.spawn(new Boss3)) {
					let i = enemies[0];
					let {x, y} = i;
					let n = new Boss3_2;
					if(Enemy.spawn(n)) {
						enemies.push(n);
						i.partner = n;
						n.partner = i;
						this.summon = true;
					}else enemies = [];
				}
			}else if(enemies.length == 0) {
				// if(this.time <= 0) level++;
				// else this.time--;
				Boss_2.stop();
				Level_3.play();
			}
		}
	]
}