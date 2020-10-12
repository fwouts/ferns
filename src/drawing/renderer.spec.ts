import { createCanvas } from "canvas";
import { toMatchImageSnapshot } from "jest-image-snapshot";
import { DEFAULT_COLORS } from "../design/colors";
import { convert } from "../text/convert";
import { render } from "./renderer";
import { computeHeight, computeWidth, HORIZONTAL_TREE_SPACING } from "./tree";
import { Viewport } from "./viewport/viewport";

expect.extend({ toMatchImageSnapshot });

const RENDER_WIDTH = 1600;

describe("renderer", () => {
  it("renders a single node", () => {
    const rendered = renderCanvas(`
    a
    `);
    expect(rendered).toMatchImageSnapshot();
  });

  it("renders multiple roots", () => {
    const rendered = renderCanvas(`
    a
    b
    c
    `);
    expect(rendered).toMatchImageSnapshot();
  });

  it("renders two children", () => {
    const rendered = renderCanvas(`
    number literal
      --a-->
        -123
      --b-->
        -1
    `);
    expect(rendered).toMatchImageSnapshot();
  });

  it("renders many children", () => {
    const rendered = renderCanvas(`
    dynamic string
      --parts-->
        'Hello, my name is'
        name
        ' and I am '
        age
        ' years old.'
    `);
    expect(rendered).toMatchImageSnapshot();
  });

  it("renders long labels", () => {
    const rendered = renderCanvas(`
    this is a fairly long label, let's see how it renders!
    `);
    expect(rendered).toMatchImageSnapshot();
  });

  it("renders long attributes", () => {
    const rendered = renderCanvas(`
    string
      text = This is a pretty long attribute, let's see how it renders!
    `);
    expect(rendered).toMatchImageSnapshot();
  });

  it("does something", () => {
    const rendered = renderCanvas(`
    a
      name = root
      --entities-->
        a
        b
        c
      --folders-->
        b
          --files-->
            file 1
            file 2
            file 3
        c
    `);
    expect(rendered).toMatchImageSnapshot();
  });
});

function renderCanvas(code: string): Buffer {
  const emptyCanvas = createCanvas(0, 0);
  const trees = convert(code);
  const width = trees.reduce(
    (acc, tree) =>
      acc +
      computeWidth(emptyCanvas.getContext("2d"), tree) +
      HORIZONTAL_TREE_SPACING,
    HORIZONTAL_TREE_SPACING
  );
  const height = Math.max(0, ...trees.map(computeHeight));
  const renderHeight = (RENDER_WIDTH / width) * height;
  const canvas = createCanvas(RENDER_WIDTH, renderHeight);
  const viewport = new Viewport(
    RENDER_WIDTH,
    renderHeight,
    0,
    0,
    width / RENDER_WIDTH
  );
  const ctx = canvas.getContext("2d");
  render(ctx, DEFAULT_COLORS, viewport, trees);
  return canvas.toBuffer();
}
