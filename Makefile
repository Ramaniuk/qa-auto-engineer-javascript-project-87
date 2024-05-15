install:
	npm install

start: 
	node bin/gendiff.js

publish:
	npm publish --dry-runs

lint:
	npx eslint .

test:
    NODE_OPTIONS=--experimental-vm-modules npx jest --watch --coverage