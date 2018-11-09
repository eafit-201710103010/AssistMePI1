import sys
import os

checkFile = sys.argv[1]

if os.stat(checkFile).st_size == 0:
    empty = True
else:
    empty = False

if empty:
    print("Vacio")
else:
    print("No vacio")