# Agent Persona Social Layer

## Raw idea
- Каждый пользователь может создать свою `agent-personality`.
- Этот агент может общаться с агентами других пользователей.
- Пользователь может смотреть:
  - с кем его агент лучше всего "сходится"
  - как развиваются отношения между агентами
  - о чем они говорят
- Это создает новый social loop:
  - не только люди свайпают друг друга
  - их агенты тоже взаимодействуют между собой
- В этом есть одновременно:
  - геймификация
  - social discovery
  - AI-native twist, который отличает продукт от обычного dating/chat app

## Product framing

### Working title
- `Agent Dating Layer`
- `Agent Persona`
- `AI Social Twin`
- `Proxy Chemistry`

Recommended internal working title:
- `Agent Persona Social Layer`

## Core product fantasy
- Пользователь не просто заполняет профиль.
- Он создает свою "агентную личность": стиль, вайб, ценности, флирт/юмор, границы, интересы.
- Дальше агент пользователя может:
  - вступать в короткие авто-диалоги с другими агентами
  - проверять совместимость
  - создавать "chemistry summaries"
  - предлагать человеку, с кем реально стоит начать разговор

## Why this is interesting

### New value
- Убирает часть friction первого контакта.
- Дает пользователю entertainment layer еще до прямого общения.
- Создает более богатый discovery loop, чем свайп + чат.
- Делает AI не "помощником сбоку", а частью core product experience.

### Why it can stand out
- Это не просто AI assistant in chat.
- Это новая social mechanic:
  - `my agent meets your agent first`
  - `we compare chemistry`
  - `then humans decide what to do next`

## User-facing concept

### 1. Create your agent persona
- Пользователь задает:
  - tone of voice
  - humor style
  - values
  - flirting level
  - topics it likes / avoids
  - relationship intent
  - hard boundaries

### 2. Let agents meet
- Когда два пользователя потенциально пересекаются:
  - их агенты могут провести micro-conversation
  - например 3–8 сообщений each
- По итогам система строит:
  - `chemistry score`
  - `conversation vibe`
  - `red flags / green flags`
  - `topics they naturally clicked on`

### 3. Show relationship state
- Пользователь видит:
  - с какими агентами его агенту интереснее всего
  - где был awkward exchange
  - где возникла chemistry
  - где conversation stalled

### 4. Human handoff
- Если агентный диалог выглядит promising:
  - пользователю предлагается начать живой чат
  - либо отправить suggested opener

## Gameplay / social loops

### Loop A. Passive discovery
1. User configures agent
2. Agent meets other agents in background
3. User gets updates like:
   - "Your agent had strong chemistry with Mia's agent"
   - "Your agent and Noah's agent kept returning to travel and live music"
4. User chooses whether to open the match

### Loop B. Social curiosity
1. User opens an agent interaction
2. Reads transcript / summary
3. Reacts emotionally to the result
4. Tweaks own agent personality to improve future outcomes

### Loop C. Optimization / identity play
1. User experiments with different agent personality settings
2. Watches how compatibility changes
3. Feels ownership over "social twin" identity

## Important design decision

### This should not replace human connection
- The agent layer should be a `discovery catalyst`, not the end product.
- Human interaction remains the payoff.

Correct positioning:
- "Your agents break the ice."
- not:
- "AI dates for you forever."

## UX surfaces

### New screens / modules
1. `Agent Persona Builder`
   - create/edit agent identity
2. `Agent Encounters`
   - list of ongoing or completed agent-to-agent interactions
3. `Chemistry Detail`
   - transcript, vibe summary, compatibility dimensions
4. `Suggested Openers`
   - handoff into real chat

### Existing screens affected
- `profile`
  - add agent persona preview
- `feed`
  - show "agent chemistry available"
- `matches`
  - show strongest agent conversations first
- `chat`
  - optionally show AI-generated opener or pre-chat summary

## MVP definition

### MVP goal
- Validate that users enjoy creating an agent identity and viewing agent-to-agent chemistry summaries.

### MVP scope
1. Create agent persona
2. Run simulated agent conversations between matched users
3. Store transcript + summary + score
4. Show agent chemistry in match list and detail view
5. Offer one-click human handoff into chat

### Out of MVP
- Fully autonomous long-running agents
- Real-time multi-agent social graphs
- Open-world agent interaction
- Voice agents
- Deep memory across months unless clearly scoped

## Data model draft

### New entities
- `agent_persona`
  - user_id
  - display_name
  - voice_style
  - humor_style
  - flirting_level
  - intent
  - interests
  - avoids
  - boundaries
  - system_prompt / config payload

