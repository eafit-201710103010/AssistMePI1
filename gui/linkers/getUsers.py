import sys

nombres = sys.argv[1]
permisos = sys.argv[2]

file = open("usuarios.txt","r+")
file.truncate(0)
file.close()

file = open("usuarios.txt","a")

lista_nombres = nombres.split(",")
lista_permisos = permisos.split(",")

lon = len(lista_nombres)

for usuario in range(lon):
  file.write(lista_nombres[usuario]+","+lista_permisos[usuario])
  file.write("\n")

print("Usuarios añadidos exitosamente")

file.close()