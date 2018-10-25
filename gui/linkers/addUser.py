import sys

nombreUsuario = sys.argv[1]
ocupacionUsuario = sys.argv[2]

file = open("usuarios.txt","a")
file.write(str(nombreUsuario) + "," + str(ocupacionUsuario))
file.write("\n")
print("usuario agregado")
file.close()