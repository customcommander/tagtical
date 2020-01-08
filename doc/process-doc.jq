  map
    ( select(.name == "exports")
    )
| map
    ( { tag: .meta.filename | split(".") | .[0]
      , blurb: .description | split("\n") | .[0]
      , description: .description | split("\n") | .[1:] | join("\n")
      }
    )