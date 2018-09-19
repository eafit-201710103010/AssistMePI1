/**
 * Script used to communicate the registering page on the gui with the RC522 python driver.
 * 
 * It uses the python-shell node module to do this.
 */

function rfid_scan() {

  const python = require("python-shell");
  const path = require("path");

  const options = {
    scriptPath : path.join(__dirname, '/../sensorDrivers/RFIDSensor')
  }

}