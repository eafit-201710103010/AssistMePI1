""" Get all the downloaded events data from a text file """

# Import dependencies to read files
import os

# Open file that stores all the events and read it line by line
file = open("eventos.txt","r")

lineas = file.readlines()

# For each event in the file checks if the registered people information has been downloaded
for evento in lineas:
    datos_evento = evento.split(",")
    # File where the registerd people should be stored
    checkFile = "Asistentes_"+datos_evento[0]+".txt"

    # If the file is not empty send the event data to the javascript to be added to the table
    if os.stat(checkFile).st_size != 0:
        for dato in datos_evento:
            print(dato)

file.close()