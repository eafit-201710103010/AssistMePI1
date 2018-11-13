""" Script used to store the events in a local text file """

# Import dependencies to access to the data
import sys

# Get data sent from the client to store all the events
nombres = sys.argv[1]
lugares = sys.argv[2]
fechas = sys.argv[3]

# Check if there's at least one event to be downloaded
if nombres is not "":
  # Open file where all the events are locally stored and erase everything on it
  file = open("eventos.txt","r+")
  file.truncate(0)
  file.close()

  # Open file where all the events will be locally stored
  file = open("eventos.txt","a")

  # Get a list of names, places and dates from each event
  lista_nombres = nombres.split(",")
  lista_lugares = lugares.split(",")
  lista_fechas = fechas.split(",")

  lon = len(lista_nombres)

  # For each event add to the text file the event information
  for evento in range(lon):
    file.write(lista_nombres[evento]+","+lista_lugares[evento]+","+lista_fechas[evento])
    file.write("\n")
    # Create the file where the registered people will be locally stored
    archivo_registro = "Asistentes_"+lista_nombres[evento]+".txt"
    with open(archivo_registro,"a") as f:
      pass
    # Create the file where the assistants to the event will be locally stored
    archivo_asistentes = lista_nombres[evento]+"_asistentes.txt"
    with open(archivo_asistentes,"a") as f:
      pass
    # Create the file where the statistics will be locally stored
    archivo_estadistcas = "Estadisticas_"+lista_nombres[evento]+".txt"
    with open(archivo_estadistcas,"a") as f:
      pass
    
  print("Eventos añadidos exitosamente")

  file.close()