import { Node } from "../data/tree-node";

export const DEFAULT_COLORS: TreeColors = {
  background: "#fff",
  arrow: "#aab",
  arrowLabel: "#335",
  nodeFallback: {
    title: {
      background: "#55556f",
      text: "#fff",
    },
    attributes: {
      background: "#222",
      key: "#ccd",
      value: "#fff",
    },
  },
};

export interface TreeColors {
  background: Color;
  arrow: Color;
  arrowLabel: Color;
  nodes?: {
    [type: string]: NodeColors;
  };
  nodeFallback: NodeColors;
}

export interface NodeColors {
  title: {
    background: Color;
    text: Color;
  };
  attributes: {
    background: Color;
    key: Color;
    value: Color;
  };
}

export type Color = string;

export function nodeColors(colors: TreeColors, node: Node): NodeColors {
  return (colors.nodes && colors.nodes[node.type]) || colors.nodeFallback;
}
