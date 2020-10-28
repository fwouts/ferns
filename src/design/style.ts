import { merge, RecursivePartial } from "../types.ts/recursive-partial";
import { TreeColors } from "./colors";

export interface TreeStyle {
  colors: TreeColors;
  fontFamily: string;
}

const DEFAULT_COLORS: TreeColors = {
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

const DEFAULT_FONT = "Roboto";

export function withDefaults(style?: RecursivePartial<TreeStyle>) {
  return merge(
    {
      colors: DEFAULT_COLORS,
      fontFamily: DEFAULT_FONT,
    },
    style
  );
}
