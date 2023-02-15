import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class ThreeFactory {
  constructor({ url = "" } = {}) {
    this.url = url;
  }

  init() {
    this.createSence();
    this.createCamera();
    this.createRender();
    this.createTextureBox();
    return { scene: this.scene, camera: this.camera, renderer: this.renderer };
  }

  // 创建场景
  createSence() {
    this.scene = new THREE.Scene();
  }

  // 创建相机
  createCamera() {
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 500);
    camera.position.set(0, 0, 40);
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
    // this.renderer.setClearColor(0xe7f2fa, 1); // 设置背景颜色
    const container = document.getElementById("three-container");
    container.appendChild(this.renderer.domElement);
    this.createControls();
  }

  // 创造轨道控制器;
  createControls() {
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.enableZoom = false;
    this.controls = controls;
  }

  // 纹理贴图网格模型
  createTextureBox() {
    const geometry = new THREE.BoxGeometry(15, 15, 15);
    const loader = new THREE.TextureLoader();
    const texture = loader.load(require("./../assets/logo.png"), () => {
      const container = document.getElementById("three-container");
      container.style.visibility = "visible";
    });
    const material = new THREE.MeshBasicMaterial({
      map: texture,
    });
    const resumeTexture = loader.load(
      require("./../assets/resume.songxingguo.com.png"),
      () => {
        const container = document.getElementById("three-container");
        container.style.visibility = "visible";
      }
    );
    const resumeMaterial = new THREE.MeshBasicMaterial({
      map: resumeTexture,
    });
    const githubTexture = loader.load(
      require("./../assets/github.com:songxingguo.png"),
      () => {
        const container = document.getElementById("three-container");
        container.style.visibility = "visible";
      }
    );
    const githubMaterial = new THREE.MeshBasicMaterial({
      map: githubTexture,
    });
    const yuqueTexture = loader.load(
      require("./../assets/www.yuque.com:songxingguo.png"),
      () => {
        const container = document.getElementById("three-container");
        container.style.visibility = "visible";
      }
    );
    const yuqueMaterial = new THREE.MeshBasicMaterial({
      map: yuqueTexture,
    });
    const homeTexture = loader.load(
      require("./../assets/www.songxingguo.com.png"),
      () => {
        const container = document.getElementById("three-container");
        container.style.visibility = "visible";
      }
    );
    const homeMaterial = new THREE.MeshBasicMaterial({
      map: homeTexture,
    });
    const blogTexture = loader.load(
      require("./../assets/blog.songxingguo.com.png"),
      () => {
        const container = document.getElementById("three-container");
        container.style.visibility = "visible";
      }
    );
    const blogMaterial = new THREE.MeshBasicMaterial({
      map: blogTexture,
    });
    const mesh = new THREE.Mesh(geometry, [
      material,
      yuqueMaterial,
      githubMaterial,
      resumeMaterial,
      homeMaterial,
      blogMaterial,
    ]); //纹理贴图网格模型对象
    this.scene.add(mesh); //网格模型添加到场景中
  }
}
