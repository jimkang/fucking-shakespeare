HOMEDIR = $(shell pwd)
GITDIR = /var/repos/fucking-shakespeare.git
PM2 = $(HOMEDIR)/node_modules/pm2/bin/pm2

test:
	node tests/basictests.js

start: start-fucking-shakespeare
	$(PM2) start fucking-shakespeare.js --name fucking-shakespeare

stop:
	$(PM2) stop fucking-shakespeare || echo "Didn't need to stop process."

list:
	$(PM2) list

sync-worktree-to-git:
	git --work-tree=$(HOMEDIR) --git-dir=$(GITDIR) checkout -f

npm-install:
	cd $(HOMEDIR)
	npm install
	npm prune

post-receive: sync-worktree-to-git npm-install stop start

template-offsets:
	node getfilelineoffsets.js data/shakespeare-pg100.txt > data/shakeslineoffsets.json
