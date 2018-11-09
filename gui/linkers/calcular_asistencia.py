import sys

nombre_evento = sys.argv[1]

nombre_archivo = "Estadisticas_"+nombre_evento+".txt"
cont_ausentes = 0
cont_asistentes = 0

with open(nombre_archivo, "r") as file:
  lineas = file.readlines()
  for persona in lineas:
    datos_pesona = persona.split(",")
    asistencia = datos_pesona[7]
    if asistencia == "true":
      cont_asistentes += 1
    else:
      cont_ausentes += 1

print(cont_ausentes)
print(cont_asistentes)