HOMEDIR = $(shell pwd)
GITDIR = /var/repos/fucking-shakespeare.git

test:
	node tests/basictests.js

sync-worktree-to-git:
	git --work-tree=$(HOMEDIR) --git-dir=$(GITDIR) checkout -f

npm-install:
	cd $(HOMEDIR)
	npm install
	npm prune

post-receive: sync-worktree-to-git npm-install

template-offsets:
	node getfilelineoffsets.js data/shakespeare-pg100.txt > data/shakeslineoffsets.json

run-tumblr:
	node tools/post-to-tumblr.js
