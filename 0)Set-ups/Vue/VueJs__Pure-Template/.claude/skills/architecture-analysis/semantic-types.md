# Semantic Types — Color, Shape, and When to Use

> **Source of truth.** All other skill files defer to this file for semantic type → color, shape, and applicability. When any file disagrees with this one, this file wins.

Every semantic type has **a unique color, a unique shape, and a clear answer to "when do I apply this type?"**. Never reuse a color for different types.

## Color Palette

Every color is defined once here. Both flowchart `classDef` blocks and `classDiagram` `style` rules draw from this table — never hardcode a hex that isn't in this list.

| Name | Fill | Stroke |
|---|---|---|
| blue | `#1565C0` | `#0D47A1` |
| indigo | `#3949AB` | `#1A237E` |
| teal | `#00838F` | `#004D40` |
| green | `#43A047` | `#2E7D32` |
| orange | `#E65100` | `#BF360C` |
| brown | `#5D4037` | `#3E2723` |
| purple | `#6A1B9A` | `#4A148C` |
| red | `#C62828` | `#8E0000` |
| charcoal | `#37474F` | `#263238` |
| cyan | `#006064` | `#00363a` |
| blue-grey | `#546E7A` | `#455A64` |
| amber | `#F9A825` | `#F57F17` |
| dark-red | `#B71C1C` | `#7F0000` |
| grey | `#424242` | `#212121` |
| navy | `#002171` | `#001545` |

**Extending the palette:** if a diagram needs more colors than listed (deep class hierarchies, additional semantic types), pick high-contrast Material Design 700-900 hexes and append a new row here. Every diagram must reference colors **by name from this table** — never hardcode an unlisted hex.

---

## Core Principle

Use **high-contrast colors with white text**. Light pastels become unreadable on dark backgrounds.

Shape and color together identify a node type at a glance — even without reading the label.

## Semantic Type Mapping

### Actors / Components — `actor`

**When to use:** UI components, pages, the entry point that triggers a subsystem.

```
classDef actor fill:#1565C0,stroke:#0D47A1,color:#ffffff,stroke-width:2px
```

Shape: rectangle `["  Label  "]`

---

### Composables — `composable`

**When to use:** Vue composables — reusable frontend logic units, the main building blocks.

```
classDef composable fill:#00838F,stroke:#004D40,color:#ffffff,stroke-width:2px
```

Shape: rounded rectangle `("  Label  ")` — soft boundary signals "reusable".

---

### Pinia Stores — `store`

**When to use:** Pinia stores — in-memory reactive app state (`useFiltersStore`, `useMapLayersStore`, etc.).

```
classDef store fill:#E65100,stroke:#BF360C,color:#ffffff,stroke-width:2px
```

Shape: stadium/pill `(["  Label  "])` — the pill shape is visually distinct from both rectangles and rounded rects.

**Never use cylinder for stores** — cylinder implies database/disk persistence, which Pinia stores are not.
**Never use `[["..."]]` subroutine** — the double border is nearly invisible at diagram scale.

---

### Caches / Databases — `cache`

**When to use:** Module-level caches, actual databases, persistent or cache-like storage.

```
classDef cache fill:#5D4037,stroke:#3E2723,color:#ffffff,stroke-width:2px
```

Shape: cylinder `[("  Label  ")]`

---

### External Systems — `external`

**When to use:** Backend APIs, GeoServer, third-party APIs, remote services, plugin wrappers that cross a subsystem boundary — out of scope for this subsystem.

```
classDef external fill:#6A1B9A,stroke:#4A148C,color:#ffffff,stroke-width:2px
```

Shape: asymmetric/ribbon `>"  Label  "]` — points outward, signals "comes from outside".

**Never use a plain rectangle** for external nodes — color alone is not enough visual distinction.
**Never use the `{{...}}` hexagon shape** — it breaks label rendering in VS Code and GitLab.

---

### Decisions / Conditions — `decision`

**When to use:** Branching logic, conditional checks.

```
classDef decision fill:#C62828,stroke:#8E0000,color:#ffffff,stroke-width:2px
```

Shape: diamond `{"  Label  "}` — keep labels short (max 2 lines, under 15 chars each).

---

### Computed / Derived Data — `computed`

