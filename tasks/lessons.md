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
