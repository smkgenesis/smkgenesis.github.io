# Posting Workflow

This file is the short execution checklist.
The full operating rules live in [assembly-manual.md](/C:/Users/smkge/Develop/smkgenesis.github.io/main/_writing/assembly-manual.md).

## Input

The default case is:
- one English original source
- one Korean original source

## Workflow

1. Create or open the target slug directory.
2. Move title and subtitle into front matter.
3. Build `en.qmd` and `ko.qmd` from the canonical source text.
4. Reassemble the content with the approved article components.
5. Keep wording intact unless the user explicitly asks for rewriting.
6. Render and fix layout bugs.
7. Commit and deploy.

## Non-negotiable rules

1. `highlight-box` is the default emphasis box.
2. `workflow-pipeline` is the default flow component.
3. `blockquote` is not used for visual emphasis.
4. EN and KO articles should share the same structural skeleton.
5. Do not keep duplicate raw-source copies unless the user explicitly wants archival storage.
