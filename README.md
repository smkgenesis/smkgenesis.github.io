# smkgenesis.github.io

Personal technical blog built with Quarto.

This repository contains:
- the source for the public site at [smkgenesis.com](https://smkgenesis.com)
- EN/KO paired technical articles
- a reusable article component system
- a documented article assembly workflow

## Repository Layout

```text
articles/
  article-slug/
    en.qmd
    ko.qmd

styles/
  article/
  base/
  feature/
  layout/
  theme/
  tokens/

_writing/
_site/
_quarto.yml
page-transition.js
```

## Article Model

Each article is treated as an EN/KO pair:

```text
articles/
  article-slug/
    en.qmd
    ko.qmd
```

Canonical rules:
- `en.qmd` and `ko.qmd` are the publishable source files
- title and subtitle live in front matter
- wording comes from the provided source text
- structure is assembled through reusable components

## Core Components

Current defaults:
- `highlight-box` for isolated emphasis, quotes, rules, and conclusions
- `workflow-pipeline` for flows and process strips
- `text-diagram` for developer-style text architecture
- `repository-card` for important external repositories or references

## Writing Workflow

The article workflow is documented here:
- [`_writing/assembly-manual.md`](./_writing/assembly-manual.md)
- [`_writing/posting-workflow.md`](./_writing/posting-workflow.md)
- [`_writing/component-cookbook.md`](./_writing/component-cookbook.md)

Default process:
1. Receive EN/KO source text
2. Assemble `en.qmd` and `ko.qmd`
3. Render with Quarto
4. Fix layout or rendering issues
5. Deploy generated output to `gh-pages`

## Local Development

Render locally:

```bat
cd /d C:\Users\smkge\Develop\smkgenesis.github.io\main
"C:\Users\smkge\AppData\Local\Programs\Quarto\bin\quarto.exe" render
```

Preview locally:

```bat
cd /d C:\Users\smkge\Develop\smkgenesis.github.io\main
"C:\Users\smkge\AppData\Local\Programs\Quarto\bin\quarto.exe" preview
```

## Deployment

Deployment is handled by rendering `main/_site` and mirroring it into the standalone `gh-pages` worktree.

Typical flow:
1. push `main`
2. render Quarto output
3. mirror `_site/` into `gh-pages/`
4. commit and push `gh-pages`

## License

Code, styles, scripts, and site infrastructure are licensed under the MIT License.

Article content is licensed separately under Creative Commons Attribution 4.0 International (CC BY 4.0), unless otherwise noted.

See:
- [`LICENSE`](./LICENSE)
- [`CONTENT_LICENSE.md`](./CONTENT_LICENSE.md)
