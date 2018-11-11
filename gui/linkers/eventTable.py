""" Get all the events data from a text file """

# Open file that stores all the users and read it
file = open("eventos.txt","r")

# Read each line from the file
lineas = file.readlines()

# For each event in the file sends it's information to the javascript 
for evento in lineas:
    datos_evento = evento.split(",")
    for dato in datos_evento:
        print(dato)

file.close()
