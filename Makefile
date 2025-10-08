SHELL = /bin/bash -O globstar

.PHONY: all
all: FORCE | dist/
	tsc

.PHONY: clean
clean:
	rm -f   ./**/?*~
	rm -f  ./**/.?*~
	rm -f   ./**/\#?*\#
	rm -f  ./**/.\#?*
	rm -rf dist

%/:
	mkdir -p $@
	-chmod -R a+rwx $@

FORCE:

.PHONY: git-push
git-push:
	git add .
	GIT_EDITOR='/snap/bin/emacs -nw' git commit --verbose
	chmod u+r ~/.git-credentials
	git push
	chmod a-rx ~/.git-credentials
