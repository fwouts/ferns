import { ProjectedRenderingContext2D } from "../viewport/projected-context";

export function drawRectangle(
  ctx: ProjectedRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  cornerRadius: number | number[],
  color: string
) {
  if (typeof cornerRadius === "number") {
    cornerRadius = [cornerRadius, cornerRadius, cornerRadius, cornerRadius];
  }
  ctx.set({
    fillStyle: color,
  });
  ctx.beginPath();
  ctx.moveTo(x + cornerRadius[1], y);
  ctx.lineTo(x + width - cornerRadius[1], y);
  ctx.arc(
    x + width - cornerRadius[1],
    y + cornerRadius[1],
    cornerRadius[1],
    -Math.PI / 2,
    0
  );
  ctx.lineTo(x + width, y + height);
  ctx.arc(
    x + width - cornerRadius[2],
    y + height - cornerRadius[2],
    cornerRadius[2],
    0,
    Math.PI / 2
  );
  ctx.lineTo(x + cornerRadius[3], y + height);
  ctx.arc(
    x + cornerRadius[3],
    y + height - cornerRadius[3],
    cornerRadius[3],
    Math.PI / 2,
    Math.PI
  );
  ctx.lineTo(x, y + cornerRadius[0]);
  ctx.arc(
    x + cornerRadius[0],
    y + cornerRadius[0],
    cornerRadius[0],
    Math.PI,
    (Math.PI * 3) / 2
  );
  ctx.fill();
}
