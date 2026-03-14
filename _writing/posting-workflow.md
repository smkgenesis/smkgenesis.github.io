# Posting Workflow

This is the standard workflow for converting raw source text into a finished blog post.

## Input
The source can be:
- rough notes
- a draft essay
- a technical explanation
- a design memo
- a research summary

## Step 1. Extract article spine
Identify:
- main thesis
- target reader
- major sections
- supporting evidence
- places where scanability is needed

Output:
- title candidate
- subtitle candidate
- section outline

## Step 2. Classify content by component
Map raw content into components.

Typical mapping:
- claim or framing sentence -> subtitle
- repeated items -> list
- role mapping -> table
- flow or system relation -> diagram
- exact technical term -> inline code
- folder hierarchy -> file-tree block
- repo or doc link -> repository/reference card
- warning or side constraint -> callout

## Step 3. Normalize style
Rewrite for:
- shorter paragraphs
- consistent terminology
- explicit section transitions
- reader-first ordering

## Step 4. Build article draft
Start from main/articles/_template.qmd.
Then fill sections with the chosen components.
Every article must be published as an EN/KO pair, with the language toggle links filled before publish.

## Step 5. Review for overuse
Check that the article is not overloaded with decoration.
Rules:
- do not use tables when lists are enough
- do not use diagrams for trivial flows
- do not use callouts for normal paragraphs
- do not turn every link into a card

## Step 6. Final publish check
Verify:
- title is explicit
- subtitle explains scope
- sections follow logical order
- diagrams have captions
- code blocks are purposeful
- links are classified correctly
- article has a clear ending

## Expected collaboration pattern
When the user provides source text, the editor should:
1. derive the structure
2. choose the right components
3. produce the final QMD draft
4. keep tone editorial and technically clear