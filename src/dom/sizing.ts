import { Node } from "../data/tree-node";
import {
  computeHeight,
  computeWidth,
  HORIZONTAL_TREE_SPACING,
} from "../drawing/tree";

const INITIAL_SCALE = 0.95;

export function computeIdealViewportDimensions(
  container: Element,
  ctx: CanvasRenderingContext2D,
  trees: Node[],
  maxWidth?: number,
  maxHeight?: number
): [width: number, height: number, x: number, y: number, scale: number] {
  const treeHeight = Math.max(0, ...trees.map(computeHeight));
  const width = maxWidth || container.getBoundingClientRect().width;
  maxHeight = maxHeight || treeHeight;
  const treeWidth = trees.reduce(
    (acc, tree) => acc + computeWidth(ctx, tree) + HORIZONTAL_TREE_SPACING,
    HORIZONTAL_TREE_SPACING
  );
  const idealHeight = (width / treeWidth) * treeHeight;
  let height = Math.min(maxHeight, idealHeight);
  const scale = treeHeight / height / INITIAL_SCALE;
  const minWidth = (height / treeHeight) * treeWidth;
  // Center everything nicely.
  const x = ((minWidth * INITIAL_SCALE - width) / 2) * scale;
  const y = (treeHeight * (1 - 1 / INITIAL_SCALE)) / 2;
  return [width, height, x, y, scale];
}
