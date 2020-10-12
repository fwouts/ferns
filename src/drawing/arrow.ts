import { TreeStyle } from "../design/style";
import { drawCurvedPath } from "./elements/curved-path";
import { drawText } from "./elements/text";
import { ProjectedRenderingContext2D } from "./viewport/projected-context";

const ARROW_THICKNESS = 2;
const ARROW_TOP_HEIGHT = 100;
const ARROW_TOP_STRAIGHT = 30;
const ARROW_CURVE_RADIUS = 30;
const ARROW_LABEL_WIDTH = 100;
const ARROW_LABEL_HEIGHT = 30;
const ARROW_LABEL_STRAIGHT = 10;
const ARROW_BOTTOM_HEIGHT = 100;
const ARROW_LABEL_FONT_SIZE = 16;
const ARROW_HEAD_HEIGHT = 5;
const ARROW_HEAD_WIDTH = 10;
const ARROW_HEAD_THICKNESS = 3;
const ARROW_HEAD_OFFSET = 2;

export const CHILDREN_VERTICAL_SPACING =
  ARROW_TOP_HEIGHT + ARROW_LABEL_HEIGHT + ARROW_BOTTOM_HEIGHT;

export function drawArrow(
  ctx: ProjectedRenderingContext2D,
  style: TreeStyle,
  fromX: number,
  fromY: number,
  toX: number[],
  toY: number,
  label?: string
) {
  const centerX = toX[0] + (toX[toX.length - 1] - toX[0]) / 2;
  ctx.set({
    lineJoin: "bevel",
    strokeStyle: style.colors.arrow,
    lineWidth: ARROW_THICKNESS,
  });
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(fromX, fromY + ARROW_TOP_STRAIGHT);
  drawCurvedPath(
    ctx,
    fromX,
    fromY + ARROW_TOP_STRAIGHT,
    centerX,
    fromY + ARROW_TOP_HEIGHT,
    ARROW_CURVE_RADIUS
  );
  for (const x of toX) {
    ctx.moveTo(centerX, toY - ARROW_BOTTOM_HEIGHT);
    ctx.lineTo(centerX, toY - ARROW_BOTTOM_HEIGHT + ARROW_LABEL_STRAIGHT);
    drawCurvedPath(
      ctx,
      centerX,
      toY - ARROW_BOTTOM_HEIGHT + ARROW_LABEL_STRAIGHT,
      x,
      toY - ARROW_HEAD_OFFSET,
      ARROW_CURVE_RADIUS
    );
  }
  ctx.stroke();
  if (label) {
    drawText(
      ctx,
      centerX - ARROW_LABEL_WIDTH / 2,
      fromY + ARROW_TOP_HEIGHT,
      ARROW_LABEL_WIDTH,
      ARROW_LABEL_HEIGHT,
      style.fontFamily,
      ARROW_LABEL_FONT_SIZE,
      style.colors.arrowLabel,
      label
    );
  } else {
    ctx.moveTo(centerX, fromY + ARROW_TOP_HEIGHT);
    ctx.lineTo(centerX, fromY + ARROW_TOP_HEIGHT + ARROW_LABEL_HEIGHT);
    ctx.stroke();
  }
  ctx.set({
    lineWidth: ARROW_HEAD_THICKNESS,
  });
  ctx.beginPath();
  for (const x of toX) {
    ctx.moveTo(
      x - ARROW_HEAD_WIDTH,
      toY - ARROW_HEAD_HEIGHT - ARROW_HEAD_OFFSET
    );
    ctx.lineTo(x, toY - ARROW_HEAD_OFFSET);
    ctx.lineTo(
      x + ARROW_HEAD_WIDTH,
      toY - ARROW_HEAD_HEIGHT - ARROW_HEAD_OFFSET
    );
  }
  ctx.stroke();
}
