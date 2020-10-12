import { Node } from "../data/tree-node";
import { convert } from "./convert";

describe("convert", () => {
  it("rejects empty tree", () => {
    expect(
      convert(`
    
    
    `)
    ).toEqual([]);
  });

  it("rejects multiple trees", () => {
    expect(
      convert(`
      a
      b
      c
    `)
    ).toEqual<Node[]>([
      {
        type: "a",
      },
      {
        type: "b",
      },
      {
        type: "c",
      },
    ]);
  });

  it("converts correct tree", () => {
    expect(
      convert(`
    root[Root]
      name = root node
      -- folders -->
        b
          name = child node
        c
          --nested-->
            d
        e[with a label]
        f
      `)
    ).toEqual<Node[]>([
      {
        type: "root",
        label: "Root",
        attributes: [
          {
            key: "name",
            value: "root node",
          },
        ],
        children: [
          {
            label: "folders",
            nodes: [
              {
                type: "b",
                attributes: [
                  {
                    key: "name",
                    value: "child node",
                  },
                ],
              },
              {
                type: "c",
                children: [
                  {
                    label: "nested",
                    nodes: [
                      {
                        type: "d",
                      },
                    ],
                  },
                ],
              },
              {
                type: "e",
                label: "with a label",
              },
              {
                type: "f",
              },
            ],
          },
        ],
      },
    ]);
  });
});
