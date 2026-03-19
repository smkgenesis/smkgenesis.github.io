# Article Assembly Manual

This is the operating manual for turning raw EN/KO source text into a finished article without repeating ad hoc layout decisions.

## Goal

Given:
- one English original source
- one Korean original source

Produce:
- one paired article directory
- one `en.qmd`
- one `ko.qmd`
- one consistent, publishable result

The editor is responsible for structure, component choice, spacing, and visual consistency.
The editor must not casually rewrite the source unless the user explicitly asks for rewriting.

## Source Rules

1. Treat the user's pasted EN and KO text as canonical source.
2. Do not paraphrase, shorten, embellish, or normalize wording unless asked.
3. Fix only:
   - markdown structure
   - section hierarchy
   - component placement
   - rendering safety
   - obvious formatting breakage
4. If the source contains a title and subtitle at the top, move them into front matter and do not repeat them in the body.

## Directory Rules

Every article is a pair:

```text
articles/
  article-slug/
    en.qmd
    ko.qmd
```

Rules:
- `en.qmd` and `ko.qmd` are the only canonical publishable sources.
- Do not maintain a second long-term raw-source copy unless the user explicitly asks for archival storage.
- The article listing indexes the English file.

## Assembly Rules

### 1. Header

Use front matter for:
- `title`
- `date`
- `description`
- `toc`

Use the language toggle directly below front matter.

Do not repeat title or subtitle again in the body.

### 2. Section structure

Default mapping:
- article sections -> `#`
- sub-sections -> `##`

Inside each major section:
- use `section-lead` only when the first sentence should work as an opener
- use `highlight-box` for short isolated conclusions, warnings, rules, or emphasis
- use normal paragraphs when no component is needed

Do not force every section to use every component.

### 3. Workflow rules

Use `workflow-pipeline` when the source expresses a sequence such as:
- `A → B → C`
- `tool 1 -> tool 2 -> output`

Rules:
- prefer one-line horizontal flow
- allow horizontal scrolling instead of wrapping
- keep step labels short
- do not create a special workflow style for one section unless the user asks

### 4. Text diagram rules

Use `text-diagram` when the source already contains a text/ASCII architecture and the developer tone should be preserved.

Rules:
- prefer vertical diagrams over wide diagrams
- keep width narrow enough to avoid broken alignment
- center the diagram inside the panel
- remove captions unless the user explicitly wants them
- if the diagram becomes visually unstable, simplify the structure instead of adding more lines

### 5. Highlight rules

Use `highlight-box` for:
- section conclusions
- rules
- short architectural principles
- isolated statements that used to be blockquotes

Rules:
- this is now the default emphasis box
- do not use markdown blockquote for visual emphasis
- keep the text short
- preserve line breaks when the source uses two-line formulations

### 6. Lists and tables

Use lists for:
- requirements
- symptoms
- features
- outputs
- optional tools

Use tables only for:
- role mapping
- two-column comparisons

If the user already wrote a role map as aligned text and it reads well, it may remain a code/text block.

### 7. Code and exact text

Use inline code only for:
- exact file names
- identifiers
- commands
- config keys

Do not turn normal nouns like `GitHub` or `Google Drive` into inline code unless precision is required.

### 8. Korean/English parity

The EN and KO article should follow the same structural skeleton:
- same section order
- same diagram slot
- same workflow slot
- same highlight-box usage

Wording may differ because the source differs.
Structure should not drift without a reason.

## Review Checklist

Before rendering, verify:

1. Title and subtitle are only in front matter.
2. Language toggle links point to the paired article.
3. No raw HTML is leaking into the body.
4. No blockquote styling is used for emphasis.
5. Workflow strips stay one-line with scroll instead of wrapping.
6. ASCII/text diagrams are visually stable.
7. Highlight boxes are short and readable.
8. Section spacing is consistent across the article.
9. EN and KO articles match structurally.

## Render Checklist

After `quarto render`, check:

1. Header layout
2. Toggle position after hard refresh
3. Workflow strip overflow behavior
4. Text diagram alignment
5. Listing card appearance in `articles.html`
6. EN/KO links

## Default Execution Pattern

When the user pastes a new article pair:

1. Create or open the target slug directory.
2. Put title and subtitle into front matter.
3. Reassemble the source into components without rewriting the content.
4. Use `highlight-box` as the only emphasis box.
5. Use `workflow-pipeline` for all explicit flows.
6. Use `text-diagram` only when a text architecture is already present and worth preserving.
7. Render.
8. Fix layout bugs.
9. Commit.
10. Deploy.

This is the default process unless the user gives a more specific direction.
