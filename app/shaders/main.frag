precision highp float;
uniform float time;
varying vec2 uv;

float plane(vec3 pos) {
	return pos.y;
}
float sphere(vec3 pos,float radius) {
	return length(pos) - radius;
}
float map(vec3 pos) {
	return plane(pos);
}
void main(){
	vec3 pos = vec3(0.0,5.0,-10.0);
	vec3 dir = normalize(vec3(uv,1.0));

	vec3 color = vec3(0.0);

	
	for(int i = 0;i<64;i++) {
		float d = map(pos);
		if(d<.01) {
			color = fract(pos*.5);
			break;
		}
		pos+= d * dir;
	}

	

	gl_FragColor = vec4(color,1.0);
}