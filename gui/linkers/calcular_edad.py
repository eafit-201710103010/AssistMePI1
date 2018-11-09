import sys

nombre_evento = sys.argv[1]

nombre_archivo = "Estadisticas_"+nombre_evento+".txt"
cont_menor_18 = 0
cont_18_25 = 0
cont_25_35 = 0
cont_35_45 = 0
cont_45_55 = 0
cont_mayor_55 = 0

with open(nombre_archivo,"r") as file:
  lineas = file.readlines()
  for persona in lineas:
    datos_persona = persona.split(",")
    edad = datos_persona[5]
    edad = int(edad)
    if edad < 18:
      cont_menor_18 += 1
    elif edad >= 18 and edad < 25:
      cont_18_25 += 1
    elif edad >= 25 and edad < 35:
      cont_25_35 += 1
    elif edad >= 35 and edad < 45:
      cont_35_45 += 1
    elif edad >= 45 and edad < 55:
      cont_45_55 += 1
    else:
      cont_mayor_55 += 1   

print(cont_menor_18)
print(cont_18_25)
print(cont_25_35)
print(cont_35_45)
print(cont_45_55)
print(cont_mayor_55)
