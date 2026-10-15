# Mermaid Diagram Color System

This document defines the visual color system used for Mermaid diagrams.

The goal is to ensure diagrams are:

- visually consistent
- easy to read
- understandable through color semantics
- readable on both light and dark backgrounds

## Semantic Color Mapping

Use consistent colors for different system components.

Actors / Users
Used for external users, clients, or entry points.

classDef actor fill:#E3F2FD,stroke:#1E88E5,color:#0D47A1,stroke-width:2px

Interfaces / Frontends
Used for UI applications, dashboards, or gateways.

classDef interface fill:#E8F5E9,stroke:#43A047,color:#1B5E20,stroke-width:2px

Services / APIs
Used for backend services and business logic.

classDef service fill:#E0F7FA,stroke:#00838F,color:#004D40,stroke-width:2px

Data Stores
Used for databases, caches, storage systems.

classDef datastore fill:#FFF3E0,stroke:#FB8C00,color:#E65100,stroke-width:2px

External Systems
Used for third-party APIs or external platforms.

classDef external fill:#F3E5F5,stroke:#8E24AA,color:#4A148C,stroke-width:2px

Decisions / Conditions
Used for logic branching.

classDef decision fill:#FCE4EC,stroke:#D81B60,color:#880E4F,stroke-width:2px

Derived / Transformations
Used for computed values, transformations, aggregations.

classDef transform fill:#EDE7F6,stroke:#5E35B1,color:#311B92,stroke-width:2px

## Style Consistency Rules

All diagrams should:

- use consistent stroke width (2px)
- use clear contrasting text colors
- avoid overly saturated backgrounds
- keep color usage semantic and intentional

## Usage Pattern

Define classes first, then apply them to nodes.

Example:

```mermaid
flowchart TD

User([User])
API[Backend API]
DB[(Database)]

classDef actor fill:#E3F2FD,stroke:#1E88E5,color:#0D47A1,stroke-width:2px
classDef service fill:#E0F7FA,stroke:#00838F,color:#004D40,stroke-width:2px
classDef datastore fill:#FFF3E0,stroke:#FB8C00,color:#E65100,stroke-width:2px

class User actor
class API service
class DB datastore
```

The color system should remain consistent across diagrams
to help readers quickly understand component roles.

### Avoid

- Avoid random colors.

- Avoid redefining classes with different colors.

- Avoid using more than 5–6 color categories in a single diagram.

### Readability Priority

If a diagram becomes visually confusing,
reduce colors rather than increasing them.
