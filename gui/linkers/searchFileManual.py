"""Srcipt used to check if someone is in the "Database".
Searches if the number entered belongs to the code or identity document of any person, if so, prints true, otherwise prints false
"""

import sys

numero = sys.argv[1]
evento = sys.argv[2]

fileName = "Asistentes_"+evento+".txt"
asistentes = evento+"_asistentes.txt"

file = open(fileName,"r")

found=False
lineas = file.readlines()
for persona in lineas:
   
    datos_persona = persona.split(",")
    nombre = datos_persona[1]
    codigo_almacenado = datos_persona[2]
    documento_almacenado = datos_persona[3]
    if codigo_almacenado == str(numero):
        found =True
        break 
    if documento_almacenado == str(numero):
        found = True
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