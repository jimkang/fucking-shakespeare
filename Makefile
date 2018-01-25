HOMEDIR = $(shell pwd)
USER = bot
SERVER = smidgeo
SSHCMD = ssh $(USER)@$(SERVER)
PROJECTNAME = fucking-shakespeare
APPDIR = /opt/$(PROJECTNAME)

test:
	node tests/basictests.js

pushall: sync
	git push origin master

sync:
	rsync -a $(HOMEDIR) $(USER)@$(SERVER):/opt --exclude node_modules/
	$(SSHCMD) "cd $(APPDIR) && npm install"

template-offsets:
	node getfilelineoffsets.js data/shakespeare-pg100.txt > data/shakeslineoffsets.json

run-tumblr:
	node tools/post-to-tumblr.js

run-twitter:
	node tools/post-to-twitter.js

prettier:
	prettier --single-quote --write "**/*.js"
