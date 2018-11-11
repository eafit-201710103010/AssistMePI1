""" Script used to calculate the number of people that are younger than 18, 18 to 25, 25 to 35, 35 to 45, 45 to 55 or older than 55 years old """

# Import dependencies to access to the data
import sys

nombre_evento = sys.argv[1]

# File where the event statistics are stored
nombre_archivo = "Estadisticas_"+nombre_evento+".txt"

cont_menor_18 = 0
cont_18_25 = 0
cont_25_35 = 0
cont_35_45 = 0
cont_45_55 = 0
cont_mayor_55 = 0

# Open file and read it line by line
with open(nombre_archivo,"r") as file:
  lineas = file.readlines()
  # For each person in the file check its age
  for persona in lineas:
    datos_persona = persona.split(",")
    edad = datos_persona[5]
    edad = int(edad)
    if edad < 18: # if the person is younger than 18 years old add one to cont_menor_18
      cont_menor_18 += 1
    elif edad >= 18 and edad < 25: # if the person is from 18 to 25 years old add one to cont_18_25
      cont_18_25 += 1
    elif edad >= 25 and edad < 35: # if the person is from 25 to 35 years old add one to cont_25_35
      cont_25_35 += 1
    elif edad >= 35 and edad < 45: # if the person is from 35 to 45 years old add one to cont_35_45
      cont_35_45 += 1
    elif edad >= 45 and edad < 55: # if the person is from 45 to 55 years old add one to cont_45_55
      cont_45_55 += 1
    else: # if the person is older than 55 years old add one to cont_mayor_55
      cont_mayor_55 += 1   

print(cont_menor_18) # Send number of people that are younger than 18 years old
print(cont_18_25) # Send number of people that are from 18 to 25 years old
print(cont_25_35) # Send number of people that are from 25 to 35 years old
print(cont_35_45) # Send number of people that are from 35 to 45 years old
print(cont_45_55) # Send number of people that are from 45 to 55 years old
print(cont_mayor_55) # Send number of people that are older than 55 years old
