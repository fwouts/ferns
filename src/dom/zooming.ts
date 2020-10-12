import { Viewport } from "../drawing/viewport/viewport";

export function enableZooming(
  container: Element,
  canvas: HTMLCanvasElement,
  getViewport: () => Viewport,
  updateViewport: (viewport: Viewport) => void
) {
  let showingHelp = false;
  canvas.addEventListener("wheel", (e) => {
    if (!e.metaKey) {
      if (!showingHelp) {
        showingHelp = true;
        showZoomHelp(container, () => {
          showingHelp = false;
        });
      }
      return;
    }
    e.preventDefault();
    const viewport = getViewport();
    const deltaRange = 100;
    const viewportScaleRatio = 0.3;
    const viewportWidth = canvas.width * viewport.scale;
    const viewportHeight = canvas.height * viewport.scale;
    const delta =
      e.deltaY > deltaRange / 2
        ? deltaRange / 2
        : e.deltaY < -deltaRange / 2
        ? -deltaRange / 2
        : e.deltaY;
    const viewportSizeChange = (delta / deltaRange) * viewportScaleRatio;
    const xDistribution = e.offsetX / viewport.width;
    const yDistribution = e.offsetY / viewport.height;
    updateViewport(
      new Viewport(
        viewport.width,
        viewport.height,
        viewport.x - viewportSizeChange * viewportWidth * xDistribution,
        viewport.y - viewportSizeChange * viewportHeight * yDistribution,
        (1 + viewportSizeChange) * viewport.scale
      )
    );
  });
}

function showZoomHelp(container: Element, onClear: () => void) {
  const help = document.createElement("div");
  help.className = "fern-tree-help";
  help.innerText = "Press ⌘ while scrolling to zoom";
  const containerPosition = container.getBoundingClientRect();
  help.style.opacity = "0";
  help.style.width = containerPosition.width + "px";
  help.style.height = containerPosition.height + "px";
  container.prepend(help);
  const instantClearListener = (e: KeyboardEvent) => {
    if (e.metaKey) {
      clear();
    }
  };
  window.addEventListener("keydown", instantClearListener);
  setTimeout(() => {
    help.style.opacity = "1";
  }, 0);
  const delayClear = setTimeout(() => clear(), 2000);

  function clear() {
    clearTimeout(delayClear);
    window.removeEventListener("keydown", instantClearListener);
    container.removeChild(help);
    onClear();
  }
}
