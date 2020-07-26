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
let Shoot = new Sound(
    {volume: 0.5},
    {src: "Music/Shoot.wav", type : "audio/wav"}
)
let Boom = new Sound(
    {volume: 0.5},
    {src: "Music/Boom.wav", type : "audio/wav"},
    {src: "Music/Boom3.wav", type : "audio/wav"}
)
let Death = new Sound(
    {volume: 0.5},
    {src: "Music/Death.wav", type : "audio/wav"}
)
Death.element.playbackRate = 2;
let Xp = new Sound(
    {volume: 0.5},
    {src: "Music/Xp.wav", type : "audio/wav"},
    {src: "Music/Xp3.wav", type : "audio/wav"},
    {src: "Music/Xp4.wav", type : "audio/wav"},
    {src: "Music/Xp6.wav", type : "audio/wav"}
)
let Wall = new Sound(
    {volume: 0.5},
    {src: "Music/Wall.wav", type : "audio/wav"},
    {src: "Music/Wall2.wav", type : "audio/wav"},
    {src: "Music/Wall3.wav", type : "audio/wav"},
    {src: "Music/Wall4.wav", type : "audio/wav"}
)
let started = false;