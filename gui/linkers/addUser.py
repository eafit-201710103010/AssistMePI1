import sys

nombreUsuario = sys.argv[1]
password = sys.argv[2]
permisosUsuario = sys.argv[3]

file = open("usuarios.txt","a")
file.write(str(nombreUsuario) + "," + str(password) + "," + str(permisosUsuario))
file.write("\n")
print("usuario agregado")
file.close()