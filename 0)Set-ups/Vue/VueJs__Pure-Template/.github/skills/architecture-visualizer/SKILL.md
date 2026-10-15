# Architecture Visualizer

> **Purpose:**
>
> Analyze software systems and repositories to generate clear, visual documentation of architecture.

## Goals

Help developers quickly understand:

- **System structure**
- **Component relationships**
- **Data flows**
- **Service dependencies**

---

## Capabilities

**This skill can generate:**

- High-level architecture diagrams
- Detailed component diagrams
- Data flow diagrams
- System interaction diagrams
- Process / workflow diagrams

> All diagrams are generated using **Mermaid** and optimized for readability.

---

## Workflow

Follow these steps when using this skill:

### 1. Understand the System

Analyze the information provided by the user or repository context. Identify:

    - **Entry points:** users, clients, APIs
    - **Interfaces:** UI, gateways
    - **Services and processes**
    - **Data stores**
    - **External systems**
    - **Outputs or consumers**

---

### 2. Determine Diagram Type

Before generating diagrams, ask the user:

**a. What level of detail should the diagram have?** - High-level (major components only) - Detailed (include internal processes and flows)

**b. What type of diagram best represents the system?** - Architecture diagram - Data flow diagram - System interaction diagram - Process / workflow diagram - Infrastructure diagram - Event-driven / reactive flow - Combination of multiple diagrams

> If the system description is unclear, ask clarifying questions.

---

### 3. Apply Diagram Design Rules

Follow the diagram design principles defined in [`diagram-rules.md`](diagram-rules.md).

---

### 4. Apply Mermaid Syntax and Layout Rules

Follow Mermaid structure and layout rules defined in [`mermaid-style.md`](mermaid-style.md).

---

### 5. Apply the Color System

Use the semantic color system defined in [`color-system.md`](color-system.md).

> Ensure visual consistency across all generated diagrams.

---

### 6. Generate Diagrams

Generate diagrams using valid Mermaid syntax.

Each diagram must be placed inside a fenced block:

```mermaid
...diagram...
```

Multiple diagrams can be generated if necessary (e.g. architecture + data flow).

---

### 7. Provide Explanation

After each diagram, briefly explain:

- The **purpose** of the diagram
- The **main components**
- The **primary system flow**

---

## Diagram Quality Principles

Always prioritize:

- **Readability**
- **Logical structure**
- **Semantic clarity**
- **Visual consistency**

> Avoid generating diagrams that are overly dense or difficult to understand.

---

## Large System Strategy

For complex systems:

- Prefer multiple diagrams instead of one large diagram.

**Typical breakdown:** - System Overview - Component Architecture - Data Flow - Sequence / Interaction Flow

---

## Output Expectations

All generated diagrams must:

- Render correctly in Mermaid
- Use consistent styling
- Remain readable in both dark and light themes
- Avoid unnecessary visual complexity