**When to use:** Values produced by `computed(() => ...)` — read-only, derived from other reactive sources. Normalized data, aggregated values, filtered lists.

```
classDef computed fill:#3949AB,stroke:#1A237E,color:#ffffff,stroke-width:2px
```

Shape: stadium/pill `(["  Label  "])` — pill signals "derived, flowing data".

**`computed` vs `state`:** Use `computed` when the value is derived and read-only. Use `state` when the value is a plain `ref()` / `reactive()` written to directly.

---

### Reactive State — `state`

**When to use:** Plain mutable reactive refs (`ref()`, `reactive()`) that are written to directly — not derived from other values. Use for:
- Live state containers whose value is set imperatively (`workspaceLayers`, `selectedFeature`)
- Property mutations shown as explicit steps in a flow (`layer.manual = true`, `filter.active = false`)

```
classDef state fill:#546E7A,stroke:#455A64,color:#ffffff,stroke-width:2px
```

Shape: rectangle `["  Label  "]` — same shape as `actor`; blue-grey color (vs actor's dark blue) signals "mutable data" rather than "UI component".

**`computed` vs `state`:** Use `computed` when the value is derived via `computed(() => ...)` — read-only, reactive to its dependencies. Use `state` when the value is a plain `ref()` / `reactive()` written to directly.

---

### System Events — `event`

**When to use:** Vue lifecycle hooks, watchers, DOM/library events (`moveend`, `onMounted`).

```
classDef event fill:#37474F,stroke:#263238,color:#ffffff,stroke-width:2px
```

Shape: parallelogram `[/  Label  /]` — same shape as `trigger` but dark charcoal color signals "system, not user". Keep labels short, single-line, no `<br/>` subtitle — these are secondary and should render smaller than process nodes.

---

### User Actions / Triggers — `trigger`

**When to use:** UI interactions initiated by the user — clicks, toggles, form inputs.

```
classDef trigger fill:#006064,stroke:#00363a,color:#ffffff,stroke-width:2px
```

Shape: parallelogram `[/  Label  /]` — standard flowchart "input" symbol. Keep labels short and single-line — no `<br/>` subtitles — so these nodes render visibly smaller than process nodes.

---

### Operations / Actions — `action`

**When to use:** Class methods, API operations, RPC calls, persistence verbs — atomic operations performed by a node, distinct from UI components, composables (reusable logic), events (signals), or state (data). Use when an arrow between two architectural nodes needs more visual weight than an edge label but is not itself a process/composable.

```
classDef action fill:#F9A825,stroke:#F57F17,color:#000000,stroke-width:2px
```

Shape: trapezoid `[/  Label  \]` — distinct from the `[/  /]` parallelogram (events/triggers); amber color signals "operation" without overlapping any other type. Black text (not white) for legibility on the bright amber fill.

Examples: `save / update / delete`, `getCapabilities`, `POST /api/items`, `dispatch("commit")`.

---

### Errors / Exceptions — `error`

**When to use:** Fault points, thrown exceptions, error boundaries, validation failures, network errors — places where the happy path breaks. Use to signal "things went wrong here" so error flows are visually distinct from normal branching (which uses `decision`).

```
classDef error fill:#B71C1C,stroke:#7F0000,color:#ffffff,stroke-width:2px
```

Shape: circle `((  Label  ))` — distinct from every other shape; the deeper red signals severity beyond `decision` red.

**`error` vs `decision`:** `decision` is a normal yes/no branch (`mode === VIEW?`). `error` is a fault state (`API timeout`, `validation failed`, `permission denied`). If both branches are equally valid outcomes, it's `decision`; if one path is "the system failed", it's `error`.

Examples: `API timeout`, `401 unauthorized`, `validation failed`, `throw new Error()`.

---

### Constants / Configuration — `constants`

**When to use:** Static declarative values that drive behavior — config objects, enum-like maps, route tables, default options, feature flags constants. Not data that changes at runtime (that's `state` or `cache`) — these are compile-time / module-level definitions.

```
classDef constants fill:#424242,stroke:#212121,color:#ffffff,stroke-width:2px
```

Shape: rectangle `["  Label  "]` — same shape as `actor` and `state`; neutral dark grey signals "static reference, no behavior".

Examples: `MAP_MODES`, `DEFAULT_CONTROLS`, `ROUTES`, `i18n locale dict`, `MIME_TYPES`.

---

### Middleware / Plugins — `middleware`

**When to use:** Interceptors, plugins, wrappers that sit between two layers and transform/observe the flow — Vue plugins, axios interceptors, Pinia plugins, route guards, error handlers registered globally. Distinct from `composable` (reusable building blocks) — middleware specifically *intercepts* an existing flow.

```
classDef middleware fill:#002171,stroke:#001545,color:#ffffff,stroke-width:2px
```

Shape: reverse trapezoid `[\  Label  /]` — angular sides signal "intercepting/wrapping"; the dark navy color is clearly distinct from actor blue and composable teal. Pair with arrows showing what the middleware sits between.

**`middleware` vs `composable`:** `composable` is a building block called by other code. `middleware` is plumbing that wraps/intercepts something else. If removing it changes behavior of an existing flow without anyone calling it explicitly, it's `middleware`.

Examples: `axios.interceptors.response`, Vue plugin `app.use()`, `router.beforeResolve`, Keycloak token-refresh hook.

---

## Shape Cheatsheet

| Type | Shape syntax | Visual meaning |
|---|---|---|
| `actor` | `["  Label  "]` | rectangle — concrete component |
| `composable` | `("  Label  ")` | rounded rect — reusable logic |
| `store` | `(["  Label  "])` | stadium/pill — in-memory app-wide state (orange) |
| `cache` | `[("  Label  ")]` | cylinder — persistent / module-level data |
| `external` | `>"  Label  "]` | ribbon — comes from outside |
| `decision` | `{"  Label  "}` | diamond — branching |
| `computed` | `(["  Label  "])` | stadium/pill — derived value (indigo) |
| `state` | `["  Label  "]` | rectangle — mutable reactive ref / state mutation (blue-grey) |
| `event` | `[/  Label  /]` | parallelogram — system event/signal (dark charcoal) |
| `trigger` | `[/  Label  /]` | parallelogram — user-initiated input (dark cyan) |
| `action` | `[/  Label  \]` | trapezoid — class method / API operation (amber) |
| `error` | `((  Label  ))` | circle — fault state / exception (deep red) |
| `constants` | `["  Label  "]` | rectangle — static config / enum-like map (grey) |
| `middleware` | `[\  Label  /]` | reverse trapezoid — interceptor / plugin (dark navy) |

## Usage Pattern

```mermaid
flowchart TD
  Page["   DataExplorer   "]
  uSC("   useStationsCluster   ")
  FS(["    useFiltersStore    "])
  PC[("   paginationCache   ")]
  BE>"   Backend API   "]
  CL(["    clusters    "])
  ST["    selectedFeature    "]
  EV[/  moveend  /]
  USR[/  user toggle  /]
  ACT[/   POST /items   \]
  BR{"   mode === VIEW?   "}
  ERR((   API timeout   ))
  CFG["   MAP_MODES   "]
  MW[\ axios.interceptors /]

  classDef actor      fill:#1565C0,stroke:#0D47A1,color:#ffffff,stroke-width:2px
  classDef composable fill:#00838F,stroke:#004D40,color:#ffffff,stroke-width:2px
  classDef store      fill:#E65100,stroke:#BF360C,color:#ffffff,stroke-width:2px
  classDef cache      fill:#5D4037,stroke:#3E2723,color:#ffffff,stroke-width:2px
  classDef external   fill:#6A1B9A,stroke:#4A148C,color:#ffffff,stroke-width:2px
  classDef computed   fill:#3949AB,stroke:#1A237E,color:#ffffff,stroke-width:2px
  classDef state      fill:#546E7A,stroke:#455A64,color:#ffffff,stroke-width:2px
  classDef event      fill:#37474F,stroke:#263238,color:#ffffff,stroke-width:2px
  classDef trigger    fill:#006064,stroke:#00363a,color:#ffffff,stroke-width:2px
  classDef action     fill:#F9A825,stroke:#F57F17,color:#000000,stroke-width:2px
  classDef decision   fill:#C62828,stroke:#8E0000,color:#ffffff,stroke-width:2px
  classDef error      fill:#B71C1C,stroke:#7F0000,color:#ffffff,stroke-width:2px
  classDef constants  fill:#424242,stroke:#212121,color:#ffffff,stroke-width:2px
  classDef middleware fill:#002171,stroke:#001545,color:#ffffff,stroke-width:2px

  class Page actor
  class uSC composable
  class FS store
  class PC cache
  class BE external
  class CL computed
  class ST state
  class EV event
  class USR trigger
  class ACT action
  class BR decision
  class ERR error
  class CFG constants
  class MW middleware
```

## classDiagram Coloring

`classDiagram` uses `style ClassName fill:...,stroke:...,color:...` (not `classDef`/`class` — those don't work in classDiagram). Assign **one color per inheritance depth level**: classes that sit at the same level in the diagram share a color, classes at different levels get different colors. Pick colors from the palette in this canonical order — each next level uses the next entry:

| Level | Color name | Hex (fill / stroke) | Typical role |
|---|---|---|---|
| 1 | blue | `#1565C0` / `#0D47A1` | Abstract root base (e.g. `Model`) |
| 2 | indigo | `#3949AB` / `#1A237E` | Infrastructure base (`RestApiModel`) |
| 3 | teal | `#00838F` / `#004D40` | Primary domain entity (`Workspace`, `Contact`, `Layer`) |
| 4 | green | `#43A047` / `#2E7D32` | Intermediate concrete / scoped record (`WMSLayer`, `WorkspaceAnnotation`) |
| 5 | blue-grey | `#546E7A` / `#455A64` | Deeper concrete / server-specific leaf (`GeoServerLayer`, `ThreddsLayer`) |
| 6+ | extend the palette | — | append a new high-contrast Material 700–900 color and reference it by name |

> **Note:** `blue-grey` is also the color of the `state` flowchart type, but classDiagrams and flowcharts are separate visual contexts — reusing the hex across contexts is fine. The "one color per level" rule applies *within* a single diagram.

**Rules:**

- **One color per level.** Two classes that visually sit at the same vertical row in the rendered diagram MUST share a color. Two classes at different levels MUST NOT.
- **Sequential consumption.** Use level 1 only if a level-1 class is shown; otherwise start the sequence at the most abstract class actually drawn (e.g. a workspace-only diagram may start at indigo because `Model` isn't drawn).
- **Same-level siblings share.** `WMSLayer` and `VectorLayer` are siblings → same color (green). `GeoServerLayer` and `HTTPLayer` are siblings even though they descend through different parents → same color (pink).
- **Extend, don't reuse.** If a hierarchy needs a 6th level, add a new palette row rather than reusing teal/green for two different levels.

---

## Rules

- **One color per type, always.** No two entity types share a color.
- **Shape + color together** uniquely identify the type — even in a grayscale print.
- The `classDef` sets color; the node syntax sets shape. Both must match the semantic type.
- `external` = "outside this subsystem's boundary" — Backend, GeoServer, third-party libs.
- `event` vs `trigger` vs `flag` — three distinct grey-spectrum types. `event` (dark charcoal, system events like `moveend`), `trigger` (dark cyan, user-initiated actions), `flag` (blue-grey, boolean state mutations). Never collapse these into a single `event` type.
- `computed` vs `state` — `computed` (indigo pill) = value produced by `computed(() => ...)`, read-only, derived. `state` (blue-grey rectangle) = plain `ref()` / `reactive()` written to directly, or a boolean mutation step. Never use `computed` for mutable refs.
- `trigger` nodes use parallelogram `[/  /]` and intentionally short labels with no `<br/>` subtitle — their smaller visual footprint communicates "input, not process".
- **Do not invent new `classDef` names** unless explicitly requested. Use one of the ten canonical types above.
- `action` vs `composable` — `action` is for atomic operations / class methods / API verbs (`save()`, `getCapabilities()`, `POST /items`). `composable` is for reusable logic units (Vue composables, services, factories). If the node represents a verb being performed, it's `action`; if it represents a thing that holds reusable logic, it's `composable`.

## Avoid

- Reusing the same color for different semantic types (e.g. stores and caches both orange — wrong)
- Cylinder shape for Pinia stores
- Plain rectangle for external/backend nodes
- Hexagon `{{"..."}}` — breaks rendering in VS Code and GitLab
- Pastel fills — unreadable on dark backgrounds
- More than one `classDef` block with the same name in a diagram
