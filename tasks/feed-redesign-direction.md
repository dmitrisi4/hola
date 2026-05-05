# Feed Redesign Direction

## Status
- `Phase 9` direction is implemented in code and reflected in the local UI kit showcase.

## Core rules
- Feed is `photo-led`, not `form-led`.
- Support chrome should stay calm and structural.
- Emotional accent belongs to `like`, `match`, and momentum moments, not to every surface.
- Metadata should feel like lightweight context, not a dense profile sheet.

## Composition
- Top of screen: short narrative context plus lightweight progress cues.
- Mid screen: one clear discovery stage around the current profile.
- Bottom action area: neutral `pass`, emotional `like`, with enough separation for thumb reach.

## Surface behavior
- Use neutral warm panels for rails, counters, and support containers.
- Use softer nested surfaces for metadata blocks.
- Keep overlays cinematic and readable instead of high-contrast black slabs.

## Copy behavior
- Skip language should feel directional, not dismissive.
- Progress language should feel informative, not gamified.
- Attraction copy should stay restrained; avoid cheap dating-app hype.

## Canonical references
- `src/pages/feed/FeedPage.tsx`
- `src/features/feed/ui/ProfileCard.tsx`
- `src/modules/ui-kit/showcase/UIKitShowcasePage.tsx`
