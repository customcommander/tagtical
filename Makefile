SRC_FILES = $(shell find src -type f -name '*.js')
DIST_FILES = $(SRC_FILES:src/%=dist/%)

all: README.md
clean:; rm -rfv build dist

dist: $(DIST_FILES) dist/utils/l10n-data.json

dist/%.js: src/%.js
	mkdir -p $(@D)
	java -jar /devtools/closure-compiler/compiler.jar \
		--compilation_level=SIMPLE_OPTIMIZATIONS \
		--language_in=ECMASCRIPT_2018 \
		--language_out=ECMASCRIPT_2015 \
		--js=$^ \
		--js_output_file=$@

dist/utils/l10n-data.json: src/utils/l10n-data.json
	mkdir -p $(@D)
	cp $^ $@

build/doc-data.json: $(filter-out src/index.js src/utils/%.js src/types/%.js,$(SRC_FILES))
	mkdir -p $(@D)
	yarn -s jsdoc -X $^ | jq -f doc/process-doc.jq >$@

README.md: build/doc-data.json doc src
	yarn -s mustache $< -p doc/api.mustache doc/README.mustache >$@
