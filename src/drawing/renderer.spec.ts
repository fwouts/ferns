import { createCanvas } from "canvas";
import { toMatchImageSnapshot } from "jest-image-snapshot";
import { Renderer } from "..";
import { TreeStyle } from "../design/style";

expect.extend({ toMatchImageSnapshot });

const MAX_WIDTH = 1600;

describe("Renderer", () => {
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

  it("renders another font", () => {
    const rendered = renderCanvas(
      `
    abc
    `,
      {
        fontFamily: "Times New Roman",
      }
    );
    expect(rendered).toMatchImageSnapshot();
  });

  it("renders custom colors", () => {
    const rendered = renderCanvas(
      `
    root
      key = value
      -- arrow -->
        custom
          key = value
    `,
      {
        colors: {
          background: "#f00",
          arrow: "#00f",
          arrowLabel: "#000",
          nodes: {
            custom: {
              title: {
                background: "#000",
                text: "#fff",
              },
              attributes: {
                background: "#000",
                key: "#fff",
                value: "#fff",
              },
            },
          },
          nodeFallback: {
            title: {
              background: "#f8a",
              text: "#000",
            },
            attributes: {
              background: "#f33",
              key: "#0f0",
              value: "#8f8",
            },
          },
        },
      }
    );
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

function renderCanvas(code: string, style?: Partial<TreeStyle>) {
  return Renderer.render(
    (width, height) => {
      const canvas = createCanvas(width, height);
      return {
        ctx: canvas.getContext("2d"),
        save: () => canvas.toBuffer(),
      };
    },
    {
      code,
      maxWidth: MAX_WIDTH,
      style,
    }
  );
}
