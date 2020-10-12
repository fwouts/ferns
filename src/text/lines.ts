/**
 * Takes a block of code and splits it into N lines each with an indentation
 * level.
 *
 * For example:
 * ```
 * a
 *   b
 *   c
 *    d
 * ```
 *
 * becomes:
 * ```
 * [
 *  [0, "a"],
 *  [2, "b"],
 *  [2, "c"],
 *  [3, "d"]
 * ]
 * ```
 */
export function lines(code: string): Line[] {
  return code
    .split("\n")
    .map((line) => line.trimRight())
    .filter(Boolean)
    .map(indentedLine);
}

export class Line {
  constructor(readonly indent: number, readonly content: string) {}
}

function indentedLine(line: string): Line {
  const [position, indent] = getFirstCharacterPosition(line);
  return new Line(indent, line.substr(position));
}

function getFirstCharacterPosition(
  line: string
): [position: number, indent: number] {
  let indent = 0;
  let i = 0;
  let c: string;
  while ((c = line.charAt(i))) {
    if (c === " ") {
      indent += 1;
    } else if (c === "\t") {
      indent += 2;
    } else {
      break;
    }
    i++;
  }
  return [i, indent];
}
