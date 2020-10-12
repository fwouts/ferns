import { Group, grouped } from "./group";
import { lines } from "./lines";

describe("grouped", () => {
  it("works as expected", () => {
    expect(
      grouped(
        lines(`
    a
        b
            c
        d
        e
            f
              g
    `)
      )
    ).toEqual<Group[]>([
      new Group("a", [
        new Group("b", [new Group("c", [])]),
        new Group("d", []),
        new Group("e", [new Group("f", [new Group("g", [])])]),
      ]),
    ]);
  });
});
