"""Srcipt used to check if someone is in the "Database".
Searches if the number entered belongs to the code or identity document of any person, if so, prints true, otherwise prints false
"""

import sys

numero = sys.argv[1]

file = open("personasEventos.txt","r")

found=False
lineas = file.readlines()
for persona in lineas:
   
    datos_persona = persona.split(",")
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
else:
    print("false")

file.close()