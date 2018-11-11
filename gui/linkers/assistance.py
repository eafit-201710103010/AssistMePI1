""" Script used to store the people who enter the event """

# Import dependencies to access to the data
import sys

# Get data sent from the client
evento = sys.argv[1]
nombre = sys.argv[2]
doc_identidad = sys.argv[3]

# File where the entered people is stored
fileName = evento+"_asistentes.txt"

# Open file and write the information from the person entered
file = open(fileName,"a")
file.write(str(doc_identidad) + "," + str(nombre))
file.write("\n")

file.close()

