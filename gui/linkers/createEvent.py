import sys

nombreEvento = sys.argv[1]
lugarEvento = sys.argv[2]
fechaEvento = sys.argv[3]

file = open("eventos.txt","a")
file.write(str(nombreEvento) + "," + str(lugarEvento) + "," + str(fechaEvento))
file.write("\n")
print("evento creado")
file.close()

archivo_evento = "Asistentes_"+nombreEvento+".txt"
file = open(archivo_evento, "w+")

file.close()

archivo_estadisticas = "Estadisticas_"+nombreEvento+".txt"
file = open(archivo_estadisticas, "w+")

file.close()

archivo_asistentes = nombreEvento+"_asistentes.txt"
file = open(archivo_asistentes, "w+")

file.close()