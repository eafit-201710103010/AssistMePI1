""" Script used to store all the users locally in a text file """

# Import dependencies to access to the data
import sys

# Get data sent from the client to store all the users
nombres = sys.argv[1]
permisos = sys.argv[2]

# Open file where all the users are locally stored and erase everything on it
file = open("usuarios.txt","r+")
file.truncate(0)
file.close()

# Open file where all the users will be locally stored
file = open("usuarios.txt","a")

# Get a list of names and permissions from each user
lista_nombres = nombres.split(",")
lista_permisos = permisos.split(",")

lon = len(lista_nombres)
# For each username add to the text file the user information
for usuario in range(lon):
  file.write(lista_nombres[usuario]+","+lista_permisos[usuario])
  file.write("\n")

print("Usuarios añadidos exitosamente")

file.close()