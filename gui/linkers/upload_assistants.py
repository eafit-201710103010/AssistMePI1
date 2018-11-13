""" Script used to upload the assistants to an event in the database """

# Import dependencies to access to the data and send requests to the server
import sys
import requests
import time

# Get data sent from the client
nombre_evento = sys.argv[1]

# File where the entered people is stored
file_name = nombre_evento + "_asistentes.txt"

# Open file and read it line by line
file = open(file_name,"r")
lineas = file.readlines()

# For each assistant in the file send its information to the server to be stored in the database
for asistente in lineas:
  datos_asistente = asistente.split(",")
  doc_identidad = datos_asistente[0]
  r = requests.put('http://assistmeserver.herokuapp.com/upload_event/{0}/{1}'.format(nombre_evento, doc_identidad))

print("asistentes guardados")

file.close()