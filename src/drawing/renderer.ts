import { Node } from "../data/tree-node";
import { TreeStyle } from "../design/style";
import { drawTree, HORIZONTAL_TREE_SPACING } from "./tree";
import { ProjectedRenderingContext2D } from "./viewport/projected-context";
import { Viewport } from "./viewport/viewport";

export function render(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  style: TreeStyle,
  viewport: Viewport,
  trees: Node[]
) {
  ctx.fillStyle = style.colors.background;
  ctx.fillRect(0, 0, width, height);
  const projectedContext = new ProjectedRenderingContext2D(ctx, viewport);
  let x = 0;
  for (const tree of trees) {
    x +=
      drawTree(projectedContext, style, x, 0, tree) + HORIZONTAL_TREE_SPACING;
  }
}
