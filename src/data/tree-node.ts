export interface Node {
  type: string;
  label?: string;
  attributes?: NodeAttribute[];
  children?: NodeGroup[];
}

export interface NodeAttribute {
  key: string;
  value: string;
}

export interface NodeGroup {
  label: string;
  nodes: Node[];
}
