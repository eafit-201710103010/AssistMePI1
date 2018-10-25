import sys

file = open("usuarios.txt","r")

lineas = file.readlines()

for usuario in lineas:
    datos_usuario = usuario.split(",")
    for dato in datos_usuario:
        print(dato)

file.close()