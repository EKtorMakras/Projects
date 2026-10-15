# Mermaid Diagram Style Guide

This document defines how Mermaid diagrams must be written and structured
to ensure consistency, readability, and maintainability.

The goal is to produce diagrams that render cleanly in Markdown viewers
and remain readable in both light and dark themes.

## Default Diagram Type

Unless another layout significantly improves readability, use:

flowchart TD

This creates a **top-down architecture layout**, which is preferred
for most system diagrams.

## Direction Rules

Use the following orientation guidelines:

Top-Down (`flowchart TD`)

- architecture diagrams
- system interaction diagrams
- infrastructure diagrams

Left-Right (`flowchart LR`)

- process pipelines
- data processing stages
- sequential workflows

Avoid switching orientation unnecessarily.

## Node Label Rules

Keep node labels **short and readable**.

Preferred:

User
API Gateway
Auth Service
PostgreSQL

Avoid:

User sends authentication request to backend service

If additional explanation is needed,
describe it **outside the diagram**.

## Edge Label Rules

Use edge labels only when necessary.

Examples:

User --> API

API --> DB

Decision branches:

Auth -->|YES| Cache
Auth -->|NO| Database

Avoid excessive labels.

## Subgraph Usage

Use subgraphs to group components belonging to the same subsystem.

Example:

subgraph Frontend
UI[Web App]
State[State Store]
end

subgraph Backend
API[API Service]
Worker[Background Worker]
end

Subgraphs should represent:

- services
- subsystems
- infrastructure layers
- bounded contexts

Avoid nested subgraphs unless necessary.

## Node Count Guidelines

High-level diagrams:
5 – 12 nodes

Detailed diagrams:
10 – 20 nodes

If a diagram exceeds this size,
split it into multiple diagrams.

## Avoid Visual Noise

Avoid:

- overly long labels
- excessive edge labels
- too many decisions
- deeply nested subgraphs

Prefer multiple smaller diagrams over one complex diagram.

## Rendering Safety

Ensure Mermaid syntax is valid.

Always produce diagrams inside:

```mermaid
...diagram...
```

Never mix markdown text inside the diagram block.

Final Output Expectations

A generated diagram should:

- render without syntax errors

- maintain consistent orientation

- remain readable in both dark and light themes

- avoid visual clutter
