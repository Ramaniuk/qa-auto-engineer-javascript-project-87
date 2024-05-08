install:
	npm install

start: 
	node bin/gendiff.js

publish:
	npm publish --dry-runs

lint:
	npx eslint .