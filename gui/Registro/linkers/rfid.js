/**
 * Script used to communicate the registering page on the gui with the RC522 python driver.
 * 
 * It uses the python-shell node module to do this.
 */


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
  const python = require("python-shell");
  const path = require("path");

  // create option object with info for the python script
  // in this case, it specifies where the script is
  const options = {
    scriptPath : path.join(__dirname, '/../../../sensorDrivers/RFIDSensor/')
  }

  // call the python script used to get the id inside a card and store the number it returns in the serialID variable
  var serialID = new python("rfid_controller.py",options);

  // create option object with info for the python script
  // in this case, it specifies where the script is and the arguments that it uses
  const options2 = {
    scriptPath : patn.join(__dirname,'/'),
    args: [serialID]
  } 
  
  // call the python script used look for a person in the "Database"
  var auxiliar = new python("searchFile.py",options2);
  
  // if the person is indeed in the "Database", return true, else return not
  if(auxiliar==="true"){
    return true;
  }else{
    return false;
  }

}

/** Function used to look people up in the "Database" using the data enetered manually */
function rfid_manual(){
  console.log("Entra a la funcion");
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
    console.log("results: %j", results);
    console.log(results[0]);
    auxiliar = String(results[0]);
  });

  // call the python script used look for a person in the "Database"

  // if the person is indeed in the "Database", return true, else return not
  if(auxiliar === "true") {
    return true;
  }else{
    return false;
  }
}