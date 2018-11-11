""" Delete a user from the text file where all the users are stored """

# Import dependencies to access to the data
import sys

# Get data sent from the client to delete the username given
nombreUsuario = sys.argv[1]

# Open file that stores all the users and read it
file = open("usuarios.txt","r")

lineas = file.readlines()

# Add to a list all the users that won't be deleted
usuarios = []

for usuario in lineas:
    datos_usuario = usuario.split(",")
    if datos_usuario[0] != nombreUsuario:
        usuarios.append(usuario)

file.close()

# Open the file that stores all the users and overwrite on it al the users except the one that wants to be deleted
file = open("usuarios.txt","w")

for usuario in usuarios:
    file.write(usuario)

# Send a response so that the client knows the user was successfully deleted
print("usuario eliminado")

file.close()
