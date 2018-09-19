/**
 * Script used to communicate the registering page on the gui with the RC522 python driver.
 * 
 * It uses the python-shell node module to do this.
 */



function rfid_scan() {

  const python = require("python-shell");
  const path = require("path");

  const options = {
    scriptPath : path.join(__dirname, '/../sensorDrivers/RFIDSensor/')
  }

  var serialID = new python("rfid_controller.py",options);

  var nombre = document.getElementById("nombre").value;
  var codigo = document.getElementById("codigo").value;
  var docIdentidad = document.getElementById("docIdentidad").value;
  var edad = document.getElementById("edad").value;
  var sexoh = document.getElementById("sexoH").value;
  var sexom = document.getElementById("sexoM").value;

  const options2 = {
    scriptPath : patn.join(_dirname,'/'),
    args: [serialID,nombre,codigo,docIdentidad,edad,sexoh,sexom]
  } 
  
  var auxiliar = new python("writeFile.py",options2);

  sexom.end((err, code, message) => {
    swal("Persona Añadida Exitosamente");
  })

}
