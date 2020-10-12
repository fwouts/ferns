# Ferns

[![Screenshot](./screenshot.png)](https://codesandbox.io/s/competent-resonance-hoeeu?file=/index.html)

[Try editing the tree live on CodeSandbox](https://codesandbox.io/s/competent-resonance-hoeeu?file=/index.html)

## How to use

You'll need to add the `ferns` package with `yarn` or `npm`.

Create your trees with the special `"ferns-tree"` class name:

```html
<pre class="ferns-tree">
a
  -- arrow -->
    b
    c
    d
  -- other arrow -->
    d
    e
    f
</pre>
```

Finally, invoke `renderAllTrees()` in the browser.

Alternatively, you can invoke `renderSingleTree()` and pass your tree code directly:

```typescript
renderSingleTree(containerElement, {
  code: `
    a
      -- arrow -->
        b
        c
    `,
  zoomable: true,
  draggable: true,
});
```

## Dependencies

This package doesn't have any runtime dependencies, other than the Roboto font. Note that the font should be loaded before you render.

## Acknowledgements

This was inspired by the amazing [Mermaid](https://mermaid-js.github.io/mermaid/).
