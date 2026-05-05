# Agent Pre-Chat Roadmap

## Purpose
- Expand the existing `Agent Persona` MVP into a deeper pre-chat product layer.
- Keep the feature AI-native and socially interesting without letting it replace human interaction.
- Turn the current frontend prototype into a staged roadmap with clear product and engineering checkpoints.

## Product thesis
- People do not just want better first messages.
- They want lower friction, stronger curiosity, and a more legible sense of chemistry before investing in a real conversation.
- The agent layer should become:
  - a `chemistry preview`
  - a `social game loop`
  - a `handoff engine` into human chat

## Current baseline
- Implemented today:
  - `Agent Persona Builder`
  - `Agent Encounters` list
  - `Chemistry Detail`
  - `Suggested human handoff`
  - entrypoints from `profile` and `matches`
- Missing today:
  - encounter lifecycle and history
  - relationship/progress states
  - rerun/controls
  - backend persistence
  - real orchestration
  - trust controls and measurement

## Feature roadmap

### Layer 1. Better encounter visibility
- Goal:
  - make encounters feel like a living system, not isolated static cards
- Features:
  1. encounter status:
     - `new`
     - `active`
     - `completed`
     - `stalled`
  2. encounter freshness:
     - last run timestamp
     - run count
  3. relationship progression:
     - `first contact`
     - `repeat spark`
     - `warming up`
     - `not landing`
  4. stronger list filters:
     - by vibe
     - by score
     - by status
  5. better detail view:
     - stronger summary blocks
     - conversation stages
     - why the match did or did not work

### Layer 2. User control and replay
- Goal:
  - give the user agency over agent interactions
- Features:
  1. rerun encounter
  2. compare last run vs previous run
  3. disable auto-run after match globally
  4. per-encounter controls:
     - rerun
     - archive
     - hide transcript
     - delete result
  5. persona tuning loop:
     - "your agent is too careful"
     - "this topic repeatedly works"
     - "your current tone performs best with X"

### Layer 3. Social and game mechanics
- Goal:
  - make the feature emotionally sticky
- Features:
  1. chemistry streaks
  2. strongest topics leaderboard for your agent
  3. recurring counterpart patterns:
     - "your agent does well with playful + direct profiles"
  4. social graph flavor:
     - top chemistry this week
     - most repeated sparks
     - awkward-but-interesting matches
  5. daily or weekly digest:
     - "3 agent encounters worth opening"

### Layer 4. Human handoff quality
- Goal:
  - make the transition from agent to human materially better
- Features:
  1. multiple opener suggestions
  2. opener styles:
     - safe
     - playful
     - direct
  3. quick handoff card in chat:
     - what clicked
     - what topic to start with
     - what to avoid
  4. accept / dismiss opener tracking
  5. post-handoff feedback:
     - "was the chemistry prediction accurate?"

### Layer 5. Backend and orchestration
- Goal:
  - make the feature real and persistent
- Features:
  1. server-side persona storage
  2. encounter persistence
  3. transcript persistence
  4. controlled LLM orchestration
  5. moderation and guardrails

## UX surfaces

### Existing surfaces to deepen
1. `Profile`
- richer agent persona preview
- "how your agent is performing"

2. `Matches`
- sort by strongest agent chemistry
- show whether a handoff is ready

3. `Chat`
- agent summary banner
- opener injection

### New surfaces to add
1. `Agent Inbox`
- list of new/active/completed encounters

2. `Encounter Replay`
- compare runs over time

3. `Agent Insights`
- what works for your agent
- what repeatedly causes friction

4. `Agent Controls`
- trust settings
- transcript visibility
- auto-run policies

## Implementation plan

## Phase P1. Encounter lifecycle upgrade
- Goal:
  - make the current frontend prototype feel alive
- Scope:
  1. extend encounter model with:
     - `status`
     - `updatedAt`
     - `runCount`
     - `relationshipStage`
  2. update encounters list UI
  3. update detail UI with stronger state labels
  4. add local mock history
- Deliverable:
  - richer frontend-only product prototype

## Phase P2. User controls and replay
- Goal:
  - add agency and make the feature explorable
- Scope:
  1. rerun action
  2. archive/delete action
  3. transcript visibility toggle
  4. local compare-last-run behavior
  5. persona feedback hints
- Deliverable:
  - meaningful user interaction beyond passive reading

## Phase P3. Handoff quality
- Goal:
  - make the feature more useful for real conversations
- Scope:
  1. multiple opener variants
  2. handoff context card in chat
  3. track opener chosen
  4. track handoff accepted
- Deliverable:
  - stronger conversion from agent encounter to real chat

## Phase P4. Backend contracts
- Goal:
  - persist the feature properly
- Scope:
  1. `agent_persona` CRUD
  2. `agent_encounter` list/detail
  3. transcript storage
  4. handoff state storage
  5. audit-friendly payload shapes
- Deliverable:
  - backend schema and REST contracts

## Phase P5. Controlled orchestration
- Goal:
  - replace static mock transcripts with real generated runs
- Scope:
  1. fixed turn budget
  2. summary generation
  3. opener generation
  4. guardrails
  5. fallback when generation fails
- Deliverable:
  - safe first production orchestration

## Phase P6. Trust, safety, and settings
- Goal:
  - keep the feature understandable and safe
- Scope:
  1. explicit enable/disable setting
  2. transcript visibility choices
  3. delete and rerun controls
  4. explanation labels:
     - user-stated
     - agent-inferred
  5. moderation hooks
- Deliverable:
  - feature can ship without feeling creepy or deceptive

## Phase P7. Metrics and optimization
- Goal:
  - understand if the feature is actually working
- Scope:
  1. persona completion rate
  2. encounter open rate
  3. rerun rate
  4. opener accept rate
  5. chat-start conversion
  6. post-handoff quality feedback
- Deliverable:
  - measurable system with product-learning loop

## Recommended implementation order from current state
1. `P1` encounter lifecycle upgrade
2. `P2` user controls and replay
3. `P3` handoff quality
4. `P4` backend contracts
5. `P5` controlled orchestration
6. `P6` trust and safety
7. `P7` metrics and optimization

## Recommended next coding step
- Best next step from the current repo state:
  - implement `P1`
- Why:
  - it deepens the feature without needing backend work
  - it makes the agent layer feel more like a real product system
  - it prepares the UI and data model for later replay, rerun, and orchestration

## Success criteria

### Product success
- users understand what the agent layer does
- users feel curiosity, not confusion
- agent encounters increase chat starts
- handoff summaries feel helpful, not fake

### Technical success
- frontend state model can evolve into backend-backed contracts cleanly
- encounter UI supports multiple runs and states
- e2e coverage protects key pre-chat flows
- orchestration can be introduced later without replacing the whole UI model
