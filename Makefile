# per la generazione del file HTML dell'applicazione
MATRICOLA = 806765

TOPTARGETS :=	all clean

SUBDIRS :=	doc

$(TOPTARGETS):	$(SUBDIRS)

$(SUBDIRS):
		$(MAKE) -C $@ $(MAKECMDGOALS)

all:		Agenda-OK.html $(SUBDIRS)
		cd doc; make all

clean:
		rm -f Agenda-OK.html
		rm -f delivery/doc/*
		cd doc; make clean

Agenda-OK.html:	Agenda-OK.php \
		Makefile
		php Agenda-OK.php > $@
