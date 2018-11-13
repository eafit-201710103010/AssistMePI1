/**
 * Script used to communicate the registering page on the gui with the RC522 python driver.
 * 
 * It uses the python-shell node module to do this.
 */

// start the port connection at port 12345
let portNum = 12345;

/** Function used to register people using the rfid scanner */
function rfid_register() {
  // Data entered in the interface
  const nombre = document.getElementById("nombre").value;
  const codigo = document.getElementById("codigo").value;
  const docIdentidad = document.getElementById("docIdentidad").value;
  const ocupacion = document.getElementById("ocupación").value;
  const edad = document.getElementById("edad").value;
  let sexo;
  if(document.getElementById("mujer").checked){ // Check if "mujer" is checked
    sexo = document.getElementById("mujer").value;
  }
  else if(document.getElementById("hombre").checked){ // Check if "hombre" is checked
    sexo = document.getElementById("hombre").value;
  }

  // Check if all the mandatory inputs were given
  if(nombre == "" || codigo == "" || docIdentidad == "" || ocupacion == "" || edad == "" || sexo == ""){
    alert("Por favor ingrese todos los datos en los campos oblicatorios. PD: Si desea inscribir el carné es necesario ingresar el código de estudiante");
  }
  else{
    document.getElementById("finalizar").style.display = "none"; // Hide "finalizar" button
    document.getElementById("boton").style.display = "none"; // Hide "leer carné" button
    // import python-shell and path modules
    let { PythonShell } = require("python-shell");
    const path = require("path");

    // create option object with info for the python script
    // in this case, it specifies where the script is, the specific python version that we wantto use and 
    // the port that we want to use to connect to the RPi
    const options = {
      mode: 'text',
      pythonPath: '/usr/bin/python', // TODO: check for windows
      scriptPath: path.join(__dirname, '../linkers/'),
      args: [portNum]
    }

    // call the python script used to get the id inside a card and store the number it returns in the serialID variable
    // change the port with every call to avoid used socket error
    let serialID = "";
    PythonShell.run("connectToPi.py", options, function (err, results) {
      if(err) throw err;
      serialID = String(results[0]);
      addNewPersonEntry(serialID, nombre, codigo, docIdentidad, ocupacion, edad, sexo);
    });
  }

  // Connect to the server and send the registered information
  function addNewPersonEntry(serial, nombre, codigo, docIdentidad, ocupacion, edad, sexo) {
    const evento  = localStorage["evento"];
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", `http://assistmeserver.herokuapp.com/register?serial=${serial}&nombre=${nombre}&codigo=${codigo}&doc_identidad=${docIdentidad}&ocupacion=${ocupacion}&edad=${edad}&sexo=${sexo}&nombre_evento=${evento}`, false);
    xhttp.send();

    // Status code stores the response from the server, if it's "201" the person was successfully registered, otherwise there was an error
    const statusCode = xhttp.status;
    if(statusCode == 201){
      alert("Persona Registrada Exitosamente");
      window.location.href = "../Eventos/eventos.html";
    }
    else{
      alert("ERROR en el registro");
    }
  }

}

/** Function used to register people without the rfid scanner, in case they are not students */
function register(){
  // Event where the person is being registered
  const evento  = localStorage["evento"];
  // Data entered in the interface
  const serial = ""
  const nombre = document.getElementById("nombre").value;
  const codigo = document.getElementById("codigo").value;
  const docIdentidad = document.getElementById("docIdentidad").value;
  const ocupacion = document.getElementById("ocupación").value;
  const edad = document.getElementById("edad").value;
  let sexo = "";
  if(document.getElementById("mujer").checked){ // Check if "mujer" is checked
    sexo = document.getElementById("mujer").value;
  }
  else if(document.getElementById("hombre").checked){ // Check if "hombre" is checked
    sexo = document.getElementById("hombre").value;
  }

  // Check if all the mandatory inputs were given
  if(nombre == "" || docIdentidad == "" || ocupacion == "" || edad == "" || sexo == ""){
    alert("Por favor ingrese todos los datos en los campos oblicatorios");
  }
  else{
    // Connect to server and send the data
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", `http://assistmeserver.herokuapp.com/register?serial=${serial}&nombre=${nombre}&codigo=${codigo}&doc_identidad=${docIdentidad}&ocupacion=${ocupacion}&edad=${edad}&sexo=${sexo}&nombre_evento=${evento}`, false);
    xhttp.send();

    // Status code stores the response from the server, if it's "201" the person was successfully registered, otherwise there was an error
    const statusCode = xhttp.status;
    if(statusCode == 201){
      alert("Persona Registrada Exitosamente");
      window.location.href = "../Eventos/eventos.html";
    }
    else{
      alert("ERROR en el registro");
    }
  }
}
/** Function used to look people up in the "Database" using the rfid scanner */
function rfid_scan(){

  // import python-shell and path modules
  let { PythonShell } = require("python-shell");
  const path = require("path");

  
  // create option object with info for the python script
  // in this case, it specifies where the script is, the specific python version that we want to use and 
  // the port that we want to use to connect to the RPi
  const options = {
    mode: 'text',
    pythonPath: '/usr/bin/python', // TODO: check for windows
    scriptPath: path.join(__dirname, '../linkers/'),
    args: [portNum]
  }

  // call the python script used to get the id inside a card and store the number it returns in the serialID variable
  // change the port with every call to avoid used socket error
  let serialID = "";
  let nombre = "";
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
  let asistio = "false";
  let doc_identidad = "";
  // Check if the serial id is registered and haven't entered the event
  function checkForId(serial) {
    const evento = localStorage["evento"];

    // create option object with info for the python script
    const options2 = {
      mode: 'text',
      scriptPath : path.join(__dirname,'../linkers/'),
      args: [serial,evento]
    } 
    
    // call the python script used look for a person in the "Database"    
    PythonShell.run("searchFile.py", options2, function (err, results) {
      if(err) throw err;
      auxiliar = String(results[0]);
      asistio = String(results[1])
      nombre = String(results[2]);
      doc_identidad = String(results[3]);
      response();
    });
  }

  // If the person is registered and hasn't enterd the event can enter, otherwise can't
  function response(){
    if(auxiliar === "true" && asistio === "false") {
      return ingreso(true,false,nombre,doc_identidad);
    }
    else if(auxiliar === "true" && asistio === "true"){
      return ingreso(true,true,nombre,doc_identidad);
    }
    else{
      return ingreso(false,false,nombre,doc_identidad);
    }
  }

}

