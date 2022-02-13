import {
    Scene,
    PerspectiveCamera,
    WebGLRenderer,
    Mesh,
    MeshBasicMaterial,
    BoxGeometry
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { WEBGL } from 'three/examples/jsm/WebGL.js';

interface RendererOptions {
    [x: string]: any;
}

const defaultRenderOptions: RendererOptions = {
    name: 'coley48',
    age: 24
};

export class Renderer {
    public readonly container: HTMLElement;
    private renderer: WebGLRenderer;
    private options: RendererOptions;
    private camera: PerspectiveCamera;
    private scene: Scene;
    private cube: Mesh;

    public constructor(container: HTMLElement = document.body, options?: RendererOptions) {
        this.container = container;
        if (!WEBGL.isWebGLAvailable()) {
            this.container.appendChild(WEBGL.getWebGLErrorMessage());
            // return;
        }

        let box = this.container.getBoundingClientRect();
        this.options = { ...defaultRenderOptions, ...options };
        console.log('options', this.options);

        this.scene = new Scene();
        this.camera = new PerspectiveCamera(75, box.width / box.height, 0.1, 1000);
        this.renderer = new WebGLRenderer({
            antialias: true
        });
        this.renderer.setSize(box.width, box.height);

        this.cube = this.drawCanvas();
        this.camera.position.z = 5;
        this.scene.add(this.cube);

        this.animateCanvas();
        container.appendChild(this.renderer.domElement);
        const controls = new OrbitControls(this.camera, this.renderer.domElement);
        window.addEventListener('resize', this.initCanvas.bind(this));
        console.log(controls);
    }

    private initCanvas(): void {
        let box = this.container.getBoundingClientRect();
        this.renderer.setSize(box.width, box.height);
        this.camera.aspect = box.width / box.height;
        this.camera.updateProjectionMatrix();
    }

    private drawCanvas(): Mesh {
        const geometry = new BoxGeometry();
        const material = new MeshBasicMaterial({ color: 0x00ff00 });
        return new Mesh(geometry, material);
    }

    private animateCanvas(): void {
        requestAnimationFrame(this.animateCanvas.bind(this));
        this.renderer.render(this.scene, this.camera);
    }
}
