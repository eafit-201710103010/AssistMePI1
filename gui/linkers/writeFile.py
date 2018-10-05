"""Srcipt used to add someone to the "Database".

It adds the serial ID, name, code, ID, age and gender of every person to the "Database".
"""

import sys

serial_id = sys.argv[1]
nombre = sys.argv[2]
codigo = sys.argv[3]
doc_identidad = sys.argv[4]
ocupacion = sys.argv[5]
edad = sys.argv[6]
sexo = sys.argv[7]

 
file = open("personasEventos.txt","a")  
file.write(str(serial_id) + "," + str(nombre) + "," + str(codigo) + "," + str(doc_identidad) + "," + str(ocupacion) + "," + str(edad) + "," + str(sexo)) 
file.write("\n")
print("registro_exitoso")
file.close()