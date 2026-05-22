# Task Checklist: Design Refinement & Landing Dashboard

## Design & Typography Setup
- [x] Import `Plus Jakarta Sans` and set it as `--font-sans` in `globals.css`
- [x] Create soft, high-end multi-dimensional dropshadow tokens (`--shadow-premium`, `--shadow-soft`)
- [x] Implement borders and custom shadow elevations across general layouts

## Premium Home / Landing Page
- [x] Add `"home"` layout state inside `src/app/page.tsx`
- [x] Build Home Hero card ("Essential tools, meticulously crafted")
- [x] Implement visual selection cards grid with smooth scale-lifts on hovers
- [x] Add offline/private trust parameters with beautiful badge states

## Refactor Subcomponents (Remove AI Look & Feel)
- [x] Refactor **Password Generator** (Remove card titles, simplify parameters card layout)
- [x] Refactor **QR Code Generator** (Clean container bounds, design checkerboard canvas preview)
- [x] Refactor **UUID Generator** (Consolidate output layouts, clean descriptive elements)
- [x] Refactor **Hash Generator** (Enhance comparison verification block, remove repetitive labels)
- [x] Refactor **Random Picker** (Sleek raffle presentation, clear histories)
- [x] Refactor **Random Number Generator** (Grid designs, simple sorting options)

## Final Validation
- [x] Verify static compiles successfully with `npm run build`
- [x] Generate walkthrough.md updates
