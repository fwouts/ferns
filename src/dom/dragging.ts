import { Viewport } from "../drawing/viewport/viewport";

export function enableDragging(
  canvas: HTMLCanvasElement,
  getViewport: () => Viewport,
  updateViewport: (viewport: Viewport) => void
) {
  let mouseDown: { x: number; y: number } | null = null;

  canvas.addEventListener("mousedown", (e) => {
    e.preventDefault();
    mouseDown = {
      x: e.offsetX,
      y: e.offsetY,
    };
  });

  window.addEventListener("mouseup", () => {
    mouseDown = null;
  });

  window.addEventListener("mousemove", (e) => {
    e.preventDefault();
    if (mouseDown) {
      const viewport = getViewport();
      const shiftX =
        ((e.offsetX - mouseDown.x) * viewport.scale * canvas.width) /
        viewport.width;
      const shiftY =
        ((e.offsetY - mouseDown.y) * viewport.scale * canvas.height) /
        viewport.height;
      mouseDown = {
        x: e.offsetX,
        y: e.offsetY,
      };
      updateViewport(
        new Viewport(
          viewport.width,
          viewport.height,
          viewport.x - shiftX,
          viewport.y - shiftY,
          viewport.scale
        )
      );
    }
  });
}
