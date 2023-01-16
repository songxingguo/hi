// import * from './js/scroll.js';
import './valine.js'
// import './js/count.js'
import './seo.js'
import './../css/index.css';
import ThreeFactory from "./ThreeFactory";

const threeFactory = new ThreeFactory();
const { scene, camera, renderer } = threeFactory.init();
function render() {
  renderer.render(scene, camera);
  const mesh = scene.children[0]
  mesh.rotation.x += 0.0005;
  mesh.rotation.y += 0.001;
  // 渲染下一帧的时候调用render函数
  requestAnimationFrame(render);
}
render();