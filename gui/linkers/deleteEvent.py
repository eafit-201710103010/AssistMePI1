""" Delete a event from the text file where all the events are stored """

# Import dependencies to access to the data and read files
import sys
import os

# Get data sent from the client to delete the event given
nombreEvento = sys.argv[1]
# Files to delete once the event is deleted
archivo_registro = "Asistentes_"+nombreEvento+".txt"
archivo_asistentes = nombreEvento+"_asistentes.txt"
archivo_estadisticas = "Estadisticas_"+nombreEvento+".txt"

# Open file that stores all the events and reads it line by line
file = open("eventos.txt","r")

lineas = file.readlines()

# Add to a list all the events that won't be deleted
eventos = []

for evento in lineas:
    datos_evento = evento.split(",")
    if datos_evento[0] != nombreEvento:
        eventos.append(evento)

file.close()

# Open the file that stores all the events and overwrite on it al the events except the one that wants to be deleted
file = open("eventos.txt","w")

for evento in eventos:
    file.write(evento)

print("evento eliminado")

file.close()

# Remove all the files linked to the deleted event
os.remove(archivo_registro)
os.remove(archivo_asistentes)
os.remove(archivo_estadisticas)