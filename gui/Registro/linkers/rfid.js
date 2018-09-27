/**
 * Script used to communicate the registering page on the gui with the RC522 python driver.
 * 
 * It uses the python-shell node module to do this.
 */

let portNum = 12345;

/** Function used to register people using the rfid scanner */
function rfid_register() {

  // import python-shell and path modules
  const python = require("python-shell");
  const path = require("path");

  // create option object with info for the python script
  // in this case, it specifies where the script is 
  const options = {
    scriptPath : path.join(__dirname, '/../../../sensorDrivers/RFIDSensor/')
  }

  // call the python script used to get the id inside a card and store the number it returns in the serialID variable
  var serialID = new python("rfid_controller.py",options);

  // get all the info about the person you are registering
  var nombre = document.getElementById("nombre").value;
  var codigo = document.getElementById("codigo").value;
  var docIdentidad = document.getElementById("docIdentidad").value;
  var edad = document.getElementById("edad").value;
  var sexoh = document.getElementById("sexoH").value;
  var sexom = document.getElementById("sexoM").value;

  // create option object with info for the python script
  // in this case, it specifies where the script is and the arguments that it uses
  const options2 = {
    scriptPath : path.join(__dirname,'/'),
    args: [serialID,nombre,codigo,docIdentidad,edad,sexoh,sexom]
  } 
  
  // call the python script used to add a person to the "Database" 
  var auxiliar = new python("writeFile.py",options2);

  // alert the user when a person is added succesfully to the database
  auxuliar.end((err, code, message) => {
    swal("Persona Añadida Exitosamente");
  })

}

/** Function used to look people up in the "Database" using the rfid scanner */
function rfid_scan(){

  // import python-shell and path modules
  let { PythonShell } = require("python-shell");
  const path = require("path");

  // create option object with info for the python script
  // in this case, it specifies where the script is
  const options = {
    mode: 'text',
    pythonPath: '/usr/bin/python', // TODO: check for windows
    scriptPath: path.join(__dirname, '/linkers/'),
    args: [portNum]
  }

  // call the python script used to get the id inside a card and store the number it returns in the serialID variable
  let serialID = "";
  PythonShell.run("connectToPi.py", options, function (err, results) {
    if(err) throw err;
    serialID = String(results[0]);
    if(portNum >= 12395) {
      portNum = 12345;
    }
    else {
      portNum += 1;
    }
    checkForId(serialID);
  });

  let auxiliar = "";
  function checkForId(serial) {
    console.log("BLA BLA BLA");
    // create option object with info for the python script
    // in this case, it specifies where the script is and the arguments that it uses
    const options2 = {
      mode: 'text',
      scriptPath : path.join(__dirname,'/linkers/'),
      args: [serial]
    } 
    
    // call the python script used look for a person in the "Database"
    
    PythonShell.run("searchFile.py", options2, function (err, results) {
      if(err) throw err;
      auxiliar = String(results[0]);
      response();
    });
  }

  function response(){
    if(auxiliar === "true") {
      return ingreso(true);
    }else{
      return ingreso(false);
    }
  }

}

/** Function used to look people up in the "Database" using the data enetered manually */
function rfid_manual(){
  // import python-shell and path modules
  let { PythonShell } = require("python-shell");
  const path = require("path");

   // get number entered in the interface
  var id_ingresado = document.getElementById("documento").value;

  // create option object with info for the python script
  // in this case, it specifies where the script is and the arguments that it uses
  const options2 = {
    mode: 'text',
    scriptPath : path.join(__dirname,'/linkers/'),
    args: [id_ingresado]
  };

  let auxiliar = "";
  PythonShell.run("searchFileManual.py", options2, function (err, results) {
    if(err) throw err;
    auxiliar = String(results[0]);
    response();
  });

  // call the python script used look for a person in the "Database"

  // if the person is indeed in the "Database", return true, else return not
  function response(){
      if(auxiliar === "true") {
        return ingreso(true);
      }else{
        return ingreso(false);
      }
    }
  
}