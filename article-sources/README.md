# Article Sources

This directory stores raw source material separately from publishable QMD articles.

Structure:

```text
article-sources/
  article-slug/
    source.en.md
    source.ko.md
```

Rules:
- Raw source is preserved here as input data.
- Publishable articles live under `articles/<slug>/en.qmd` and `articles/<slug>/ko.qmd`.
- The article listing should index only the publishable `en.qmd` files.