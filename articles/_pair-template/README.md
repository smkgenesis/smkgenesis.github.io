# Article Pair Template

Each article is treated as a language pair.

Structure:

```text
articles/
  article-slug/
    en.qmd
    ko.qmd
```

Rules:
- `en.qmd` and `ko.qmd` are the canonical source files.
- Both files must include the language toggle near the top.
- The `en.qmd` file is the default source used by the main article listing.
- The `ko.qmd` file is the Korean counterpart for the same article.