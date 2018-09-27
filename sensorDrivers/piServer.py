""" Python 2.7 script used to create a server on the raspberry pi.

It connects to the host via ethernet and socket programming, and it tells the different scanner when to work.
"""

import socket

# from the rfid scanner module import the scan function
from RFIDSensor.rfid_controller import scan_RFID

# define the port in which you want to establish connection
HOST = ''
PORT = 12345

while True:
  # create a socket object
  s = socket.socket()
  print "Socket Created"

  # bind the host to the port and manage the exception in case the connection failed
  try:
    s.bind((HOST,PORT))
  except socket.error as e:
    print "Bind Failed"
    print e

  # wait for the host to connect
  s.listen(1)
  print "Socket Waiting"

  # when the host has connected, accept the connection
  conn, addr = s.accept()
  print "Connected on port " + str(PORT)

  #while True:

  # recieve the data from the host
  data = conn.recv(1024)

  # evaluate what to do
  if data == "scan_RFID":
    # call the rfid_controller
    reply = str( scan_RFID() )
  elif data == "quit":
    # TODO: figure out how to remove this later
    conn.send("Terminating")
    break
  else:
    reply = "unknown"
  
  # send a response
  print "Message Sent\n"
  conn.send(reply)

  # end the connection
  conn.close()

  PORT += 1;
