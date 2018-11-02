/**
 * Script used to communicate the registering page on the gui with the RC522 python driver.
 * 
 * It uses the python-shell node module to do this.
 */

// start the port connection at port 12345
let portNum = 12345;

/** Function used to register people using the rfid scanner */
function rfid_register() {

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
    const evento  = localStorage["evento"];
    const nombre = document.getElementById("nombre").value;
    const codigo = document.getElementById("codigo").value;
    const docIdentidad = document.getElementById("docIdentidad").value;
    const ocupacion = document.getElementById("ocupación").value;
    const edad = document.getElementById("edad").value;
    let sexo;
    if(document.getElementById("mujer").checked){
      sexo = document.getElementById("mujer").value;
    }
    else{
      sexo = document.getElementById("hombre").value;
    }
    addNewPersonEntry(serialID, nombre, codigo, docIdentidad, ocupacion, edad, sexo);
  });

  let auxiliar = "";
  function addNewPersonEntry(serial, nombre, codigo, docIdentidad, ocupacion, edad, sexo) {
    // create option object with info for the python script
    // in this case, it specifies where the script is and the arguments that it uses
    const options2 = {
      mode: 'text',
      scriptPath : path.join(__dirname,'../linkers/'),
      args: [evento, serial, nombre, codigo, docIdentidad, ocupacion, edad, sexo]
    } 
    
    // call the python script used look for a person in the "Database"
    
    PythonShell.run("writeFile.py", options2, function (err, results) {
      if(err) throw err;
      auxiliar = String(results[0]);
      response();
    });
  }

  function response(){
    if(auxiliar === "registro_exitoso") {
      alert("Persona Registrada Exitosamente");
      window.location.href = "../Eventos/eventos.html";
    }else{
      alert("ERROR en el registro");
    }
  }

}

function register(){
  
  let { PythonShell } = require("python-shell");
  const path = require("path");

  const evento  = localStorage["evento"];
  const serial = ""
  const nombre = document.getElementById("nombre").value;
  const codigo = document.getElementById("codigo").value;
  const docIdentidad = document.getElementById("docIdentidad").value;
  const ocupacion = document.getElementById("ocupación").value;
  const edad = document.getElementById("edad").value;
  let sexo;
  if(document.getElementById("mujer").checked){
    sexo = document.getElementById("mujer").value;
  }
  else{
    sexo = document.getElementById("hombre").value;
  }
  
  const options = {
    mode: 'text',
    scriptPath : path.join(__dirname,'../linkers'),
    args: [evento,serial,nombre,codigo,docIdentidad,ocupacion,edad,sexo]
  };

  let auxiliar = "";
  PythonShell.run("writeFile.py", options, function (err, results){
    if(err) throw err;
    auxiliar = String(results[0]);
    response();
  });

  function response(){
    if(auxiliar === "registro_exitoso") {
      alert("Persona Registrada Exitosamente");
      window.location.href = "../Eventos/eventos.html";
    }else{
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
  let nombre = "";
  let doc_identidad = "";
  function checkForId(serial) {
    // create option object with info for the python script
    // in this case, it specifies where the script is and the arguments that it uses.
    const evento = localStorage["evento"];

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
  PythonShell.run("searchFileManual.py", options2, function (err, results) {
    if(err) throw err;
    auxiliar = String(results[0]);
    asistio = String(results[1]);
    nombre = String(results[2]);
    doc_identidad = String(results[3]);
    response();
  });

  // call the python script used look for a person in the "Database"

  // if the person is indeed in the "Database", return true, else return not
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

function assistance(nombre,doc_identidad){
  // import python-shell and path modules
  let { PythonShell } = require("python-shell");
  const path = require("path");

   // get number entered in the interface
  var evento = localStorage["evento"];

  // create option object with info for the python script
  // in this case, it specifies where the script is and the arguments that it uses
  const options = {
    mode: 'text',
    scriptPath : path.join(__dirname,'../linkers/'),
    args: [evento,nombre,doc_identidad]
  };


  PythonShell.run("assistance.py", options, function (err) {
    if(err) throw err;
  });
}

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
    scriptPath: path.join(__dirname, '/linkers/'),
    args: [portNum]
  }

  // call the python script used to get the id inside a card and store the number it returns in the serialID variable
  // change the port with every call to avoid used socket error
  PythonShell.run("terminatePi.py", options, function (err, results) {
    if(err) throw err;
  });

  window.location.href = "../Eventos/eventos.html"
}