let levels = [function() {}]
function genLevel(num) {
	return levels[num].call(levels[num]);
}
function setupLevels() {
	levels = [
		function() {
			if(this.summon == undefined) this.summon = 20;
			if(this.summon) if(Entity.spawn(new Enemy)) this.summon--;
		}
	]
}