# Diagram Architecture Rules

These rules answer **"is the diagram correct?"** — semantic and structural correctness. For visual rendering details (spacing, padding, fontSize, syntax), see `rendering.md`. For semantic types (colors and shapes), see `semantic-types.md`.

The goal: diagrams that are easy to understand, visually structured, logically layered, and readable at a glance.

## Always Prefer Simplicity

A diagram should communicate the architecture quickly.

Avoid:

- excessive detail
- long text blocks
- showing every implementation detail

Prefer clarity over completeness.

## Diagram Levels of Abstraction

Large systems should be represented with multiple diagrams, each at a different level of detail.

### Level 1 — System Overview

Show only major modules. Example nodes: UI, API, Services, Database, External APIs.

**Typical size:** 5–8 nodes.

### Level 2 — Component Architecture

Show internal components of a single module. Example: `ResultsFilters`, `BaseOptionCard`, `FilterController` inside the Frontend.

**Typical size:** 6–12 nodes.

### Level 3 — Internal Flow (optional)

Show decisions, event flows, processing logic.

**Typical size:** 8–15 nodes.

## Never Mix Abstraction Levels

Do not combine UI architecture, component details, internal logic, and event handlers in a single diagram. If you find yourself wanting to, split into multiple diagrams.

## Maximum Node Limits

To preserve readability:

- **High-level diagrams:** 8 nodes max
- **Detailed diagrams:** 15 nodes max

If you exceed these, split into multiple diagrams.

## Layered Layout

Prefer vertical layered architecture:

```
Users / Actors
    ↓
UI / Interfaces
    ↓
Services / Logic
    ↓
Data Stores
    ↓
External Systems
```

This vertical structure is easier to read and avoids crossing edges.

## Subgraph Usage — When to Use

Use subgraphs **only when they add clarity** — not by default. A subgraph is worth adding when nodes naturally belong to a named boundary that helps the reader orient themselves.

**Good reasons to use a subgraph:**

- Separating conceptually distinct phases of a flow (Request vs Response)
- Grouping components that belong to the same module or layer (Frontend, Data)
- Making a directional boundary explicit (e.g. a `direction RL` response lane)

**Do not use a subgraph** for cosmetic grouping, or when all nodes already belong to one obvious flow. A flat diagram with clear edges is better than nesting without meaning.

For subgraph styling and naming conventions, see `rendering.md`.

## Node Labels — Keep Them Short

Node labels must be concise.

Good:

```
ResultsFilters
FilterController
AuthService
```

Bad:

```
ResultsFilters component responsible for managing user filters
```

If explanation is needed, describe it **below the diagram**, not inside it. For label rendering details (line breaks, padding, `<small>` subtitles), see `rendering.md`.

## Edge Labeling — When to Add a Label

Label an edge whenever the label adds meaning. An unlabeled arrow only says "A connects to B" — a labeled arrow says *what* flows or *what triggers* the connection. Prefer labels over leaving the reader to guess.

Add a label when the edge represents:

- **An action or method call** — `FiltersStore -->|"router.replace()"| URLParams`
- **A trigger/event** — `FiltersStore -->|"on change"| UrlSync`
- **A condition or branch** — `Auth -->|"valid"| API` / `Auth -->|"invalid"| Error`
- **A data payload** — `BackendAPI -.->|"response"| Consumer`
- **A lifecycle phase** — `Page -->|"initial load"| UrlSync`

Skip the label only when the connection is fully self-explanatory from the node names alone. When in doubt, label.

Keep labels short — 1–4 words. Long labels render as cramped boxes; for those cases, use intermediate transition nodes — see `rendering.md`.

## External Systems Are Always Terminal

External systems (Backend, GeoServer, third-party APIs) must be the **last node in the call direction**. They receive arrows — they never pass through to the next processing step.

A backend call **always** returns something — show this explicitly with a dashed arrow labeled `"response"` (or `"response payload"`, `"data"`):

```
Service --> ExternalAPI
ExternalAPI -.->|"response"| Consumer    ✓  external is terminal; labeled dashed = response

Service --> ExternalAPI                  ✗  call shown but return path missing
Service --> ExternalAPI --> Consumer     ✗  looks like external is a pass-through
```

The dashed arrow makes it visually clear that:

- Solid `-->` = the call going out
- Dashed `-.->|"response"|` = data returning back

Always include the label on the return arrow — without it the dashed line is ambiguous. This rule applies to every external-type node regardless of shape or color.

## Request/Response Pipelines

When a diagram shows an internal request pipeline — cache hit/miss, `createEndpointExec`, `withAsync`, `$api.get`, a backend call, normalize, cache update, or reactive ref update — prefer **`flowchart LR`** with explicit request and response paths over `sequenceDiagram`.

Use `sequenceDiagram` **only** when the primary goal is chronological actor-to-actor communication. For data-flow pipelines, a flowchart is clearer.

**Rules:**

- **Request direction:** left-to-right, solid arrows (`-->`).
- **Response direction:** dashed arrows (`-.->`), labeled `"response"` / `"response payload"` / `"data"`, returning from the backend toward the consumer.
- **Backend stays terminal in the request direction.** Post-response logic (normalize, parse, map, cache update, reactive ref update) must not appear as a forward continuation past the backend node — it belongs on the response path.

```
✗  Service --> BackendAPI --> Normalize

✓  Service --> BackendAPI
   BackendAPI -. "response payload" .-> Normalize
```

When both paths are complex, use separate `Request` / `Response` subgraphs or directional lanes (see `rendering.md` for subgraph styling). This keeps the backend visually terminal while still showing the full pipeline.

## Decision Nodes Must Show Both Branches

Every decision diamond (`{...}`) is a yes/no (or multi-way) split — so it must have **at least two outgoing arrows, each labeled** with the branch condition. A diamond with only one outgoing arrow is wrong: it implies the decision is decorative rather than a real fork.

```
Validation -->|"yes"| Fetch          ✓  both branches shown
Validation -->|"no"|  EmptyState

Validation --> Fetch                 ✗  decision diamond with one arrow — what about no?
```

Even when the "no" branch is uninteresting (skip, no-op, wait), give it a destination so the reader can see the path is intentional. Common destinations:

- A shared downstream node both branches reach (e.g. a render node that handles both data and empty state)
- A dedicated transition node like `Skip(["  skip  "])` styled neutrally
- The next state in a state machine

Labels are mandatory on **both** arrows — `"yes"` / `"no"`, or domain-specific terms like `"valid"` / `"invalid"`, `"hit"` / `"miss"`. Never label only one branch.

## Diagram Splitting Strategy

For complex systems, generate multiple diagrams:

1. System Overview
2. Component Architecture
3. Data Flow
4. Interaction Flow

Multiple diagrams are always better than one overloaded diagram.

## Avoid Visual Noise

Avoid:

- excessive labels
- long node descriptions
- too many branching decisions
- deeply nested subgraphs

## Final Goal

Every diagram should be understandable in **less than 10 seconds**.
