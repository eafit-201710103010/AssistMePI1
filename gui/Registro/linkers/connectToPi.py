""" Python 2.7 Script used to connect to a raspberry pi via socket programming.

The raspberry pi has to be connected via ethernet to the host in order for it to work.
"""

import sys
import socket

# define the ip to which you want to connect to and the port you wishto use.
HOST = "169.254.41.119" 
PORT = int(sys.argv[1]) # starts at 12345

# create a socket object and connect it to the server.
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((HOST,PORT))

# specify which command you want to use, for now the only one available is scan_RFID
# TODO: erase the while true loop and the quit command and catch the error on the server. 
# TODO: add the scan_image command later and change it to work with program arguments.

command = "scan_RFID".strip()
s.send(command)
reply = s.recv(1024)
print reply

# command = "quit".strip()
# s.send(command)
# reply = s.recv(1024)
# if reply == "Terminating":
#   break