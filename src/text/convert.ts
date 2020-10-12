import { Node, NodeAttribute, NodeGroup } from "../data/tree-node";
import { Group, grouped } from "./group";
import { lines } from "./lines";

export function convert(code: string): Node[] {
  return grouped(lines(code)).map(recordTreeNode);
}

const NODE_ROOT_REGEX = /(.*)\[(.*)\]/;
const ARROW_REGEX = /--((.*)--)?(>|&gt;)/;

function recordTreeNode(group: Group): Node {
  const match = NODE_ROOT_REGEX.exec(group.root);
  let node: Node;
  if (match) {
    const [, type, label] = match;
    node = {
      type,
      label,
    };
  } else {
    node = {
      type: group.root,
    };
  }
  const attributes = group.children
    .filter((child) => child.children.length === 0)
    .map(
      (subgroup): NodeAttribute => {
        const [key, value] = subgroup.root.split("=", 2);
        if (!key || !value) {
          throw new Error(
            `Attribute should be of form "a=b" but found "${subgroup.root}"`
          );
        }
        return {
          key: key.trim(),
          value: value.trim(),
        };
      }
    );
  if (attributes.length > 0) {
    node.attributes = attributes;
  }
  const children = group.children
    .filter((child) => child.children.length > 0)
    .map(
      (subgroup): NodeGroup => {
        const match = ARROW_REGEX.exec(subgroup.root);
        if (!match) {
          throw new Error(
            `Arrow should be of form "-->" or "--label-->" but found "${subgroup.root}"`
          );
        }
        const key = match[2] || "";
        return {
          label: key.trim(),
          nodes: subgroup.children.map(recordTreeNode),
        };
      }
    );
  if (children.length > 0) {
    node.children = children;
  }
  return node;
}
