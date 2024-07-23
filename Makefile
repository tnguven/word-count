build-js:
	pnpm run build

build-blob: build-js
	node --experimental-sea-config sea-config.json

create-cmd: build-blob
	cp $$(command -v node) dist/word

inject-blob: build-blob
	npx postject dist/word NODE_SEA_BLOB ./dist/word.blob --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2

