import { Node } from "../data/tree-node";

export type TreeColors = {
  background: Color;
  arrow: Color;
  arrowLabel: Color;
  nodes?: {
    [type: string]: NodeColors;
  };
  nodeFallback: NodeColors;
};

export type NodeColors = {
  title: {
    background: Color;
    text: Color;
  };
  attributes: {
    background: Color;
    key: Color;
    value: Color;
  };
};

export type Color = string;

export function nodeColors(colors: TreeColors, node: Node): NodeColors {
  return (colors.nodes && colors.nodes[node.type]) || colors.nodeFallback;
}
