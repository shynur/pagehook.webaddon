SHELL = /bin/bash -O globstar

.PHONY: all
all:

.PHONY: clean
clean:
	rm -f   ./**/?*~
	rm -f  ./**/.?*~
	rm -f   ./**/\#?*\#
	rm -f  ./**/.\#?*

%/:
	mkdir -p $@
	-chmod -R a+rwx $@

FORCE:
