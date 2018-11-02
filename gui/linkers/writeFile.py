"""Srcipt used to add someone to the "Database".

It adds the serial ID, name, code, ID, age and gender of every person to the "Database".
"""

import sys

evento = sys.argv[1]
serial_id = sys.argv[2]
nombre = sys.argv[3]
codigo = sys.argv[4]
doc_identidad = sys.argv[5]
ocupacion = sys.argv[6]
edad = sys.argv[7]
sexo = sys.argv[8]

fileName = "Asistentes_"+evento+".txt"

file = open(fileName,"a")  
file.write(str(serial_id) + "," + str(nombre) + "," + str(codigo) + "," + str(doc_identidad) + "," + str(ocupacion) + "," + str(edad) + "," + str(sexo)) 
file.write("\n")
print("registro_exitoso")
file.close()