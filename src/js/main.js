// import * from './js/scroll.js';
import "./valine.js";
// import './js/count.js'
import "./seo.js";
import "./../css/index.css";
import ThreeFactory from "./ThreeFactory";

const container = document.getElementById("three-container");
container.addEventListener("mousemove", moveMouseToCanvas, false);
container.addEventListener("mouseleave", leaveToCanvas, false);
let voluntarily = true; // 开启动画
function moveMouseToCanvas() {
  console.log("moveMouseToCanvas", moveMouseToCanvas);
  voluntarily = false;
}
function leaveToCanvas() {
  voluntarily = true;
}

const threeFactory = new ThreeFactory();
const { scene, camera, renderer } = threeFactory.init();
function render() {
  renderer.render(scene, camera);
  const mesh = scene.children[0];
  if (voluntarily) {
    mesh.rotation.x += 0.0005;
    mesh.rotation.y += 0.001;
  }
  // 渲染下一帧的时候调用render函数
  requestAnimationFrame(render);
}
render();
