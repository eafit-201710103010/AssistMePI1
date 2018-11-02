"""Srcipt used to check if someone is in the "Database".

It looks at every person in the "Database" and says if it is in it or not.
"""

import sys

serial_id = sys.argv[1]
evento = sys.argv[2]

fileName = "Asistentes_"+evento+".txt"
asistentes = evento+"_asistentes.txt"

file = open(fileName,"r")

found = False
lineas = file.readlines()

for persona in lineas:

  datos_persona = persona.split(",")
  serial_almacenado = datos_persona[0]
    
  if serial_almacenado == str(serial_id):
    found =True
    nombre = datos_persona[1]
    documento_almacenado = datos_persona[4]
    break 

file.close()

file = open(asistentes,"a")
file.close()

file = open(asistentes,"r")

asistio = False
lineas = file.readlines()
for persona in lineas:
  datos_persona = persona.split(",")
  doc_identidad = datos_persona[0]
  if doc_identidad == str(documento_almacenado):
    asistio = True
    break

if found and not asistio: 
    print("true")
    print("false")
    print(nombre)
    print(documento_almacenado)
elif found and asistio:
    print("true")
    print("true")
else:
    print("false")
    print("false")

file.close()