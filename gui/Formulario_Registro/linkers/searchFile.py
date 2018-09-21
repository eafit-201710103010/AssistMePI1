"""Srcipt used to check if someone is in the "Database".

It looks at every person in the "Database" and says if it is in it or not.
"""

import sys

serial_id = sys.argv[1]

file = open("personasEventos.txt","r")

found = False
lineas = file.readlines()

for persona in lineas:

  datos_persona = persona.split(",")
  serial_almacenado = datos_persona[0]
    
  if serial_almacenado == str(serial_id):
    found =True
    break 
    
if found : 
  print("true")
else:
  print("false")

file.close()