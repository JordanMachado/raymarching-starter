import Webgl from './Webgl';
import raf from 'raf';


let webgl = new Webgl(window.innerWidth,window.innerHeight)

window.addEventListener('resize', resizeHandler);
window.addEventListener('mousemove', mouseMoveHandler);


animate();



function mouseMoveHandler(e){
	let x = (e.clientX/window.innerWidth - 0.5) * 2;
	let y = -(e.clientY/window.innerHeight - 0.5) * 2;
	webgl.mousemove(x,y);

}

function animate () {
  raf(animate);
  webgl.draw();
}

function resizeHandler() {
	webgl.resize(window.innerWidth,window.innerHeight);
}