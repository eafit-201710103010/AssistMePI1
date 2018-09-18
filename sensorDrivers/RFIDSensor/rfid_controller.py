""" Python based RFID controller for raspberry pi

Python module used to control an RFID scanner connected to a raspberry pi.
It reads the the serial number in a magnetic card and checks if that person is registered or not.
"""

import serial
import re, sys, signal, os, time, datetime
import RPi.GPIO as GPIO

