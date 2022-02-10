import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    Camera,
    Mesh,
    MeshBasicMaterial,
    BoxGeometry
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { WEBGL } from 'three/examples/jsm/WebGL.js';

interface RendererOptions {
    [x: string]: any;
}

const defaultRenderOptions: RendererOptions = {};

export class Renderer {
    public readonly container: HTMLElement;
    private renderer: WebGLRenderer;
    private options: RendererOptions;
    private camera: Camera;
    private scene: Scene;
    private cube: Mesh;

    public constructor(container: HTMLElement = document.body, options?: RendererOptions) {
        this.container = container;
        if (!WEBGL.isWebGLAvailable()) {
            this.container.appendChild(WEBGL.getWebGLErrorMessage());
        }

        let box = this.container.getBoundingClientRect();
        this.options = options || defaultRenderOptions;
        console.log(this.options);

        this.scene = new Scene();
        this.camera = new PerspectiveCamera(75, box.width / box.height, 0.1, 1000);
        this.renderer = new WebGLRenderer();
        this.renderer.setSize(box.width, box.height);
        this.drawCanvas();

        const geometry = new BoxGeometry();
        const material = new MeshBasicMaterial({ color: 0x00ff00 });
        this.cube = new Mesh(geometry, material);
        this.scene.add(this.cube);
        this.camera.position.z = 5;

        this.animateCanvas();
        container.appendChild(this.renderer.domElement);
        const controls = new OrbitControls(this.camera, this.renderer.domElement);
        window.addEventListener('resize', this.initCanvas.bind(this));
        console.log(controls);
    }

    private initCanvas() {
        let box = this.container.getBoundingClientRect();
        this.renderer.setSize(box.width, box.height);
        this.camera = new PerspectiveCamera(75, box.width / box.height, 0.1, 1000);
    }

    private drawCanvas() {}

    private animateCanvas() {
        requestAnimationFrame(this.animateCanvas.bind(this));
        this.renderer.render(this.scene, this.camera);
    }
}
