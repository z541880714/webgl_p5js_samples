const width = 1920, height = 864
var rectShader


let cam;

function preload() {
    console.log('preload!!!')
    //相对地址为  index.html 所在目录
    rectShader = loadShader('p5_sketch/vert/vertex.vert', 'p5_sketch/frag/audioBar.frag')
}

function setup() {
    console.log('setup!!!')
    createCanvas(1920, 864, WEBGL);
    noStroke();

    cam = createCapture(VIDEO);
    cam.size(width, height)
    cam.hide()
}


function draw() {
    background(0);
    blendMode(BLEND)
    shader(rectShader);
    rectShader.setUniform('tex0', cam)
    rectShader.setUniform('resolution', [width, height]);
    rectShader.setUniform('bars_energy_1', [random(255.), random(255.), random(255.), random(255.), random(255.),
        random(255.), random(255.), random(255.), random(255.)])
    rectShader.setUniform('bars_energy_2', [random(255.), random(255.), random(255.), random(255.), random(255.),
        random(255.), random(255.), random(255.), random(255.), random(255.), random(255.), random(255.), random(255.),
        random(255.), random(255.), random(255.),])

    rect(0, 0, width, height);
}