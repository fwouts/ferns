import { TreeStyle, withDefaults } from "./design/style";
import { renderTreeElement, TreeRenderingOptions } from "./dom/dom-renderer";
import { computeIdealViewportDimensions } from "./dom/sizing";
import { render } from "./drawing/renderer";
import { Viewport } from "./drawing/viewport/viewport";
import { convert } from "./text/convert";
import { RecursivePartial } from "./types.ts/recursive-partial";

/**
 * DOM-related API. Only available in web browsers.
 */
export const DOM = {
  /**
   * Converts all DOM elements with the class name "fern-tree" to ferns using
   * their inner text as code.
   *
   * For example:
   * ```html
   * <pre class="fern-tree">
   * a
   *   -->
   *     b
   *     c
   * </pre>
   * ```
   *
   * will automatically become a canvas of the same size showing a fern with
   * three nodes.
   */
  makeFerns: (options?: TreeRenderingOptions) => {
    const trees = document.querySelectorAll(".fern-tree");
    for (const tree of trees) {
      renderTreeElement(tree, options);
    }
  },

  /**
   * Converts a single DOM element to a fern.
   *
   * By default, the inner text of the DOM element will be used to render it.
   * You may pass some explicit code in the options instead.
   */
  makeSingleFern: (
    element: Element,
    options?: TreeRenderingOptions & { code?: string }
  ) => {
    renderTreeElement(element, options);
  },
};

/**
 * Lower-level rendering API. Available on servers and browsers.
 */
export const Renderer = {
  /**
   * Renders a fern in the provided context.
   *
   * Example with the `canvas` package:
   * ```typescript
   * import { createCanvas } from "canvas";
   *
   * return Renderer.render(
   *   (width, height) => {
   *     const canvas = createCanvas(width, height);
   *     return {
   *       ctx: canvas.getContext("2d"),
   *       save: () => canvas.toBuffer(),  // PNG buffer
   *     };
   *   },
   *   {
   *     code: `
   *     a
   *       -->
   *         b
   *         c
   *     `,
   *     maxWidth: 600,
   *   }
   * );
   * ```
   *
   * Note: You can also generate SVG or PDF by passing a third `format`
   * parameter to `createCanvas`.
   *
   * @params createRenderingContext A function that creates a rendering context
   * of the requested width and height.
   * @params options Rendering options (code and maxWidth are required).
   */
  render: <T>(
    createRenderingContext: (
      width: number,
      height: number
    ) => {
      ctx: CanvasRenderingContext2D;
      save: () => T;
    },
    options: {
      code: string;
      maxWidth: number;
      maxHeight?: number;
      style?: RecursivePartial<TreeStyle>;
    }
  ) => {
    const trees = convert(options.code);
    const style = withDefaults(options.style);
    const [
      width,
      height,
      startX,
      startY,
      scale,
    ] = computeIdealViewportDimensions(
      createRenderingContext(0, 0).ctx,
      trees,
      {
        maxWidth: options.maxWidth,
        maxHeight: options.maxHeight,
        expandHorizontally: false,
        style,
      }
    );
    const { ctx, save } = createRenderingContext(width, height);
    const viewport = new Viewport(width, height, startX, startY, scale);
    render(ctx, width, height, style, viewport, trees);
    return save();
  },
};
