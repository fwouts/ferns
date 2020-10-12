import { Node } from "../data/tree-node";
import { nodeColors, TreeColors } from "../design/colors";
import { CHILDREN_VERTICAL_SPACING, drawArrow } from "./arrow";
import { computeNodeHeight, computeNodeWidth, drawNode } from "./node";
import { ProjectedRenderingContext2D } from "./viewport/projected-context";

export const HORIZONTAL_NODE_SPACING = 10;
export const HORIZONTAL_TREE_SPACING = 80;

/**
 * Draws a tree and returns its width.
 */
export function drawTree(
  ctx: ProjectedRenderingContext2D,
  treeColors: TreeColors,
  x: number,
  y: number,
  tree: Node
): number {
  const colors = nodeColors(treeColors, tree);
  const allocatedWidth = computeWidth(ctx.rawContext, tree);
  const [nodeWidth] = computeNodeWidth(ctx.rawContext, tree);
  const nodeX = x + (allocatedWidth - nodeWidth) / 2;
  const height = drawNode(ctx, colors, nodeX, y, tree);
  let childrenY = y + height + CHILDREN_VERTICAL_SPACING;
  let nextChildX = x;
  for (const group of tree.children || []) {
    const childrenX: number[] = [];
    for (const child of group.nodes) {
      const childWidth = drawTree(
        ctx,
        treeColors,
        nextChildX,
        childrenY,
        child
      );
      childrenX.push(nextChildX + childWidth / 2);
      nextChildX += childWidth + HORIZONTAL_NODE_SPACING;
    }
    if (childrenX.length > 0) {
      drawArrow(
        ctx,
        treeColors,
        nodeX + nodeWidth / 2,
        y + height,
        childrenX,
        childrenY,
        group.label
      );
    }
  }
  return allocatedWidth;
}

export function computeWidth(
  ctx: CanvasRenderingContext2D,
  tree: Node
): number {
  const allChildren = (tree.children || []).map((group) => group.nodes).flat();
  const [nodeWidth] = computeNodeWidth(ctx, tree);
  return Math.max(
    nodeWidth,
    allChildren.reduce(
      (acc, child) => acc + computeWidth(ctx, child) + HORIZONTAL_NODE_SPACING,
      -HORIZONTAL_NODE_SPACING
    )
  );
}

export function computeHeight(tree: Node): number {
  const allChildren = (tree.children || []).map((group) => group.nodes).flat();
  return (
    computeNodeHeight(tree) +
    (allChildren.length > 0 ? CHILDREN_VERTICAL_SPACING : 0) +
    allChildren.reduce((acc, child) => Math.max(acc, computeHeight(child)), 0)
  );
}
