import { ProjectedRenderingContext2D } from "../viewport/projected-context";

const FONT = "Roboto";

export function drawText(
  ctx: ProjectedRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  fontSize: number,
  color: string,
  text: string
) {
  ctx.set({
    font: [fontSize, FONT],
    textAlign: "center",
    textBaseline: "middle",
    fillStyle: color,
  });
  ctx.fillText(text, x + width / 2, y + height / 2, width);
}

export function measureText(
  ctx: CanvasRenderingContext2D,
  fontSize: number,
  text: string
) {
  ctx.font = `${fontSize}px ${FONT}`;
  return ctx.measureText(text).width;
}
