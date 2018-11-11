""" Script used to calculate the number of men and women that assisted to the event """

# Import dependencies to access to the data
import sys

nombre_evento = sys.argv[1]

# File where the event statistics are stored
nombre_archivo = "Estadisticas_"+nombre_evento+".txt"

cont_mujer = 0
cont_hombre = 0

# Open file and read it line by line
with open(nombre_archivo, "r") as file:
  lineas = file.readlines()
  # For each person in the file check its gender
  for persona in lineas:
    datos_pesona = persona.split(",")
    sexo = datos_pesona[6]
    if sexo == "mujer": # If the person is a woman add one to cont_mujer
      cont_mujer += 1
    elif sexo == "hombre": # If the person is a man add one to cont_hombre
      cont_hombre += 1

print(cont_hombre) # Send the number of men that assisted to the event
print(cont_mujer) # Send the number of women that assisted to the event