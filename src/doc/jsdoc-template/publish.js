function get_tags() {
  return this.name === 'exports';
}

const get_tag_documentation = record => (
  { tag: record.meta.filename.split('.')[0]
  , blurb: record.description.split('\n')[0]
  , description: record.description
  }
);

const publish = db =>
  console.log
    ( JSON.stringify
        ( db(get_tags).get().map(get_tag_documentation)
        , null
        , 2
        )
    );

module.exports =
  { publish
  };