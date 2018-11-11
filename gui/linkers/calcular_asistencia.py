""" Script used to calculate the number of people that assisted to the event and didn't """

# Import dependencies to access to the data
import sys

nombre_evento = sys.argv[1]

# File where the event statistics are stored
nombre_archivo = "Estadisticas_"+nombre_evento+".txt"

cont_ausentes = 0
cont_asistentes = 0

# Open file and read it line by line
with open(nombre_archivo, "r") as file:
  lineas = file.readlines()
  # For each person in the file check if assisted to the event of not
  for persona in lineas:
    datos_pesona = persona.split(",")
    asistencia = datos_pesona[7]
    if asistencia == "true": # If the person assisted add one to cont_asistentes
      cont_asistentes += 1
    else: # If the person didn't assist add one to cont_ausentes
      cont_ausentes += 1

print(cont_ausentes) # Send number of absent people to client
print(cont_asistentes) # Send number of assistants to client