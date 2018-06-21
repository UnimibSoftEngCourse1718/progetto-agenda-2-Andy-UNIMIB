# per la generazione del file HTML dell'applicazione

Agenda-OK.html:	Agenda-OK.php \
		Makefile
		php Agenda-OK.php > $@

clean:
		rm Agenda-OK.html
