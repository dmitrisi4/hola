# Hola Design Direction

## Confirmed Decisions

### Brand character
- `playful`
- Приоритет не на строгий enterprise UI, а на живой, эмоциональный и привлекательный продукт.

### Theme strategy
- Сразу проектируем `light` и `dark`.
- Токены должны быть семантическими, чтобы темы переключались без переписывания компонентного слоя.

### Primary accent
- Основной брендовый акцент: `coral / rose`.

### Emotional accent
- Для `like`, `match` и эмоциональных моментов используем отдельный accent family.
- Это не должен быть тот же цвет, что у общего primary CTA.

### Visual priority
- Важнее всего `emotion and attraction`.
- Интерфейс должен быть теплым, живым и визуально притягательным, но не “кричащим”.

## Design Translation

### Что это означает для визуального языка
- Нужен более теплый и человеческий продуктовый тон.
- Базовые поверхности должны оставаться достаточно нейтральными, чтобы фотографии и контент не конфликтовали с UI.
- Основной брендовый цвет должен создавать узнаваемость и мягкую энергию.
- Отдельный emotional accent должен усиливать сценарии знакомства: `like`, `match`, `chemistry`, `new connection`.

### Чего избегаем
- Холодной tech-only эстетики.
- Случайных ярких цветов без ролевой логики.
- Агрессивного “dating app red everywhere”.
- Слишком сладкой или дешевой romantic стилистики.

## Proposed Token Strategy

### 1. Foundation color roles

#### Neutral roles
- `color.bg.canvas`
- `color.bg.canvas-muted`
- `color.bg.surface`
- `color.bg.surface-alt`
- `color.bg.elevated`
- `color.border.subtle`
- `color.border.strong`
- `color.text.primary`
- `color.text.secondary`
- `color.text.tertiary`

#### Brand roles
- `color.brand.primary`
- `color.brand.primary-hover`
- `color.brand.primary-active`
- `color.brand.primary-soft`
- `color.brand.on-primary`

#### Emotional roles
- `color.emotion.like`
- `color.emotion.like-hover`
- `color.emotion.match`
- `color.emotion.match-soft`
- `color.emotion.on-match`

#### Feedback roles
- `color.feedback.success`
- `color.feedback.warning`
- `color.feedback.error`
- `color.feedback.info`

### 2. Theme architecture

#### Light theme
- Светлая тема должна быть airy, warm, slightly editorial.
- Не чисто белая; лучше теплые off-white surfaces.
- Coral primary должен быть чище и чуть светлее, чем в dark theme.

#### Dark theme
- Темная тема должна быть cinematic и intimate.
- Не pure black; лучше deep plum / ink / charcoal neutrals.
- Emotional accent может быть чуть насыщеннее, чем в light theme.

### 3. Component behavior
- `primary button` использует brand accent.
- `like / match actions` используют emotional accent family.
- `secondary buttons` и `inputs` остаются более нейтральными.
- `navigation` и `settings` не должны быть слишком цветными; эмоциональные акценты применяются дозированно.

## Preliminary Palette Direction

### Neutral base
- Light: warm ivory / blush-tinted white / soft stone
- Dark: deep plum-charcoal / muted wine-black / ink violet

### Brand primary
- Coral-rose family, без ухода в кислотный pink.

### Emotional accent
- Более насыщенный berry / hibiscus / hot-rose family.
- Он должен быть заметно эмоциональнее primary, но совместим с ним.

## Current Product Mapping

### Best fit for this direction
- `landing`
- `auth`
- `matches`
- `profile`

### Needs redesign under the new system
- `feed`, because it currently uses a harsh black/white/red editorial contrast that does not align with the new playful romantic system.
- `settings`, because it is structurally solid but visually still too neutral and technical.
- `chat`, because it should feel warmer and more intimate without losing readability.

## Next Decisions To Make Together
1. Насколько смелой должна быть палитра:
   - `soft playful`
   - `balanced romantic`
   - `bold attraction`

2. Какой из двух подходов к dark theme нам ближе:
   - `charcoal + plum`
   - `ink + wine`

3. Типографический характер:
   - `clean rounded sans`
   - `modern geometric sans`
   - `neutral app sans with expressive display moments`

4. Должны ли карточки и поверхности быть:
   - `soft and rounded`
   - `rounded but crisp`
   - `sharp with only slight rounding`

## Recommended Starting Point
- Palette intensity: `balanced romantic`
- Dark base: `charcoal + plum`
- Typography: `neutral app sans with expressive display moments`
- Surfaces: `rounded but crisp`

Это даст дизайн, который ощущается привлекательным и живым, но не превращается в визуальный шум.
