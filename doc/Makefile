# per la generazione del file HTML dell'applicazione
MATRICOLA = 806765

OOD2PDF :=	soffice --headless --convert-to pdf:writer_pdf_Export -env:UserInstallation=file:///tmp/LibreOffice_Conversion_andy --outdir .

.odp.pdf:
		$(OOD2PDF) "$<"
		# cp $@ ../delivery

.odt.pdf:
		$(OOD2PDF) "$<"
		# cp $@ ../delivery

FN1		:= Istruzioni\ per\ Installazione
FN2		:= Presentazione\ del\ Progetto

all:		$(FN1).pdf $(FN2).pdf
		cp *.pdf ../delivery/doc

$(FN1).pdf:	$(FN1).odt
		$(OOD2PDF) "$<"

$(FN2).pdf:	$(FN2).odp
		$(OOD2PDF) "$<"

clean:
		rm -f *.pdf
