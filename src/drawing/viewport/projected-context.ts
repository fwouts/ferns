import { Viewport } from "./viewport";

export class ProjectedRenderingContext2D {
  constructor(
    private readonly ctx: CanvasRenderingContext2D,
    private readonly viewport: Viewport
  ) {}

  get rawContext() {
    return this.ctx;
  }

  set(options: {
    fillStyle?: CanvasRenderingContext2D["fillStyle"];
    font?: [size: number, family: string];
    lineJoin?: CanvasRenderingContext2D["lineJoin"];
    lineWidth?: CanvasRenderingContext2D["lineWidth"];
    strokeStyle?: CanvasRenderingContext2D["strokeStyle"];
    textAlign?: CanvasRenderingContext2D["textAlign"];
    textBaseline?: CanvasRenderingContext2D["textBaseline"];
  }) {
    if (options.fillStyle !== undefined) {
      this.ctx.fillStyle = options.fillStyle;
    }
    if (options.font !== undefined) {
      const [size, family] = options.font;
      this.ctx.font = `${this.viewport.viewedDimension(size)}px ${family}`;
    }
    if (options.lineJoin !== undefined) {
      this.ctx.lineJoin = options.lineJoin;
    }
    if (options.lineWidth !== undefined) {
      this.ctx.lineWidth = this.viewport.viewedDimension(options.lineWidth);
    }
    if (options.strokeStyle !== undefined) {
      this.ctx.strokeStyle = options.strokeStyle;
    }
    if (options.textAlign !== undefined) {
      this.ctx.textAlign = options.textAlign;
    }
    if (options.textBaseline !== undefined) {
      this.ctx.textBaseline = options.textBaseline;
    }
  }

  arc(
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    anticlockwise?: boolean
  ) {
    this.ctx.arc(
      this.viewport.viewedX(x),
      this.viewport.viewedY(y),
      this.viewport.viewedDimension(radius),
      startAngle,
      endAngle,
      anticlockwise
    );
  }

  beginPath() {
    this.ctx.beginPath();
  }

  bezierCurveTo(
    cp1x: number,
    cp1y: number,
    cp2x: number,
    cp2y: number,
    x: number,
    y: number
  ) {
    this.ctx.bezierCurveTo(
      this.viewport.viewedX(cp1x),
      this.viewport.viewedY(cp1y),
      this.viewport.viewedX(cp2x),
      this.viewport.viewedY(cp2y),
      this.viewport.viewedX(x),
      this.viewport.viewedY(y)
    );
  }

  fill() {
    this.ctx.fill();
  }

  fillText(text: string, x: number, y: number, maxWidth: number) {
    this.ctx.fillText(
      text,
      this.viewport.viewedX(x),
      this.viewport.viewedY(y),
      this.viewport.viewedDimension(maxWidth)
    );
  }

  moveTo(x: number, y: number) {
    this.ctx.moveTo(this.viewport.viewedX(x), this.viewport.viewedY(y));
  }

  lineTo(x: number, y: number) {
    this.ctx.lineTo(this.viewport.viewedX(x), this.viewport.viewedY(y));
  }

  quadraticCurveTo(cpx: number, cpy: number, x: number, y: number) {
    this.ctx.quadraticCurveTo(
      this.viewport.viewedX(cpx),
      this.viewport.viewedY(cpy),
      this.viewport.viewedX(x),
      this.viewport.viewedY(y)
    );
  }

  stroke() {
    this.ctx.stroke();
  }
}
