import { Node } from "../data/tree-node";
import { nodeColors } from "../design/colors";
import { TreeStyle } from "../design/style";
import { drawRectangle } from "./elements/rect";
import { drawText, measureText } from "./elements/text";
import { ProjectedRenderingContext2D } from "./viewport/projected-context";

const NODE_LABEL_HEIGHT = 40;
const NODE_WIDTH_LARGE = 170;
const NODE_WIDTH_SMALL = 120;
const NODE_BORDER_RADIUS = 10;
const TYPE_LABEL_FONT_SIZE = 22;
const ATTRIBUTE_HEIGHT = 34;
const ATTRIBUTE_FONT_SIZE = 18;
const TEXT_HORIZONTAL_PADDING = 16;

/**
 * Draws a particular node and returns its height.
 */
export function drawNode(
  ctx: ProjectedRenderingContext2D,
  style: TreeStyle,
  x: number,
  y: number,
  node: Node
): number {
  const colors = nodeColors(style.colors, node);
  const [width, keysWidth, attributesWidth] = computeNodeWidth(
    ctx.rawContext,
    style,
    node
  );
  const height = computeNodeHeight(node);
  const attributes = node.attributes || [];
  if (attributes.length > 0) {
    drawRectangle(
      ctx,
      x,
      y,
      width,
      height,
      NODE_BORDER_RADIUS,
      colors.attributes.background
    );
  }
  drawRectangle(
    ctx,
    x,
    y,
    width,
    NODE_LABEL_HEIGHT,
    attributes.length === 0
      ? NODE_BORDER_RADIUS
      : [NODE_BORDER_RADIUS, NODE_BORDER_RADIUS, 0, 0],
    colors.title.background
  );
  drawText(
    ctx,
    x,
    y,
    width,
    NODE_LABEL_HEIGHT,
    style.fontFamily,
    TYPE_LABEL_FONT_SIZE,
    colors.title.text,
    node.label || node.type
  );
  let nextAttributeY = y + NODE_LABEL_HEIGHT;
  for (const { key, value } of attributes) {
    drawText(
      ctx,
      x,
      nextAttributeY,
      keysWidth,
      ATTRIBUTE_HEIGHT,
      style.fontFamily,
      ATTRIBUTE_FONT_SIZE,
      colors.attributes.key,
      key
    );
    drawText(
      ctx,
      x + keysWidth,
      nextAttributeY,
      attributesWidth,
      ATTRIBUTE_HEIGHT,
      style.fontFamily,
      ATTRIBUTE_FONT_SIZE,
      colors.attributes.value,
      value
    );
    nextAttributeY += ATTRIBUTE_HEIGHT;
  }
  return height;
}

export function computeNodeWidth(
  ctx: CanvasRenderingContext2D,
  style: TreeStyle,
  node: Node
): [nodeWidth: number, keysWidth: number, valuesWidth: number] {
  const label = node.label || node.type;
  const attributes = node.attributes || [];
  const labelMinWidth =
    measureText(ctx, style.fontFamily, TYPE_LABEL_FONT_SIZE, label) +
    TEXT_HORIZONTAL_PADDING * 2;
  const keysMinWidth =
    Math.max(
      0,
      ...attributes.map(({ key }) =>
        measureText(ctx, style.fontFamily, ATTRIBUTE_FONT_SIZE, key)
      )
    ) +
    TEXT_HORIZONTAL_PADDING * 2;
  const valuesMinWidth =
    Math.max(
      0,
      ...attributes.map(({ value }) =>
        measureText(ctx, style.fontFamily, ATTRIBUTE_FONT_SIZE, value)
      )
    ) +
    TEXT_HORIZONTAL_PADDING * 2;
  const attributesMinWidth = keysMinWidth + valuesMinWidth;
  const nodeWidth = Math.max(
    attributes.length > 0 ? NODE_WIDTH_LARGE : NODE_WIDTH_SMALL,
    labelMinWidth,
    attributesMinWidth
  );
  const extraAttributesWidth = nodeWidth - attributesMinWidth;
  const keysWidth = keysMinWidth + extraAttributesWidth / 2;
  const valuesWidth = valuesMinWidth + extraAttributesWidth / 2;
  return [nodeWidth, keysWidth, valuesWidth];
}

export function computeNodeHeight(node: Node) {
  const attributeCount = Object.values(node.attributes || {}).length;
  return NODE_LABEL_HEIGHT + ATTRIBUTE_HEIGHT * attributeCount;
}
