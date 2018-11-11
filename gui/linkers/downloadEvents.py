""" Store in a text file all the registered people's information """

# Import dependencies to access to the data
import sys

# Get a list of the serial number, names, and ids registered to certain event
seriales = sys.argv[1]
nombres = sys.argv[2]
codigos = sys.argv[3]
documentos = sys.argv[4]
nombre_evento = sys.argv[5]

# File that stores the registered people
fileName = "Asistentes_" + nombre_evento + ".txt"

# Open file and append the registered information
file = open(fileName,"a")

lista_documentos = documentos.split(",")
lista_seriales = seriales.split(",")
lista_nombres = nombres.split(",")
lista_codigos = codigos.split(",")

lon = len(lista_documentos)

# Write on the file the registerd information separated by commas
for evento in range(lon):
  file.write(lista_seriales[evento] + "," + lista_nombres[evento] + "," + lista_codigos[evento] + "," + lista_documentos[evento] + ",") # A comma needs to be added at the end of each line so that the last value can be accessed
  file.write("\n")

# Send a response so that the client knows the information was successfully downloaded
print("Asistentes descargados exitosamente")

file.close()