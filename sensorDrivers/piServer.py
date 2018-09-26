import socket

from RFIDSensor.rfid_controller import scan_RFID

HOST = ''
PORT = 12345

s = socket.socket()
print "Socket Created"

try:
  s.bind((HOST,PORT))
except socket.error as e:
  print "Bind Failed"
  print e

s.listen(1)
print "Socket Waiting"
conn, addr = s.accept()
print "Connected"

while True:

  data = conn.recv(1024)
  print "Message Sent"

  if data == "scan_RFID":
    reply = str( scan_RFID() )
  elif data == "quit":
    conn.send("Terminating")
    break
  else:
    reply = "unknown"

  conn.send(reply)

conn.close()