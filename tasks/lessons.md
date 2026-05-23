# Self-Improvement Lessons Log

This file tracks layout, design, and coding patterns discovered during pairs development to prevent recurring mistakes.

## 1. Responsive Scroll Layouts & Sticky Footers

- **Problem**: Nesting a scroll container (`height: 100vh; overflow-y: auto;`) inside a centered `max-width` flexbox container can cause browser layout engines to glitch, showing black screen blocks or miscalculating viewport boundaries upon rendering large components.
- **Root Cause**: Centered desktop elements with automatic margins (`margin: 0 auto; max-width: 1200px`) inside flex rows do not share space correctly when scroll bars are forced inside the centered element rather than at the window level.
- **Elegant Solution**:
  1. Use **standard window-level scrollbars** for desktop views by setting `.main` to `min-height: 100vh; display: flex; flex-direction: column;` instead of `height: 100vh; overflow-y: auto;`.
  2. Implement sidebars with `position: sticky; top: 0; height: 100vh; flex-shrink: 0;` so they remain fixed while the window scrolls naturally.
  3. Ensure the footer is kept at the bottom of short pages by wrapping page children in a container with `flex: 1;` inside a column flexbox.
  4. Configure independent scrolling on both the desktop sidebar (`overflow-y: auto; height: 100vh; position: sticky;`) and the mobile drawer (`overflow-y: auto; height: 100vh;`) to ensure that expansive navigations containing many accordion sub-items remain fully scrollable and completely interactive under all screen height constraints.

## 2. JSX Angle Brackets Escaping

- **Problem**: Unescaped raw `<` and `>` characters inside JSX paragraph or description texts are parsed as unclosed XML tags, causing compilation crashes in Turbopack.
- **Solution**: Always represent raw HTML symbol signs as literal string curly braces `{"<"}` and `{">"}` or standard entity references to prevent compilation issues.

## 3. Flexbox Nested Scrolling & Height Shrinking

- **Problem**: When a scrollable flex item (e.g. `overflow-y: auto; flex: 1;`) is inside a parent flexbox container with a restricted height (e.g. `max-height` or standard layout limits), opening/expanding options inside the scroll container causes the element to expand indefinitely rather than scrolling. This pushes other elements (like bottom action button cards) out of parent bounds, rendering them half or fully hidden.
- **Root Cause**: By default, flex items have `min-height: auto` (which resolves to `min-content`). Under CSS flexbox rules, this prevents the flex item from shrinking below the height of its children, which bypasses `flex: 1` compression and overflows the parent container.
- **Elegant Solution**: Always specify `min-height: 0` (or `min-width: 0` for horizontal flex) on the scrollable flex items (e.g. `.controlsScrollArea`, `.thumbnailScrollArea`) inside flexbox containers under scrolling breakpoints. This forces the browser to shrink the flex item to fit the remaining space and correctly triggers the `overflow-y: auto` scrollbar rather than pushing other flex children out of viewport bounds.

