export function replaceContainer(container: Element, element: Element) {
  while (container.lastChild) {
    container.removeChild(container.lastChild);
  }
  container.appendChild(element);
}
