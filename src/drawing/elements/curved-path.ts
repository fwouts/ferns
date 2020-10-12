import { ProjectedRenderingContext2D } from "../viewport/projected-context";

export function drawCurvedPath(
  ctx: ProjectedRenderingContext2D,
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  radius: number
) {
  ctx.moveTo(fromX, fromY);
  const horizontalStartX =
    toX < fromX - radius * 2
      ? Math.max(fromX - radius, toX + radius)
      : toX > fromX + radius * 2
      ? Math.min(fromX + radius, toX - radius)
      : toX;
  const horizontalStopX =
    toX < fromX - radius * 2
      ? toX + radius
      : toX > fromX + radius * 2
      ? toX - radius
      : toX;
  if (horizontalStopX - horizontalStartX === 0) {
    ctx.bezierCurveTo(fromX, fromY + radius, toX, toY - radius, toX, toY);
  } else {
    ctx.quadraticCurveTo(
      fromX,
      fromY + radius,
      horizontalStartX,
      fromY + radius
    );
    ctx.lineTo(horizontalStopX, fromY + radius);
    ctx.quadraticCurveTo(toX, fromY + radius, toX, fromY + radius * 2);
    ctx.lineTo(toX, toY);
  }
}
