import Webgl from './Webgl';
import raf from 'raf';


let webgl = new Webgl(window.innerWidth,window.innerHeight)
window.addEventListener('resize', resizeHandler);

animate();

function animate () {
  raf(animate);
  webgl.draw();
}

function resizeHandler() {
	webgl.resize(window.innerWidth,window.innerHeight);
}