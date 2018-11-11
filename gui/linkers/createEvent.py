""" Create a new event to add it to the database """

# Import dependencies to access to the data
import sys

# Get data sent from the client to create the new event
nombreEvento = sys.argv[1]
lugarEvento = sys.argv[2]
fechaEvento = sys.argv[3]

# Open file that stores all the events and adds the new data separated by commas at the end of the file
file = open("eventos.txt","a")
file.write(str(nombreEvento) + "," + str(lugarEvento) + "," + str(fechaEvento))
file.write("\n")
print("evento creado")
file.close()

# Creates a file to store the registered people for the event
archivo_evento = "Asistentes_"+nombreEvento+".txt"
file = open(archivo_evento, "w+")

file.close()

# Creates a file to store the statistics for the event
archivo_estadisticas = "Estadisticas_"+nombreEvento+".txt"
file = open(archivo_estadisticas, "w+")

file.close()

# Creates a file to store the assistance information for the event
archivo_asistentes = nombreEvento+"_asistentes.txt"
file = open(archivo_asistentes, "w+")

file.close()