import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import SplineLoader from "@splinetool/loader";

export default class ThreeFactory {
  constructor({ url = "" } = {}) {
    this.url = url;
    this.init();
  }

  init() {
    this.createSence();
    this.createCamera();
    this.createSpline();
    this.addEventListener();
    // this.createTextureBox();
    return { scene: this.scene, camera: this.camera, renderer: this.renderer };
  }

  // 创建场景
  createSence() {
    this.scene = new THREE.Scene();
  }

  // 创建相机
  createCamera() {
    const camera = new THREE.OrthographicCamera(
      window.innerWidth / -2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerHeight / -2,
      -50000,
      10000
    );
    camera.position.set(0, 0, 0);
    camera.quaternion.setFromEuler(new THREE.Euler(0, 0, 0));
    this.camera = camera;
  }

  // 创建渲染器
  createRender() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(300, 300);
    //设置设备像素比, 避免绘图模糊
    this.renderer.setPixelRatio(
      window.devicePixelRatio < 2 ? 2 : window.devicePixelRatio
    );
    if (this.renderer)
      this.renderer.setAnimationLoop(() => {
        this.animate();
      });
    // this.renderer.setClearColor(0xe7f2fa, 1); // 设置背景颜色
    const container = document.getElementById("three-container");
    container.appendChild(this.renderer.domElement);
    return this.renderer;
  }

  // 创造轨道控制器;
  createControls(domElement) {
    const controls = new OrbitControls(this.camera, domElement);
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.125;
    this.controls = controls;
  }

  createSpline() {
    // spline scene
    const loader = new SplineLoader();
    loader.load(
      "https://prod.spline.design/hbpS6tw0ixcQ4Dja/scene.splinecode",
      (splineScene) => {
        this.scene.add(splineScene);
      }
    );
  }

  // 纹理贴图网格模型
  async createTextureBox() {
    const geometry = new THREE.BoxGeometry(15, 15, 15);
    const materials = await this.loadMaterials();
    const container = document.getElementById("three-container");
    container.style.visibility = "visible";
    const mesh = new THREE.Mesh(geometry, materials); //纹理贴图网格模型对象
    this.scene.add(mesh); //网格模型添加到场景中
  }
  loadMaterial(url) {
    const loader = new THREE.TextureLoader();
    return new Promise((resolve) => {
      let material = null;
      const texture = loader.load(url, () => {
        resolve(material);
      });
      material = new THREE.MeshBasicMaterial({
        map: texture,
      });
    });
  }

  loadMaterials() {
    const url = require("./../assets/logo.png");
    const resumeUrl = require("./../assets/resume.songxingguo.com.png");
    const githubUrl = require("./../assets/github.com.songxingguo.png");
    const yuqueUrl = require("./../assets/www.yuque.com.songxingguo.png");
    const homeUrl = require("./../assets/www.songxingguo.com.png");
    const blogUrl = require("./../assets/blog.songxingguo.com.png");
    const textures = [blogUrl, resumeUrl, githubUrl, yuqueUrl, url, homeUrl];
    const texturePromise = textures.map((url) => {
      return this.loadMaterial(url);
    });
    return Promise.all(texturePromise);
  }

  animate() {
    const mesh = this.scene.children[0];
    if (mesh && this.voluntarily) {
      // mesh.rotation.x += 0.0005;
      mesh.rotation.y += 0.004;
    }
    this.renderer.render(this.scene, this.camera);
  }

  addEventListener() {
    const container = document.getElementById("three-container");
    container.addEventListener(
      "mousemove",
      () => {
        this.voluntarily = false;
      },
      false
    );
    container.addEventListener(
      "mouseleave",
      () => {
        this.voluntarily = true;
      },
      false
    );
    this.voluntarily = true; // 开启动画
  }
}
