# Hola Design Tokens v1

## Status
- Direction approved
- Ready for implementation into CSS variables
- This is the first concrete token set for `light` and `dark`

## Design Summary
- Brand character: `playful`
- Palette intensity: `balanced romantic`
- Theme model: `light + dark`
- Primary accent: `coral / rose`
- Emotional accent: separate family for `like / match`
- Dark base: `charcoal + plum`
- Typography: `neutral app sans with expressive display moments`
- Surfaces: `rounded but crisp`
- Accent depth: `deeper`
- Light theme mood: `cleaner and more app-like`

## 1. Foundation Tokens

### Typography

#### Font families
- `font.family.base`: `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- `font.family.display`: `"Sora", "Avenir Next", "Inter", ui-sans-serif, system-ui, sans-serif`

#### Font sizes
- `font.size.12`: `0.75rem`
- `font.size.14`: `0.875rem`
- `font.size.16`: `1rem`
- `font.size.18`: `1.125rem`
- `font.size.20`: `1.25rem`
- `font.size.24`: `1.5rem`
- `font.size.32`: `2rem`
- `font.size.40`: `2.5rem`

#### Font weights
- `font.weight.regular`: `400`
- `font.weight.medium`: `500`
- `font.weight.semibold`: `600`
- `font.weight.bold`: `700`
- `font.weight.extrabold`: `800`

#### Line heights
- `line-height.tight`: `1.15`
- `line-height.base`: `1.5`
- `line-height.relaxed`: `1.65`

### Spacing
- `space.4`: `4px`
- `space.8`: `8px`
- `space.12`: `12px`
- `space.16`: `16px`
- `space.20`: `20px`
- `space.24`: `24px`
- `space.32`: `32px`
- `space.40`: `40px`

### Radius
- `radius.8`: `8px`
- `radius.12`: `12px`
- `radius.16`: `16px`
- `radius.20`: `20px`
- `radius.24`: `24px`
- `radius.full`: `999px`

### Elevation
- `shadow.none`: `none`
- `shadow.sm`: `0 8px 24px rgba(25, 16, 26, 0.08)`
- `shadow.md`: `0 18px 48px rgba(25, 16, 26, 0.16)`
- `shadow.focus`: `0 0 0 3px`

## 2. Theme Tokens

### Light Theme
- Mood target: `cleaner and more app-like`

#### Background and surfaces
- `color.bg.canvas`: `#fff7f6`
- `color.bg.canvas-muted`: `#fff1ef`
- `color.bg.surface`: `#ffffff`
- `color.bg.surface-alt`: `#fff6f4`
- `color.bg.elevated`: `#fffdfc`

#### Text
- `color.text.primary`: `#26181c`
- `color.text.secondary`: `#61474e`
- `color.text.tertiary`: `#8b6d75`

#### Borders
- `color.border.subtle`: `rgba(88, 54, 64, 0.12)`
- `color.border.strong`: `rgba(88, 54, 64, 0.22)`

#### Brand
- `color.brand.primary`: `#ef6f72`
- `color.brand.primary-hover`: `#e45f67`
- `color.brand.primary-active`: `#d8505d`
- `color.brand.primary-soft`: `rgba(239, 111, 114, 0.14)`
- `color.brand.on-primary`: `#ffffff`

#### Emotion
- `color.emotion.like`: `#c7356e`
- `color.emotion.like-hover`: `#b82b62`
- `color.emotion.match`: `#d13f7b`
- `color.emotion.match-soft`: `rgba(209, 63, 123, 0.14)`
- `color.emotion.on-match`: `#ffffff`

#### Feedback
- `color.feedback.success`: `#2f9a68`
- `color.feedback.warning`: `#b67b1d`
- `color.feedback.error`: `#c24853`
- `color.feedback.info`: `#6d6ee8`

#### Overlay
- `color.overlay.scrim`: `rgba(38, 24, 28, 0.44)`

### Dark Theme
- Mood target: `cinematic, intimate, but still product-clean`

#### Background and surfaces
- `color.bg.canvas`: `#161017`
- `color.bg.canvas-muted`: `#1b141c`
- `color.bg.surface`: `#221922`
- `color.bg.surface-alt`: `#2a1f2b`
- `color.bg.elevated`: `#312535`

#### Text
- `color.text.primary`: `#fff1f3`
- `color.text.secondary`: `#d7bcc5`
- `color.text.tertiary`: `#a98f97`

#### Borders
- `color.border.subtle`: `rgba(255, 230, 235, 0.08)`
- `color.border.strong`: `rgba(255, 230, 235, 0.16)`

#### Brand
- `color.brand.primary`: `#f26d79`
- `color.brand.primary-hover`: `#ff7d88`
- `color.brand.primary-active`: `#df5c69`
- `color.brand.primary-soft`: `rgba(242, 109, 121, 0.16)`
- `color.brand.on-primary`: `#2d1119`

