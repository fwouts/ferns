import { replaceContainer } from "./container";

export function showError(container: Element, message: string, code: string) {
  const errorContainer = document.createElement("div");
  errorContainer.className = "fern-tree-error";
  const errorParagraph = document.createElement("p");
  errorParagraph.innerText = message;
  errorContainer.appendChild(errorParagraph);
  if (code) {
    const source = document.createElement("pre");
    source.innerText = code;
    errorContainer.appendChild(source);
  }
  replaceContainer(container, errorContainer);
}
