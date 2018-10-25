import sys
import os

nombreEvento = sys.argv[1]
fileName = "Asistentes_"+nombreEvento+".txt"

file = open("eventos.txt","r")

lineas = file.readlines()

eventos = []

for evento in lineas:
    datos_evento = evento.split(",")
    if datos_evento[0] != nombreEvento:
        eventos.append(evento)

file.close()

file = open("eventos.txt","w")

for evento in eventos:
    file.write(evento)

print("evento eliminado")

file.close()


os.remove(fileName)