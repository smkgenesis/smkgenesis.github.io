# Component Cookbook

This document defines how to use the blog components when converting raw notes into a publishable post.

## Core Components

### Main title
Use for the article's primary claim or topic.
Rule: explicit, not clickbait, usually 5-12 words.

### Subtitle
Use for framing.
Rule: one or two sentences that explain scope, intent, or payoff.

### Published date
Use article metadata only.
Rule: do not repeat this inside the body.

### Headings
Use `H2` for major sections.
Use `H3` for sub-steps, scenarios, or sub-arguments.

### Body text
Use for reasoning, explanation, and transitions.
Rule: if a paragraph contains more than one structural unit, split it.

### List block
Use when the reader needs scanability.
Good for principles, steps, symptoms, requirements, and outputs.

### Table
Use when the reader needs column comparison or role mapping.
Do not use a table when the content is sequential.

### Inline code
Use for exact terms, command names, file names, config keys, and identifiers.
Examples: `gws`, `main/_quarto.yml`, `librarian_memory`

### Diagram
Use for system flow, architecture, or relationships between components.
Always add a caption.

### Code block
Use for runnable code, command sequences, config snippets, and examples.
Prefer short blocks with obvious purpose.

### Link block
Use for external links that need a sentence of explanation.

## Extended Components

### Blockquote
Use for claims, quotes, or a short framing statement worth isolating.

### Callout
Use for note, warning, important constraints, or implementation caveats.

### Figure + caption
Use for screenshots, diagrams, and visuals that need explanation.

### Footnote
Use for secondary context that should not break main flow.

### Horizontal divider
Use sparingly to separate large sections or appendices.

### Metadata chip
Use for tags and article categories only.

### Repository / reference card
Use for repos, papers, docs, or external resources that deserve dedicated prominence.

### Equation block
Use for math that must stand apart from normal prose.

### Definition block
Use for term-definition pairs.
Best for conceptual articles.

### Comparison block
Use for A vs B structures when a table would feel too rigid.

### Timeline / process block
Use for sequences, project phases, workflows, or lifecycle explanations.

### File tree block
Use for folder structures, hierarchies, or artifact layouts.

## Conversion Rules

1. Turn repeated patterns into lists.
2. Turn role mappings into tables.
3. Turn architecture relationships into diagrams.
4. Turn exact identifiers into inline code.
5. Turn important links into repository/reference cards.
6. Turn folder layouts into file-tree blocks.
7. Use callouts only when the reader needs a strong side-channel warning or note.

### Language toggle`r`nUse at the top of every article.`r`nRule: each article is treated as an EN/KO pair inside one slug directory, and both links must be explicit.