#### Emotion
- `color.emotion.like`: `#e14186`
- `color.emotion.like-hover`: `#f05395`
- `color.emotion.match`: `#eb4b8f`
- `color.emotion.match-soft`: `rgba(235, 75, 143, 0.18)`
- `color.emotion.on-match`: `#2b0e1c`

#### Feedback
- `color.feedback.success`: `#58c58d`
- `color.feedback.warning`: `#e0ab4b`
- `color.feedback.error`: `#ff7a85`
- `color.feedback.info`: `#8c91ff`

#### Overlay
- `color.overlay.scrim`: `rgba(10, 7, 10, 0.58)`

## 3. Semantic Mappings For Components

### App shell
- `app.bg` -> `color.bg.canvas`
- `app.text` -> `color.text.primary`
- `app.panel` -> `color.bg.surface`
- `app.panel-alt` -> `color.bg.surface-alt`

### Primary button
- `button.primary.bg` -> `color.brand.primary`
- `button.primary.text` -> `color.brand.on-primary`
- `button.primary.border` -> `color.brand.primary`
- `button.primary.bg-hover` -> `color.brand.primary-hover`
- `button.primary.bg-active` -> `color.brand.primary-active`

### Secondary button
- `button.secondary.bg` -> `color.bg.surface-alt`
- `button.secondary.text` -> `color.text.primary`
- `button.secondary.border` -> `color.border.subtle`

### Emotional CTA
- `button.emotion.bg` -> `color.emotion.like`
- `button.emotion.text` -> `color.emotion.on-match`
- `button.emotion.border` -> `color.emotion.like`

### Inputs
- `input.bg` -> `color.bg.surface-alt`
- `input.text` -> `color.text.primary`
- `input.placeholder` -> `color.text.tertiary`
- `input.border` -> `color.border.subtle`
- `input.border-focus` -> `color.brand.primary`
- `input.ring-focus` -> `color.brand.primary-soft`

### Cards
- `card.bg` -> `color.bg.surface`
- `card.bg-alt` -> `color.bg.surface-alt`
- `card.border` -> `color.border.subtle`
- `card.shadow` -> `shadow.sm`

### Navigation
- `nav.bg` -> `color.bg.surface`
- `nav.border` -> `color.border.subtle`
- `nav.item.text` -> `color.text.secondary`
- `nav.item.active-text` -> `color.brand.primary`
- `nav.item.active-bg` -> `color.brand.primary-soft`

## 4. CSS Variable Proposal

### Shared aliases
- `--bg`
- `--bg-muted`
- `--panel`
- `--panel-2`
- `--panel-elevated`
- `--text`
- `--text-secondary`
- `--text-tertiary`
- `--border`
- `--border-strong`
- `--accent`
- `--accent-hover`
- `--accent-active`
- `--accent-soft`
- `--accent-contrast`
- `--emotion`
- `--emotion-hover`
- `--emotion-soft`
- `--emotion-contrast`
- `--success`
- `--warning`
- `--error`
- `--info`
- `--scrim`

## 5. Product Application Rules

### Where brand accent should dominate
- `landing hero`
- `auth primary actions`
- `active navigation states`
- `profile edit primary save actions`

### Where emotional accent should dominate
- `like`
- `match`
- `new connection`
- `romantic highlights`
- `celebratory empty / success moments`

### Where color should stay restrained
- `settings`
- `chat list`
- `input-heavy screens`
- `secondary controls`

## 6. Page-Level Guidance

### Feed
- Move from black/white/red editorial contrast to themed surfaces.
- Photo remains the hero, but info panel and action bar should use surface tokens.
- `Like` action uses emotional accent.
- `Pass` remains neutral secondary.

### Chats
- Use warm dark neutrals in dark mode, warm off-whites in light mode.
- Unread and active states should use brand accent softly, not raw blue.

### Settings
- Keep structure calm.
- Section labels may use brand accent softly, not saturated fills.

### Profile
- Should feel polished, warm, and flattering.
- Display moments can use `font.family.display` for name headings only.

## 7. Implementation Order
1. Replace current root CSS variables in `src/shared/styles/main.css`
2. Add `[data-theme="light"]` and `[data-theme="dark"]`
3. Remap shared `Button` and `Input` to the new semantic tokens
4. Unify page shell surfaces and borders
5. Redesign `feed`
6. Warm up `chat`, `matches`, `settings`, `profile`

## 8. Final Review Questions
Resolved:
- Accent family should be `deeper`, not softer or brighter.
- Light theme should feel `cleaner and more app-like`, not editorial-warm.

This token set is now ready for implementation into code.
