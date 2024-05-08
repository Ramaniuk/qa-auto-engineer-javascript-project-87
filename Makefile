start: 
	node gendiff.js

publish:
	npm publish --dry-runs

lint:
	npx eslint .