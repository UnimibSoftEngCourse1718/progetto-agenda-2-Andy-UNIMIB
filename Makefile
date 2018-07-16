# per la generazione del file HTML dell'applicazione
MATRICOLA = 806765

TOPTARGETS :=	app all clean sonar tests

SUBDIRS :=	doc

$(TOPTARGETS):	$(SUBDIRS)

$(SUBDIRS):
		$(MAKE) -C $@ $(MAKECMDGOALS)

app:		Agenda-OK.html

all:		app $(SUBDIRS) tests sonar
		cd doc; make all

clean:
		rm -f Agenda-OK.html
		rm -f delivery/doc/*
		cd doc; make clean

tests:
		touch tests/coverage-test-report.xml

sonar:
		~/bin/sonar-scanner-3.2.0.1227-linux/bin/sonar-scanner

distrib:
		cp *.html *.css *.js delivery
		cp -r lib delivery
		cp README INSTALL LICENSE RELEASE_NOTES.txt delivery
		cp Makefile sonar.properties delivery
		cp doc/*.pdf delivery/doc

Agenda-OK.html:	Agenda-OK.php \
		Makefile
		php Agenda-OK.php > $@
