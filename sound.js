class Sound {
    constructor(options, ...sources) {
        this.options = options;
        this.sources = sources;
        sources.sort(() => random(2) - 1);
        let elements = [];
        let {volume=1} = options;
        for(let source of sources) {
            let element = document.createElement("audio");
            element.volume = volume;
            let child = document.createElement("source");
            Object.assign(child, source);
            element.appendChild(child);
            elements.push(element)
        }
        this.elements = elements;
    }
    get element() {return this.elements[floor(random(this.elements.length))]}
    play() {
        let {element} = this
        element.currentTime = 0;
        element.play();
    }
}
class Bgm {
    constructor(options, ...sources) {
        this.options = options;
        this.sources = sources;
        sources.sort(() => random(2) - 1);
        let elements = [];
        let {volume=1} = options;
        let element = document.createElement("audio");
        element.volume = volume;
        element.loop = true;
        for(let source of sources) {
            let child = document.createElement("source");
            Object.assign(child, source);
            element.appendChild(child);
            elements.push(element)
        }
        this.element = element;
    }
    play() {
        let {element} = this
        if(!this.isPlaying) {
            element.currentTime = 0;
        }
        element.play();
        this.isPlaying = true;
    }
    pause() {
        this.element.pause();
    }
    resume() {
        this.element.play();
    }
    stop() {
        let {element} = this;
        element.pause();
        element.currentTime = 0;
    }
}
let Shoot = new Sound(
    {volume: 0.125},
    {src: "Music/Shoot.wav", type : "audio/wav"}
)
let Dash_ = new Sound(
    {volume: 0.25},
    {src: "Music/Dash.wav", type : "audio/wav"}
)
let Boom = new Sound(
    {volume: 0.125},
    {src: "Music/Boom.wav", type : "audio/wav"},
    {src: "Music/Boom3.wav", type : "audio/wav"}
)
let Spawn = new Sound(
    {volume: 0.25},
    {src: "Music/Spawn.wav", type : "audio/wav"},
    {src: "Music/Spawn2.wav", type : "audio/wav"},
    {src: "Music/Spawn3.wav", type : "audio/wav"}
)
let Death = new Sound(
    {volume: 0.125},
    {src: "Music/Death.wav", type : "audio/wav"}
)
Death.element.playbackRate = 2;
let Xp = new Sound(
    {volume: 0.125},
    {src: "Music/Xp.wav", type : "audio/wav"},
    {src: "Music/Xp3.wav", type : "audio/wav"},
    {src: "Music/Xp4.wav", type : "audio/wav"},
    {src: "Music/Xp6.wav", type : "audio/wav"}
)
let Wall = new Sound(
    {volume: 0.25},
    {src: "Music/Wall.wav", type : "audio/wav"},
    {src: "Music/Wall2.wav", type : "audio/wav"},
    {src: "Music/Wall3.wav", type : "audio/wav"},
    {src: "Music/Wall4.wav", type : "audio/wav"}
)
let Level_1 = new Bgm(
    {volume: 0.5},
    {src: "Music/Level1.ogg", type : "audio/ogg"}
)
let Level_2 = new Bgm(
    {volume: 1},
    {src: "Music/Level2.ogg", type : "audio/ogg"}
)
let Level_3 = new Bgm(
    {volume: 1},
    {src: "Music/Level3.ogg", type : "audio/ogg"}
)
let Boss_1 = new Bgm(
    {volume: 1},
    {src: "Music/Boss1.ogg", type : "audio/ogg"}
)
let Boss_2 = new Bgm(
    {volume: 1},
    {src: "Music/Boss2.ogg", type : "audio/ogg"}
)
let started = false;