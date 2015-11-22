let coucou = 'yoyo'
import Webgl from './Webgl';
import raf from 'raf';


let webgl = new Webgl(window.innerWidth,window.innerHeight)


animate();

function animate () {
  raf(animate);
  webgl.draw();


}