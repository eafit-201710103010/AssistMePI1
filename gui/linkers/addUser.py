import sys

nombreUsuario = sys.argv[1]
permisosUsuario = sys.argv[2]

file = open("usuarios.txt","a")
file.write(str(nombreUsuario) + "," + str(permisosUsuario))
file.write("\n")
print("usuario agregado")
file.close()