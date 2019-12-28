SRC_FILES = $(shell find src -type f -not -name '*.test.js' -maxdepth 1)
JSDOC_TMPL_DIR = src/doc/jsdoc-template

all: README.md
clean:; rm -rfv build

build/jsdoc-data.json: $(SRC_FILES)
	mkdir -p $(@D)
	yarn -s jsdoc -t $(JSDOC_TMPL_DIR) $^ >$@

README.md: build/jsdoc-data.json src/doc
	yarn -s mustache $< -p src/doc/api.mustache src/doc/README.mustache >$@