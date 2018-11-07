import sys

nombres = sys.argv[1]
lugares = sys.argv[2]
fechas = sys.argv[3]

file = open("eventos.txt","r+")
file.truncate(0)
file.close()

file = open("eventos.txt","a")

lista_nombres = nombres.split(",")
lista_lugares = lugares.split(",")
lista_fechas = fechas.split(",")

lon = len(lista_nombres)

for evento in range(lon):
  file.write(lista_nombres[evento]+","+lista_lugares[evento]+","+lista_fechas[evento])
  file.write("\n")

print("Eventos añadidos exitosamente")

file.close()