"""Srcipt used to check if someone is in the "Database".

It looks at every person in the "Database" and says if it is in it or not.
"""

# Import dependencies to access to the data
import sys

# Get data sent from the client
serial_id = sys.argv[1]
evento = sys.argv[2]

# File where the registered people is stored
fileName = "Asistentes_"+evento+".txt"
# File where the entered people is stored
asistentes = evento+"_asistentes.txt"

# Check if the person is in the database
file = open(fileName,"r")

found = False
lineas = file.readlines()

for persona in lineas:

  datos_persona = persona.split(",")
  serial_almacenado = datos_persona[0]
    
  if serial_almacenado == str(serial_id):
    found =True
    nombre = datos_persona[1]
    documento_almacenado = datos_persona[3]
    break 

file.close()

# Creates the assistance file in case it doesn't exist
file = open(asistentes,"a")
file.close()

# Check if the person has already entered the event
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