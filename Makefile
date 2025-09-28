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
