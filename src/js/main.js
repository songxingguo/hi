// import * from './js/scroll.js';
import "./valine.js";
// import './js/count.js'
import "./seo.js";
import "./../css/index.css";
import ThreeFactory from "./ThreeFactory";

const threeFactory = new ThreeFactory();
const renderer = threeFactory.createRender();
threeFactory.createControls(renderer.domElement);
