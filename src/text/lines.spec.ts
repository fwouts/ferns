import { Line, lines } from "./lines";

describe("lines", () => {
  it("works as expected", () => {
    expect(
      lines(`
    a
        b
            c
\t\t\t\td
        e
            f
              g
    `)
    ).toEqual<Line[]>([
      new Line(4, "a"),
      new Line(8, "b"),
      new Line(12, "c"),
      new Line(8, "d"),
      new Line(8, "e"),
      new Line(12, "f"),
      new Line(14, "g"),
    ]);
  });
});
