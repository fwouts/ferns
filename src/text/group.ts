import { Line } from "./lines";

/**
 * Takes a group of indented lines and groups them together based on their
 * indentation level.
 *
 * For example:
 * ```
 * a
 *   b
 *   c
 * d
 * ```
 *
 * becomes:
 * ```
 * [
 *  {
 *    root: "a",
 *    children: [
 *      { root: "b" },
 *      { root: "c" }
 *    ]
 *  },
 *  {
 *    root: "d",
 *    children: []
 *  }
 * ]
 * ```
 */
export function grouped(lines: Line[]): Group[] {
  if (lines.length === 0) {
    return [];
  }
  const { indent } = lines[0];
  const roots: number[] = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].indent === indent) {
      roots.push(i);
    }
  }
  return roots.map((root, i) => {
    const nextRoot = i < roots.length - 1 ? roots[i + 1] : undefined;
    return new Group(
      lines[root].content,
      grouped(lines.slice(root + 1, nextRoot))
    );
  });
}

export class Group {
  constructor(readonly root: string, readonly children: Group[]) {}
}
