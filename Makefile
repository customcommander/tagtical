SRC_FILES = $(shell find src -type f -name '*.js')
DIST_FILES = $(SRC_FILES:src/%=dist/%)
JSDOC_TMPL_DIR = doc/jsdoc-template

all: README.md
clean:; rm -rfv build dist

dist: $(DIST_FILES)

dist/%.js: src/%.js
	mkdir -p $(@D)
	java -jar /workspaces/closure-compiler/compiler.jar \
		--compilation_level=SIMPLE_OPTIMIZATIONS \
		--language_in=ECMASCRIPT_2015 \
		--language_out=ECMASCRIPT_2015 \
		--js=$^ \
		--js_output_file=$@


build/jsdoc-data.json: $(filter-out src/index.js src/utils/%.js,$(SRC_FILES))
	mkdir -p $(@D)
	yarn -s jsdoc -t $(JSDOC_TMPL_DIR) $^ >$@

README.md: build/jsdoc-data.json doc src
	yarn -s mustache $< -p doc/api.mustache doc/README.mustache >$@
