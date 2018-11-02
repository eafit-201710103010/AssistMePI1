import sys

evento = sys.argv[1]
nombre = sys.argv[2]
doc_identidad = sys.argv[3]


fileName = evento+"_asistentes.txt"

file = open(fileName,"a")
file.write(str(doc_identidad) + "," + str(nombre))
file.write("\n")

file.close()

