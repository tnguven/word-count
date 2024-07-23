build-js:
	pnpm run build

build-blob: build-js
	node --experimental-sea-config sea-config.json

# Create a copy of the node executable and name it according to your needs:
create-cmd: build-blob
	cp $$(command -v node) dist/word

inject-blob: create-cmd
	npx postject dist/word NODE_SEA_BLOB ./dist/word.blob \
    --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2

on-macos:
	codesign --remove-signature dist/word