- `agent_encounter`
  - id
  - agent_a_id
  - agent_b_id
  - status
  - started_at
  - finished_at
  - chemistry_score
  - vibe_label
  - compatibility_summary

- `agent_message`
  - encounter_id
  - speaker_agent_id
  - content
  - turn_index
  - metadata

- `agent_handoff`
  - encounter_id
  - suggested_opener
  - human_chat_id
  - accepted_at

## System behavior draft

### Matching trigger
- Agent-to-agent conversation may start when:
  - users match
  - users are high-probability candidates in feed
  - user manually requests "let our agents talk"

Recommended MVP trigger:
- only after human match

Reason:
- lower cost
- fewer privacy issues
- clearer user expectation

## Safety and trust concerns

### Main risks
1. Privacy
   - Users may be uncomfortable if AI says too much or invents too much.
2. Misrepresentation
   - Agent might act unlike the real person.
3. Manipulation
   - Over-optimized personas could become deceptive.
4. Safety
   - Agent content needs moderation.
5. Cost
   - Agent-to-agent conversations can become expensive fast.

### Safety rules
- User must control whether agent interactions are enabled.
- Agent should be clearly framed as:
  - representation / assistant
  - not exact truth
- Summaries should distinguish:
  - explicit user-declared facts
  - inferred vibes
- Users need visibility and controls:
  - replay
  - delete
  - disable
  - regenerate

## Product constraints

### For MVP, keep it constrained
- Fixed turn count
- Fixed topic budget
- Short summaries
- No hidden autonomous behavior
- No endless background chatting

### Recommended first constraint set
- 6 total turns max
- 1 summary object
- 1 suggested opener
- only after match

## Technical implementation plan

## Phase 1. Concept validation

### Goal
- Validate product shape before building full backend architecture.

### Tasks
1. Add concept doc and UX flow notes.
2. Define persona schema.
3. Design 2–3 key screens in-app or in showcase.
4. Decide whether first version triggers:
   - after match
   - on-demand
   - in feed

## Phase 2. Frontend prototype with local/mock data

### Goal
- Make the idea tangible inside the existing app.

### Tasks
1. Add `Agent Persona Builder` page.
2. Add `Agent Encounters` page.
3. Add `Chemistry Detail` page.
4. Seed mock agent encounters and summaries.
5. Connect matches screen to this new layer.

### Deliverable
- Clickable product prototype with fake data but realistic flow.

## Phase 3. Backend schema and orchestration

### Goal
- Introduce backend support for storing personas and encounters.

### Tasks
1. Define REST/DB schema for:
   - personas
   - encounters
   - messages
   - handoffs
2. Add endpoints:
   - create/update persona
   - list encounters
   - get encounter detail
   - trigger agent conversation
3. Persist summaries and transcripts.

## Phase 4. LLM orchestration

### Goal
- Generate short, controlled agent-to-agent conversations.

### Tasks
1. Build prompt format for agent persona config.
2. Add deterministic conversation turn limit.
3. Add summary generation:
   - chemistry score
   - vibe label
   - shared topics
   - suggested opener
4. Add moderation and guardrails.

## Phase 5. Product integration

### Goal
- Make it feel native to the app instead of a side experiment.

### Tasks
1. Add chemistry entrypoints in `matches`.
2. Add agent preview in `profile`.
3. Add "our agents talked" handoff into `chat`.
4. Add notifications / badges for new agent encounters.

## Phase 6. Optimization and game design

### Goal
- Improve retention and reduce novelty drop.

### Tasks
1. Add persona tuning feedback.
2. Add richer compatibility dimensions.
3. Add replay, re-run, compare personas.
4. Measure conversion:
   - encounter viewed
   - human chat opened
   - reply sent

## Recommended MVP implementation order
1. Write concept and constraints
2. Build mock frontend prototype
3. Validate UI/UX internally
4. Add backend schema
5. Add limited LLM generation
6. Add human handoff into chat

## Recommendation

### Best first version
- `Agent-to-agent only after match`

Why:
- strongest signal
- easiest to explain
- cheapest to operate
- less creepy than background autonomous conversations in feed

## Open questions
1. Should users manually start agent conversation, or should it auto-run?
2. Should transcript be fully visible, or mostly summarized?
3. Should agent persona be serious/accurate, playful/exaggerated, or configurable?
4. Is this:
   - a dating-assistant feature
   - a core product mode
   - or an experimental premium layer?

## Recommended next step
- Build a frontend-only prototype first.
- Do not start with backend or autonomous orchestration.
- First validate whether this mechanic feels delightful, understandable, and not creepy.
