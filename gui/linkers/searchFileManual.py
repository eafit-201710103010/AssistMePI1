"""Srcipt used to check if someone is in the "Database".
Searches if the number entered belongs to the code or identity document of any person, if so, prints true, otherwise prints false
"""

import sys

numero = sys.argv[1]
evento = sys.argv[2]

fileName = "Asistentes_"+evento+".txt"

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
    
    
    
if found : 
    print("true")
    print(nombre)
else:
    print("false",nombre)

file.close()