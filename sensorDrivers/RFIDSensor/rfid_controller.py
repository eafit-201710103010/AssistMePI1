""" Python based RFID controller for raspberry pi

Python module used to control an RFID scanner connected to a raspberry pi.
It reads the the serial number associated to a magnetic card using a library specially designed to interact with the RC522 RFID scanner. The ports on the scanner should be connected to the RPi as follows:
  
  RC522 Port    |    RPi port
  --------------|--------------
  SDA           |    Pin 24
  SCK           |    Pin 23
  MOSI          |    Pin 19
  MISO          |    Pin 21
  GND           |    Pin 6
  RST           |    Pin 22
  3.3v          |    Pin 1

The library and the instruction on how to use it where taken from 'https://pimylifeup.com/raspberry-pi-rfid-rc522/'. Reffer to that page for more info.
"""

#TODO: Arrange it so it can be connected to the electron app.

import RPi.GPIO as GPIO
import SimpleMFRC522

# Create a new reader to interact with the scanner.
reader = SimpleMFRC522.SimpleMFRC522()

try:

  # Get the serial ID associated to a magnetic card and the text info that it may contain.
  # in our case, we don't really care about the text, but we have to put it there for api compatibility reasons.
  id = reader.read_id()
  print(id)
  

finally:

  # Always make sure to reset all the ports that were used.
  GPIO.cleanup()
