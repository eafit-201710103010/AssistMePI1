import sys

seriales = sys.argv[1]
nombres = sys.argv[2]
codigos = sys.argv[3]
documentos = sys.argv[4]
ocupaciones = sys.argv[5]
edades = sys.argv[6]
sexos = sys.argv[7]
asistentes = sys.argv[8]
nombre_evento = sys.argv[9]

fileName = "Estadisticas_" + nombre_evento + ".txt"

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

for evento in range(lon):
  file.write(lista_seriales[evento] + "," + lista_nombres[evento] + "," + lista_codigos[evento] + "," + lista_documentos[evento] + "," + lista_ocupaciones[evento] + "," + lista_edades[evento] + "," + lista_sexos[evento] + lista_asistentes[evento] + ",")
  file.write("\n")

print("estadisticas descargadas exitosamente")

file.close()