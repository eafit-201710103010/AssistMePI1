import sys
import requests
import time

nombre_evento = sys.argv[1]

file_name = nombre_evento + "_asistentes.txt"

file = open(file_name,"r")
lineas = file.readlines()

for asistente in lineas:
  datos_asistente = asistente.split(",")
  doc_identidad = datos_asistente[0]
  r = requests.put('http://localhost:5000/upload_event/{0}/{1}'.format(nombre_evento, doc_identidad))

print("asistentes guardados")

file.close()