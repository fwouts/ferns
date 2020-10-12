import { ProjectedRenderingContext2D } from "../viewport/projected-context";

export function drawText(
  ctx: ProjectedRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  fontFamily: string,
  fontSize: number,
  color: string,
  text: string
) {
  ctx.set({
    font: [fontSize, fontFamily],
    textAlign: "center",
    textBaseline: "middle",
    fillStyle: color,
  });
  ctx.fillText(text, x + width / 2, y + height / 2, width);
}

export function measureText(
  ctx: CanvasRenderingContext2D,
  fontFamily: string,
  fontSize: number,
  text: string
) {
  ctx.font = `${fontSize}px ${fontFamily}`;
  return ctx.measureText(text).width;
}
