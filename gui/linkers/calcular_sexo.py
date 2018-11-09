import sys

nombre_evento = sys.argv[1]

nombre_archivo = "Estadisticas_"+nombre_evento+".txt"
cont_mujer = 0
cont_hombre = 0

with open(nombre_archivo, "r") as file:
  lineas = file.readlines()
  for persona in lineas:
    datos_pesona = persona.split(",")
    sexo = datos_pesona[6]
    if sexo == "mujer":
      cont_mujer += 1
    elif sexo == "hombre":
      cont_hombre += 1

print(cont_hombre)
print(cont_mujer)