import sys

nombreUsuario = sys.argv[1]

file = open("usuarios.txt","r")

lineas = file.readlines()

usuarios = []

for usuario in lineas:
    datos_usuario = usuario.split(",")
    if datos_usuario[0] != nombreUsuario:
        usuarios.append(usuario)

file.close()

file = open("usuarios.txt","w")

for usuario in usuarios:
    file.write(usuario)

print("usuario eliminado")

file.close()
