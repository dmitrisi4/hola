# Design System Research

## Цель
- Собрать основу для единой дизайн-системы `Hola`.
- Определить, какие токены нам нужны до того, как мы продолжим визуальную унификацию интерфейса.
- Свести бренд, UX и accessibility в один набор правил.

## Источники
- Apple HIG: Color
  - https://developer.apple.com/design/human-interface-guidelines/color
- Apple HIG: Typography
  - https://developer.apple.com/design/human-interface-guidelines/typography
- Apple HIG: Layout
  - https://developer.apple.com/design/human-interface-guidelines/layout
- Google / Android Developers: Material 3 color system
  - https://developer.android.com/design/ui/wear/guides/styles/color/system
- Google / Android Developers: Material color roles and tokens
  - https://developer.android.com/design/ui/wear/guides/styles/color/roles-tokens
- Google / Android Developers: Material 3 theming
  - https://developer.android.com/develop/ui/compose/designsystems/material3

## Ключевые принципы из Apple

### 1. Цвет должен быть семантическим, а не декоративным
- Один и тот же цвет не должен означать разные вещи.
- Цвет нельзя использовать как единственный носитель смысла.
- Основные состояния и интерактивность должны читаться и без цвета.

### 2. Нужны адаптивные роли, а не россыпь hex-значений
- Лучше мыслить ролями: background, surface, text-primary, text-secondary, separator, accent, destructive.
- Цвета должны работать в light/dark и при повышенном контрасте.
- Если вводим кастомные цвета, им нужны понятные состояния и пары контраста.

### 3. Типографика должна строить иерархию
- Лучше мало семейств и понятная шкала размеров/весов.
- Тонкие веса для маленького текста нежелательны.
- Иерархия должна держаться размером, насыщенностью и цветом, а не хаосом стилей.

### 4. Layout должен уважать safe areas и системные отступы
- Контент и control layers должны быть четко разделены.
- Scroll-контейнеры и sticky navigation не должны конфликтовать.
- Важный контент должен иметь достаточно воздуха.

## Ключевые принципы из Google / Material

### 1. Система строится из ролей цвета
- Primary: главный брендовый/акцентный цвет.
- Secondary: менее доминирующие акценты.
- Tertiary: контрастный дополнительный акцент.
- Neutral surfaces: фоновые и контейнерные слои.

### 2. Цвета должны работать парами
- `primary` <-> `on-primary`
- `surface` <-> `on-surface`
- `primary-container` <-> `on-primary-container`
- Нельзя брать произвольные сочетания, если мы хотим стабильный контраст.

### 3. Иерархия важнее “красивого цвета”
- Разные уровни surface и emphasis должны быть легко различимы.
- Состояния компонентов должны быть предсказуемыми: default, hover, focus, active, disabled.

### 4. Токены должны быть переносимыми
- Дизайн-система не должна зависеть от конкретной страницы.
- Токены должны жить на уровне foundation и затем маппиться на компоненты.

## Вывод по обоим источникам
- Нам не нужен набор “красивых цветов”.
- Нам нужен набор ролей + правил применения.
- Основа системы:
  - семантические color roles
  - типографическая шкала
  - spacing scale
  - radius scale
  - elevation/surface model
  - motion/focus states
  - component state tokens

## Предлагаемая структура токенов для Hola

### 1. Foundation tokens

#### Color
- `color.bg.app`
- `color.bg.surface`
- `color.bg.surface-alt`
- `color.bg.elevated`
- `color.text.primary`
- `color.text.secondary`
- `color.text.tertiary`
- `color.border.subtle`
- `color.border.strong`
- `color.accent.primary`
- `color.accent.primary-hover`
- `color.accent.primary-active`
- `color.accent.secondary`
- `color.feedback.success`
- `color.feedback.warning`
- `color.feedback.error`
- `color.overlay.scrim`

