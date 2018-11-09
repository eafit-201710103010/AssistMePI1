import sys

seriales = sys.argv[1]
nombres = sys.argv[2]
codigos = sys.argv[3]
documentos = sys.argv[4]
nombre_evento = sys.argv[5]

fileName = "Asistentes_" + nombre_evento + ".txt"

file = open(fileName,"a")

lista_documentos = documentos.split(",")
lista_seriales = seriales.split(",")
lista_nombres = nombres.split(",")
lista_codigos = codigos.split(",")

lon = len(lista_documentos)

for evento in range(lon):
  file.write(lista_seriales[evento] + "," + lista_nombres[evento] + "," + lista_codigos[evento] + "," + lista_documentos[evento] + ",")
  file.write("\n")

print("Asistentes descargados exitosamente")

file.close()