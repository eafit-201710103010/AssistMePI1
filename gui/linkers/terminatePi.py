""" Python 2.7 Script used to end the connection to a raspberry pi via socket programming.

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

command = "quit".strip()
s.send(command)