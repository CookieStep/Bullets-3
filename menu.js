function menu() {
    clear();
    var text, size;
    switch(menu.active) {
        case "player":
            let {
                players=[new Player, new Player2],
                selected=0,
                offset=0,
                moveTo=0
            } = menu;
            let edge = game.height/6;
            if(menu.screenLines) {
                ctx.beginPath();
                ctx.lineWidth = 1/scale;
                ctx.strokeStyle = "white";
                ctx.moveTo(0, edge);
                ctx.lineTo(game.width, edge);
                ctx.moveTo(0, edge * 5);
                ctx.lineTo(game.width, edge * 5);
                ctx.stroke();
            }
            text = "Ship Select";
            ctx.font = `${edge}px Sans`;
            size = ctx.measureText(text);
            ctx.fillStyle = "white";
            ctx.fillText(text, (game.width - size.width)/2, edge);
            for(let i = 0; i < players.length; i++) {
                let player = players[i];
                player.s = edge;
                player.my = game.height/2;
                player.mx = (i - selected - offset) * (edge * 3) + game.width/2;
                player.draw();
            }
            let desc = descriptions[selected];
            ctx.font = `${edge/2}px Sans`;
            for(let i = 0; i < desc.length; i++) {
                text = desc[i];
                size = ctx.measureText(text);
                ctx.fillStyle = players[selected].color;
                ctx.fillText(text, (game.width - size.width)/2, edge/2 * (i + 9));
            }
            let n = 10;
            if(moveTo != selected) {
                offset += sign(moveTo - selected) * 1/n;
                let s = offset % 1;
                selected += (offset - s);
                offset %= 1;
            }else if(offset > 0) {
                offset -= 1/n;
                if(offset < 0) offset = 0;
            }else if(offset < 0) {
                offset += 1/n;
                if(offset > 0) offset = 0;
            }
            if(keys.ArrowLeft == 1 || keys.ArrowLeft == 3) {
                keys.ArrowLeft = 2;
                moveTo--;
                if(moveTo < 0) moveTo++;
            }
            if(keys.ArrowRight == 1 || keys.ArrowRight == 3) {
                keys.ArrowRight = 2;
                moveTo++;
                if(moveTo >= players.length) moveTo--;
            }
            if(keys.Enter) {
                let sel = [Player, Player2]
                player = new sel[selected];
                player.x = (game.width - player.s)/2;
                player.y = (game.height - player.s)/2;
                for(let i = 0; i < 20; i++) Enemy.spawn(new Enemy);
                menu.active = false;
            }
            Object.assign(menu, {
                players,
                selected,
                offset,
                moveTo
            });
        break;
    }
}
let descriptions = [
    [
        "Four-way Movement",
        "Four-way Shooting"
    ],
    [
        "Four-way Movement",
        "Directional Shooting"
    ]
]
Object.assign(menu, {
    active: "player",
    screenLines: false
})