#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;

uniform vec2 resolusion;
vec3 back,front;
vec2 curP;

bool inRect(vec2 point, vec2 leftRight, vec2 rightBottom) {
    return point.x > leftRight.x && point.x < rightBottom.x && point.y > leftRight.y && point.y < rightBottom.y;
}

vec3 rgb(float r, float g, float b) {
    return vec3(r / 255., g / 255., b / 255.);
}

vec4 rect(vec2 p, vec2 leftTop, vec2 rightBottom) {
    float radius = (rightBottom.x - leftTop.x)* .5;
    if(inRect(p, leftTop, rightBottom)) {
        return vec4(front, 1.);
    }else if(inRect(p, leftTop - vec2(radius,radius*2.), rightBottom + vec2(radius,radius))){
        //计算距离
        float alpha = 1.;
        float dis ;
        if(p.y < leftTop.y) {
            float dis = distance(p, vec2((leftTop.x + rightBottom.x) * .5, leftTop.y));
            if(dis <radius) alpha = 1.;
            else{
                alpha = mix(1., 0., (dis - radius) / radius);
                alpha = clamp(alpha, 0., 1.);
            }
        }else if(p.y > rightBottom.y){
            alpha = 0.;
        }else{
            float dis = abs(p.x - (leftTop.x + rightBottom.x)* .5);
            alpha = mix(1., 0., (dis - 50.)/50.);
        } 
        
        return vec4(front ,alpha);
    }
    return vec4(back,1.);
}

void main() {
    back = rgb(253., 206., 178.);
    front = rgb(137., 178., 249.);
    curP = vec2(gl_FragCoord.x, resolusion.y - gl_FragCoord.y);

    vec4 rectColor = rect(curP, vec2(200., 200.), vec2(300., 300.));
    gl_FragColor = vec4(mix(back, rectColor.rgb, rectColor.a), 1.);

}