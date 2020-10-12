import { renderTreeElement, TreeRenderingOptions } from "./dom/dom-renderer";

export function renderAllTrees(options?: TreeRenderingOptions) {
  const trees = document.querySelectorAll(".fern-tree");
  for (const tree of trees) {
    renderTreeElement(tree, options);
  }
}

export function renderSingleTree(
  element: Element,
  options?: TreeRenderingOptions
) {
  renderTreeElement(element, options);
}
