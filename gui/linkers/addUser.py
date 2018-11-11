""" Create a new user to add it to the database """

# Import dependencies to access to the data
import sys

# Get data sent from the client to create the new user
nombreUsuario = sys.argv[1]
permisosUsuario = sys.argv[2]

# Open file that stores all the users and adds the new data separated by commas at the end of the file
file = open("usuarios.txt","a")
file.write(str(nombreUsuario) + "," + str(permisosUsuario))
file.write("\n")

# Sends a response so that the client knows the user was successfully added
print("usuario agregado")
file.close()