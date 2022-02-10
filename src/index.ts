interface RendererOptions {
    [x: string]: any;
}

const defaultRenderOptions: RendererOptions = {};

export class Renderer {
    public readonly container: HTMLElement;
    private canvas: HTMLCanvasElement;
    private options: RendererOptions;

    public constructor(
        container: HTMLElement = document.body,
        options: RendererOptions = defaultRenderOptions
    ) {
        this.container = container;
        this.options = options;
        this.canvas = document.createElement('canvas');
        this.initCanvas();
        container.appendChild(this.canvas);
        window.addEventListener('resize', this.initCanvas.bind(this));
    }

    private initCanvas() {
        let box = this.container.getBoundingClientRect();
        this.canvas.setAttribute('width', String(box.width));
        this.canvas.setAttribute('height', String(box.height));
    }
}

let mRenderer = new Renderer();
