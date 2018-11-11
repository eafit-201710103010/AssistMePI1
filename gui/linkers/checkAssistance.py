""" Check if the registerd people for centain event is downloaded from the database """

# Import dependencies to access to the data and read files
import sys
import os

# Get the file name that needs to be checked
checkFile = sys.argv[1]

# If the file is empty, the information haven't been downloaded
if os.stat(checkFile).st_size == 0:
    empty = True
else:
    empty = False

if empty:
    print("Vacio")
else:
    print("No vacio")