#### Typography
- `font.family.base`
- `font.family.display`
- `font.size.12`
- `font.size.14`
- `font.size.16`
- `font.size.18`
- `font.size.20`
- `font.size.24`
- `font.size.32`
- `font.weight.regular`
- `font.weight.medium`
- `font.weight.semibold`
- `font.weight.bold`
- `line-height.tight`
- `line-height.base`
- `line-height.relaxed`

#### Spacing
- `space.4`
- `space.8`
- `space.12`
- `space.16`
- `space.20`
- `space.24`
- `space.32`
- `space.40`

#### Radius
- `radius.8`
- `radius.12`
- `radius.16`
- `radius.20`
- `radius.full`

#### Elevation
- `shadow.none`
- `shadow.sm`
- `shadow.md`
- `shadow.focus-ring`

### 2. Semantic / component tokens

#### Buttons
- `button.primary.bg`
- `button.primary.text`
- `button.primary.border`
- `button.secondary.bg`
- `button.secondary.text`
- `button.ghost.text`
- `button.destructive.bg`

#### Inputs
- `input.bg`
- `input.border`
- `input.border.focus`
- `input.text`
- `input.placeholder`

#### Cards / surfaces
- `card.bg`
- `card.border`
- `card.radius`
- `card.padding`

#### Navigation
- `nav.bg`
- `nav.border`
- `nav.item.text`
- `nav.item.active-bg`
- `nav.item.active-text`

## Что это значит для Hola

### Уже видно в текущем проекте
- Есть базовая dark foundation:
  - `--bg`
  - `--panel`
  - `--panel-2`
  - `--text`
  - `--muted`
  - `--border`
  - `--accent`
- Но система пока неполная:
  - нет явной типографической шкалы
  - нет formal token naming
  - не описаны component states
  - часть экранов пишет raw colors вместо ролей
  - `feed` выбивается из общей визуальной системы

### Что нужно решить до следующего большого дизайн-прохода
1. Хотим ли мы оставаться в dark-first продукте?
2. Нужен ли второй theme mode: light или пока только dark?
3. Должен ли акцент оставаться mint/green, или мы хотим другой брендовый hue?
4. Нужен ли отдельный romantic/warm accent для match actions, или вся система должна быть в одном primary accent?
5. Насколько “премиум” vs “friendly” vs “editorial” должен быть характер интерфейса?

## Практическая рекомендация

### Для следующего шага
1. Сначала выбрать brand direction:
   - холодный / технологичный
   - теплый / эмоциональный
   - нейтральный / premium
2. Затем зафиксировать:
   - 1 primary accent
   - 1 optional secondary accent
   - 3 surface levels
   - 3 text levels
   - 1 destructive color
3. После этого:
   - выписать токены в CSS variables
   - перевести page styles на эти токены
   - унифицировать `feed` под ту же систему

## Предварительное предложение для Hola

### Вариант A: Calm Premium
- Background: глубокий graphite / night blue
- Primary accent: soft mint
- Secondary accent: muted sky / steel
- Destructive: restrained red
- Характер: зрелый, спокойный, дорогой

### Вариант B: Warm Matchmaking
- Background: глубокий aubergine / charcoal
- Primary accent: coral / rose
- Secondary accent: warm sand / champagne
- Destructive: berry red
- Характер: эмоциональный, closer to dating brand

### Вариант C: Modern Minimal
- Background: neutral black / slate
- Primary accent: electric lime or cyan
- Secondary accent: silver gray
- Характер: продуктовый, tech-first

## Вопросы для совместной сборки системы
1. Какой характер нужен `Hola`: premium, playful, romantic, neutral-tech, editorial?
2. Dark-first оставляем или сразу проектируем и light theme тоже?
3. Какой главный акцент тебе ближе:
   - mint / green
   - coral / rose
   - blue / cyan
   - другой
4. Хотим ли мы, чтобы `match/like` цвет отличался от общего primary accent, или все CTA должны быть одного семейства?
5. Что важнее для продукта визуально:
   - доверие и спокойствие
   - эмоция и attraction
   - технологичность и чистота
