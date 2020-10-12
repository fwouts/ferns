import { createCanvas } from "canvas";
import { toMatchImageSnapshot } from "jest-image-snapshot";
import { Renderer } from "..";

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

function renderCanvas(code: string) {
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
    }
  );
}
