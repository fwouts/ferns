export class Viewport {
  constructor(
    readonly width: number,
    readonly height: number,
    readonly x: number,
    readonly y: number,
    readonly scale: number
  ) {}

  viewedX(x: number) {
    return (x - this.x) / this.scale;
  }

  viewedY(y: number) {
    return (y - this.y) / this.scale;
  }

  viewedDimension(d: number) {
    return d / this.scale;
  }
}
