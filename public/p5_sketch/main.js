var gl;

function preload() {
    console.log('preload!!!')


}

function setup() {
    console.log('setup!!!')
    const canvas = document.getElementById('id_canvas')
    gl = canvas.getContext('webgl')
    // 使用完全不透明的黑色清除所有图像
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // 用上面指定的颜色清除缓冲区
    gl.clear(gl.COLOR_BUFFER_BIT);
}


function draw() {
    gl.enable(gl.BLEND)
    console.log('draw!!!')

}