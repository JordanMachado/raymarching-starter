let start_time = Date.now();
const glslify =require('glslify');

export default class Webgl {
	constructor(width,height) {

		this.canvas = document.createElement('canvas');
		this.canvas.width = width;
		this.canvas.height = height;
		document.body.appendChild(this.canvas);


		this.GL = this.canvas.getContext('experimental-webgl');
		this.GL.viewport(0, 0, this.canvas.width, this.canvas.height);
		this.GL.clearColor(1,0,1,1);


		this.createShaders();
		this.createProgram();
		this.createBuffer();
		this.createAttributes();
		this.createUniforms();

	}
	createShaders() {

		//vertex shader
		this.vertexShader = this.GL.createShader(this.GL.VERTEX_SHADER);
		this.GL.shaderSource(this.vertexShader,glslify('./shaders/main.vert'));
		this.GL.compileShader(this.vertexShader);


		//fragment shader
		this.fragmentShader = this.GL.createShader(this.GL.FRAGMENT_SHADER);
		this.GL.shaderSource(this.fragmentShader,glslify('./shaders/main.frag'));
		this.GL.compileShader(this.fragmentShader);
	}
	createProgram () {

		
		

		this.program = this.GL.createProgram();
		this.GL.attachShader(this.program,this.vertexShader);
		this.GL.attachShader(this.program,this.fragmentShader);

		this.GL.linkProgram(this.program);
	}
	createBuffer() {
		//quad in full screen
		this.vertices = new Float32Array([
			-1,1,
			1,1,
			-1,-1,
			1,-1
		]);
		this.buffer = this.GL.createBuffer();
		this.GL.bindBuffer(this.GL.ARRAY_BUFFER,this.buffer);
		this.GL.bufferData(this.GL.ARRAY_BUFFER,this.vertices,this.GL.STATIC_DRAW);
		this.GL.useProgram(this.program);

	}
	// add here attributes
	createAttributes() {
		this.attributes = {};
		this.attributes.position = this.GL.getAttribLocation(this.program,'position');
		this.GL.enableVertexAttribArray(this.attributes.position);
		this.GL.vertexAttribPointer(this.attributes.position,2,this.GL.FLOAT,false,0,0);

	}
	// add here uniforms
	createUniforms() {
		this.uniforms = {};
		this.program.time = this.GL.getUniformLocation(this.program,'time');
		this.uniforms.time = 0;
		this.GL.uniform1f(this.program.time,this.uniforms.time)

		this.program.resolution = this.GL.getUniformLocation(this.program,'resolution');
		this.uniforms.resolution = {x:window.innerWidth,y:window.innerHeight};
		this.GL.uniform2f(this.program.resolution,this.uniforms.resolution.x,this.uniforms.resolution.y);
	}

	draw() {
		// update time
		this.uniforms.time  =   0.0025*(Date.now() - start_time);
		this.GL.uniform1f(this.program.time,this.uniforms.time);

		this.GL.clear(this.GL.COLOR_BUFFER_BIT);
		this.GL.drawArrays(this.GL.TRIANGLE_STRIP,0,this.vertices.length/2);

	}
	resize(width,height) {
		// resize canvas
		this.canvas.width = width;
		this.canvas.height = height;
		this.uniforms.resolution = {x:width,y:height};

		// update viewport
		this.GL.viewport(0, 0, this.canvas.width, this.canvas.height);

		// update resolution
		this.GL.uniform2f(this.program.resolution,this.uniforms.resolution.x,this.uniforms.resolution.y);
		


	}
}