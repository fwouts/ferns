import { TreeStyle, withDefaults } from "../design/style";
import { render } from "../drawing/renderer";
import { computeHeight } from "../drawing/tree";
import { Viewport } from "../drawing/viewport/viewport";
import { convert } from "../text/convert";
import { replaceContainer } from "./container";
import { enableDragging } from "./dragging";
import { showError } from "./error";
import { computeIdealViewportDimensions } from "./sizing";
import { enableZooming } from "./zooming";

export interface TreeRenderingOptions {
  minTreeWidth?: number;
  maxWidth?: number;
  maxHeight?: number;
  draggable?: boolean;
  zoomable?: boolean;
  devicePixelRatio?: number;
  style?: Partial<TreeStyle>;
}

export function renderTreeElement(
  container: Element,
  options: TreeRenderingOptions & { code?: string } = {}
) {
  const code = options.code || container.innerHTML;
  renderTreeAsync(container, code, options).catch((e) =>
    showError(container, e.message, code)
  );
}

async function renderTreeAsync(
  container: Element,
  code: string,
  options: TreeRenderingOptions
) {
  const trees = convert(code);
  const draggable = options.draggable ?? false;
  const zoomable = options.zoomable ?? false;
  const devicePixelRatio =
    options.devicePixelRatio || window.devicePixelRatio || 1;
  const style = withDefaults(options.style);
  const canvas = document.createElement("canvas");
  const ctx = get2DContext(canvas);
  const treeHeight = Math.max(0, ...trees.map(computeHeight));
  const [width, height, startX, startY, scale] = computeIdealViewportDimensions(
    ctx,
    trees,
    {
      minTreeWidth: options.minTreeWidth,
      maxWidth: options.maxWidth || container.getBoundingClientRect().width,
      maxHeight: options.maxHeight || treeHeight,
      expandHorizontally: true,
      style,
    }
  );
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.width = width * devicePixelRatio;
  canvas.height = height * devicePixelRatio;
  let currentViewport = new Viewport(
    width,
    height,
    startX,
    startY,
    scale / devicePixelRatio
  );
  replaceContainer(container, canvas);
  rerender(currentViewport);

  if (draggable) {
    enableDragging(canvas, () => currentViewport, rerender);
  }

  if (zoomable) {
    enableZooming(container, canvas, () => currentViewport, rerender);
  }

  function rerender(viewport: Viewport) {
    currentViewport = viewport;
    render(ctx, canvas.width, canvas.height, style, viewport, trees);
  }
}

function get2DContext(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error(`Your browser does not support canvas rendering!`);
  }
  return ctx;
}
