""" Get all the users data from a text file """

# Open file that stores all the users and read it
file = open("usuarios.txt","r")

# Read each line from the file
lineas = file.readlines()

# For each user in the file sends it's information to the javascript 
for usuario in lineas:
    datos_usuario = usuario.split(",")
        print(dato)

file.close()