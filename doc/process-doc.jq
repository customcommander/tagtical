  map
    ( select(.name == "exports" or .kind == "typedef")
    )
| group_by(.meta.filename)
| map
    ( { tag:
            .[0].meta.filename
          | split(".")
          | .[0]
      , blurb:
            .[]
          | select(.name == "exports")
          | .description
          | split("\n")
          | .[0]
      , description:
            .[]
          | select(.name == "exports")
          | .description
          | split("\n")
          | .[1:]
          | join("\n")
      , has_opts:
            [.[] | select(.kind == "typedef")]
          | (length > 0)
      , opts:
            [   .[]
              | select(.kind == "typedef")
              | .properties
              | map
                  ( { type: .type.names | join(", ")
                    , name
                    , optional
                    , defaultvalue
                    , description
                    }
                  )
              
            ]
          | flatten
      }
    )