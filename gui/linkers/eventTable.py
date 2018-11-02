import sys

file = open("eventos.txt","r")

lineas = file.readlines()

for evento in lineas:
    datos_evento = evento.split(",")
    for dato in datos_evento:
        print(dato)

file.close()
