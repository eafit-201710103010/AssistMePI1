""" Script used to calculate the number of people for each occupation """

# Import dependencies to access to the data
import sys

nombre_evento = sys.argv[1]

# File where the event statistics are stored
nombre_archivo = "Estadisticas_"+nombre_evento+".txt"

cont_Administracion_de_negocios = 0
cont_Bioligia = 0
cont_Ciencias_politicas = 0
cont_Comunicacion_social = 0
cont_Contaduria_publica = 0
cont_Derecho = 0
cont_Economia = 0
cont_Estudiante = 0
cont_Finanzas = 0
cont_Geologia = 0
cont_Ing_Civil = 0
cont_Ing_de_Diseño_de_producto = 0
cont_Ing_Fisica = 0
cont_Ing_Matematica = 0
cont_Ing_Mecanica = 0
cont_Ing_de_Procesos = 0
cont_Ing_de_Produccion = 0
cont_Ing_de_Sistemas = 0
cont_Literatura = 0
cont_Mercadeo = 0
cont_Musica = 0
cont_Negocios_Internacionales = 0
cont_Psicologia = 0

# Open file and read it line by line
with open(nombre_archivo, "r") as file:
  lineas = file.readlines()
  # For each person in the file check its occupation and add one to each cont depending the persons occupation
  for persona in lineas:
    datos_pesona = persona.split(",")
    ocupacion = datos_pesona[4]
    if ocupacion == "Administracion de negocios":
      cont_Administracion_de_negocios += 1
    elif ocupacion == "Bioligia":
      cont_Bioligia += 1
    elif ocupacion == "Ciencias politicas":
      cont_Ciencias_politicas += 1
    elif ocupacion == "Comunicacion social":
      cont_Comunicacion_social += 1
    elif ocupacion == "Contaduria publica":
      cont_Contaduria_publica += 1
    elif ocupacion == "Derecho":
      cont_Derecho += 1
    elif ocupacion == "Economia":
      cont_Economia += 1
    elif ocupacion == "Estudiante":
      cont_Estudiante += 1
    elif ocupacion == "Finanzas":
      cont_Finanzas += 1
    elif ocupacion == "Ing. Civil":
      cont_Ing_Civil += 1
    elif ocupacion == "Ing. de Diseño de producto":
      cont_Ing_de_Diseño_de_producto += 1
    elif ocupacion == "Ing. Fisica":
      cont_Ing_Fisica += 1
    elif ocupacion == "Ing. Matematica":
      cont_Ing_Matematica += 1
    elif ocupacion == "Ing. Mecanica":
      cont_Ing_Mecanica += 1
    elif ocupacion == "Ing. de Procesos":
      cont_Ing_de_Procesos += 1
    elif ocupacion == "Ing. de Produccion":
      cont_Ing_de_Produccion += 1
    elif ocupacion == "Ing. de Sistemas":
      cont_Ing_de_Sistemas += 1
    elif ocupacion == "Literatura":
      cont_Literatura += 1
    elif ocupacion == "Mercadeo":
      cont_Mercadeo += 1
    elif ocupacion == "Musica":
      cont_Musica += 1
    elif ocupacion == "Negocios Internacionales":
      cont_Negocios_Internacionales += 1
    elif ocupacion == "Psicologia":
      cont_Psicologia += 1

# Send the number of people from each occupation
print(cont_Administracion_de_negocios)
print(cont_Bioligia)
print(cont_Ciencias_politicas)
print(cont_Comunicacion_social)
print(cont_Contaduria_publica)
print(cont_Derecho)
print(cont_Economia)
print(cont_Estudiante)
print(cont_Finanzas)
print(cont_Geologia)
print(cont_Ing_Civil)
print(cont_Ing_de_Diseño_de_producto)
print(cont_Ing_Fisica)
print(cont_Ing_Matematica)
print(cont_Ing_Mecanica)
print(cont_Ing_de_Procesos)
print(cont_Ing_de_Produccion)
print(cont_Ing_de_Sistemas)
print(cont_Literatura)
print(cont_Mercadeo)
print(cont_Musica)
print(cont_Negocios_Internacionales)
print(cont_Psicologia)