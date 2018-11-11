""" Store in a text file all the event statistics information """

# Import dependencies to access to the data
import sys

# Get lists containing the assistants information
seriales = sys.argv[1]
nombres = sys.argv[2]
codigos = sys.argv[3]
documentos = sys.argv[4]
ocupaciones = sys.argv[5]
edades = sys.argv[6]
sexos = sys.argv[7]
asistentes = sys.argv[8]
nombre_evento = sys.argv[9]

# File where the statistics information is stored
fileName = "Estadisticas_" + nombre_evento + ".txt"

# Open file and append the assistants information
file = open(fileName,"a")

lista_documentos = documentos.split(",")
lista_seriales = seriales.split(",")
lista_nombres = nombres.split(",")
lista_codigos = codigos.split(",")
lista_ocupaciones = ocupaciones.split(",")
lista_edades = edades.split(",")
lista_sexos = sexos.split(",")
lista_asistentes = asistentes.split(",")

lon = len(lista_documentos)

# Write on the file the assistants information separated by commas
for evento in range(lon):
  file.write(lista_seriales[evento] + "," + lista_nombres[evento] + "," + lista_codigos[evento] + "," + lista_documentos[evento] + "," + lista_ocupaciones[evento] + "," + lista_edades[evento] + "," + lista_sexos[evento] + "," + lista_asistentes[evento] + ",") # A comma needs to be added at the end of each line so that the last value can be accessed
  file.write("\n")

# Send a response so that the client knows the information was successfully downloaded
print("estadisticas descargadas exitosamente")

file.close()