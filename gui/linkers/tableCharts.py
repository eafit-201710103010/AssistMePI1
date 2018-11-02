import sys
import os

file = open("eventos.txt","r")

lineas = file.readlines()

for evento in lineas:
    datos_evento = evento.split(",")
    checkFile = "Asistentes_"+datos_evento[0]+".txt"

    if os.stat(checkFile).st_size != 0:
        for dato in datos_evento:
            print(dato)

file.close()