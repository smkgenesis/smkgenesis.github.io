# smkgenesis.github.io

Personal technical blog built with Quarto.

This repository contains:
- site source under [main](/C:/Users/smkge/Develop/smkgenesis.github.io/main)
- deployed output under [gh-pages](/C:/Users/smkge/Develop/smkgenesis.github.io/gh-pages)
- EN/KO paired articles
- a component-based article assembly workflow

## Structure

```text
main/
  articles/
    article-slug/
      en.qmd
      ko.qmd
  styles/
  _writing/

gh-pages/
```

## Writing Model

Articles are treated as EN/KO pairs:

```text
articles/
  article-slug/
    en.qmd
    ko.qmd
```

Raw source text is assembled into publishable articles using reusable components such as:
- `highlight-box`
- `workflow-pipeline`
- `text-diagram`
- `repository-card`

The operating rules live in:
- [assembly-manual.md](/C:/Users/smkge/Develop/smkgenesis.github.io/main/_writing/assembly-manual.md)
- [posting-workflow.md](/C:/Users/smkge/Develop/smkgenesis.github.io/main/_writing/posting-workflow.md)
- [component-cookbook.md](/C:/Users/smkge/Develop/smkgenesis.github.io/main/_writing/component-cookbook.md)

## Local Workflow

1. Edit source in `main/`
2. Render with Quarto
3. Mirror `_site/` into `gh-pages/`
4. Push `main` and `gh-pages`

## License

Code, styles, and site infrastructure in this repository are licensed under the MIT License.

Article content is licensed separately under Creative Commons Attribution 4.0 International (CC BY 4.0), unless otherwise noted.

See:
- [LICENSE](/C:/Users/smkge/Develop/smkgenesis.github.io/LICENSE)
- [CONTENT_LICENSE.md](/C:/Users/smkge/Develop/smkgenesis.github.io/CONTENT_LICENSE.md)
