import sys

nombreEvento = sys.argv[1]
lugarEvento = sys.argv[2]
fechaEvento = sys.argv[3]

file = open("eventos.txt","a")
file.write(str(nombreEvento) + "," + str(lugarEvento) + "," + str(fechaEvento))
file.write("\n")
print("evento creado")
file.close()

nameFile = "Asistentes_"+nombreEvento+".txt"
file = open(nameFile, "w+")

file.close()