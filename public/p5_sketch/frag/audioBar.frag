precision mediump float;

// grab texcoords from the vertex shader
varying vec2 vTexCoord;

// 25个 能量值
uniform mat3 bars_energy_1;
uniform mat4 bars_energy_2;

uniform sampler2D tex0;

//前面6个 bar 和后面的bar 中间个了 两个 bit_interval
const float m_left = 500.0;
const float m_right = 1420.0;
const float m_bottom = 670.0;// audioBar的底部
const float rate = 1.3; //前面的audioBar 的间距与 后面的audioBar 间距的比例.
const float interval = (m_right - m_left) / (18. + 7. * rate);
const float big_interval = interval * rate; //前面6个audioBar 是
// 1: inside the rect;  0:out of the rect
bool inRect(vec2 point, vec2 leftRight, vec2 rightBottom) {
    return point.x > leftRight.x && point.x < rightBottom.x && point.y > leftRight.y && point.y < rightBottom.y;
}
float getBarHeight(float energy) {
    return mix(100., 600., energy / 255.);
}


//是的吧, 你看好了吗? 我也有的呀, 去年就有了,
vec3 audioBar(vec2 p, vec3 back, vec3 front) {
    float x = m_left;
    bool ret;
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) {
            float e = bars_energy_1[i][j];
            ret = inRect(p, vec2(x, m_bottom - getBarHeight(e)), vec2(x + 20., m_bottom));
            if (ret) return front;
            x += big_interval;
        }
    }
    x += big_interval;
    for (int i = 0; i < 3; i++) {
        float e = bars_energy_1[2][i];
        ret = inRect(p, vec2(x, m_bottom - getBarHeight(e)), vec2(x + 15., m_bottom));
        if (ret) return front;
        x += interval;
    }

    for (int i = 0; i < 4; i++) {
        for (int j = 0; j < 4; j++) {
            float e = bars_energy_2[i][j];
            ret = inRect(p, vec2(x, m_bottom - getBarHeight(e)), vec2(x + 15., m_bottom));
            if (ret) return front;
            x += interval;
        }
    }
    return back;
}



void main() {
    vec2 uv = vTexCoord;
    uv = 1.0 - uv;
    // get the webcam as a vec4 using texture2D
    vec4 tex = texture2D(tex0, uv);

    vec3 bac = vec3(0., 0., 0.);
    vec3 front = vec3(234. / 255., 162. / 255., 119. / 255.);
    float x_ = gl_FragCoord.x;
    float y_ = 864. - gl_FragCoord.y;

    vec3 color = audioBar(vec2(gl_FragCoord.x, 864. - gl_FragCoord.y), bac, front);
    //如果 此时 上面的图层有颜色, 那么直接代替...
    if (color.r > 0.) {
        tex.rgb = mix(tex.rgb, color, .4);
    }
    gl_FragColor = tex;



}