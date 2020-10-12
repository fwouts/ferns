import { Node } from "../data/tree-node";
import { TreeStyle } from "../design/style";
import {
  computeHeight,
  computeWidth,
  HORIZONTAL_TREE_SPACING,
} from "../drawing/tree";

const INITIAL_SCALE = 0.95;

export function computeIdealViewportDimensions(
  ctx: CanvasRenderingContext2D,
  trees: Node[],
  options: {
    maxWidth: number;
    maxHeight?: number;
    expandHorizontally: boolean;
    style: TreeStyle;
  }
): [width: number, height: number, x: number, y: number, scale: number] {
  const treeHeight = Math.max(0, ...trees.map(computeHeight));
  let width = options.maxWidth;
  const treeWidth = trees.reduce(
    (acc, tree) =>
      acc + computeWidth(ctx, options.style, tree) + HORIZONTAL_TREE_SPACING,
    HORIZONTAL_TREE_SPACING
  );
  const idealHeight = (width / treeWidth) * treeHeight;
  const height = options.maxHeight
    ? Math.min(options.maxHeight, idealHeight)
    : idealHeight;
  const scale = treeHeight / height / INITIAL_SCALE;
  const minWidth = (height / treeHeight) * treeWidth;
  if (!options.expandHorizontally) {
    width = minWidth;
  }
  // Center everything nicely.
  const x = ((minWidth * INITIAL_SCALE - width) / 2) * scale;
  const y = (treeHeight * (1 - 1 / INITIAL_SCALE)) / 2;
  return [width, height, x, y, scale];
}