/** Function used to look people up in the "Database" using the data enetered manually */
function rfid_manual(){
  // import python-shell and path modules
  let { PythonShell } = require("python-shell");
  const path = require("path");

   // get number entered in the interface
  var evento = localStorage["evento"];
  var id_ingresado = document.getElementById("documento").value;

  // create option object with info for the python script
  // in this case, it specifies where the script is and the arguments that it uses
  const options2 = {
    mode: 'text',
    scriptPath : path.join(__dirname,'../linkers/'),
    args: [id_ingresado,evento]
  };

  let auxiliar = "";
  let asistio = "false";
  let nombre = "";
  let doc_identidad = "";
  // call the python script used look for a person in the "Database"
  PythonShell.run("searchFileManual.py", options2, function (err, results) {
    if(err) throw err;
    auxiliar = String(results[0]);
    asistio = String(results[1]);
    nombre = String(results[2]);
    doc_identidad = String(results[3]);
    response();
  });

  // if the person is indeed in the "Database" and hasn't entered the event, the person can enter, otherwise can't
  function response(){
    if(auxiliar === "true" && asistio === "false") {
      return ingreso(true,false,nombre,doc_identidad);
    }
    else if(auxiliar === "true" && asistio === "true"){
      return ingreso(true,true,nombre,doc_identidad);
    }
    else{
      return ingreso(false,false,nombre,doc_identidad);
    }
  }
  
}

/** Function used to store the people who enter the event */
function assistance(nombre,doc_identidad){
  // import python-shell and path modules
  let { PythonShell } = require("python-shell");
  const path = require("path");

  var evento = localStorage["evento"];

  // create option object with info for the python script
  // in this case, it specifies where the script is and the arguments that it uses
  const options = {
    mode: 'text',
    scriptPath : path.join(__dirname,'../linkers/'),
    args: [evento,nombre,doc_identidad]
  };

  // Call the pyhton script used to store the event assistants 
  PythonShell.run("assistance.py", options, function (err) {
    if(err) throw err;
  });
}

/** Function to terminate the rfid scanner */
function rfid_terminate() {
  // import python-shell and path modules
  let { PythonShell } = require("python-shell");
  const path = require("path");

  // create option object with info for the python script
  // in this case, it specifies where the script is, the specific python version that we wantto use and 
  // the port that we want to use to connect to the RPi
  const options = {
    mode: 'text',
    pythonPath: '/usr/bin/python', // TODO: check for windows
    scriptPath: path.join(__dirname, '../linkers/'),
    args: [portNum]
  }

  // Call the python script used to terminate the rfid scanner
  PythonShell.run("terminatePi.py", options, function (err, results) {
    if(err) throw err;
  });
  // Send the assistants to the database
  uploadAssistants();
}

/** Function used to store the assistants in the database once the registration is finished */
function uploadAssistants(){
  const evento = localStorage["evento"];
  
  // import python-shell and path modules
  let { PythonShell } = require("python-shell");
  const path = require("path");

  // create option object with info for the python script
  const options = {
    mode: 'text',
    scriptPath: path.join(__dirname, '../linkers/'),
    args: [evento]
  }

  // call the python script used to send the information to the database
  let auxiliar = "";
  PythonShell.run("upload_assistants.py", options, function (err, results) {
    if(err) throw err;
    auxiliar = results[0];
    response();
  });

  function response(){
    if(auxiliar === "asistentes guardados"){
      alert("Información de los asistentes almacenada");
      window.location.href = "../Eventos/eventos.html";
    }
    else{
      alert("Error subiendo la información de los asistentes");
      window.location.href = "../Eventos/eventos.html";
    }
  }
}