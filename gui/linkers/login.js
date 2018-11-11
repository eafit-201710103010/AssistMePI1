/**
 * Script used to log a person in
 */

 /** Function used to connect to the server and check if the username and password entered exist */
function login(){
  // Get username and password entered in the interface
  usuario = document.getElementById("usuario").value;
  password = document.getElementById("contraseña").value;

  // If either the username or password input is empty ask to enter the data, else connect to server and check if the data entered is valid
  if(usuario == "" || password === ""){
    alert("Por favor ingrese los datos");
  }
  else{
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:5000/log_in?nombre=${usuario}&password=${password}`, false);
    xhttp.send();
    if(xhttp.status == 500){  // If the response sent from the server is 500 the username or password is invalid
      alert("Usuario o contraseña incorrectos");
      document.getElementById("usuario").value = "";
      document.getElementById("contraseña").value = "";
    }
    else if(xhttp.status == 200){ // If the response sent from the server is 200 the username and password is valid
      localStorage["usuario"] = usuario;
      getEvents();  // Get the user events
    }
    else{
      alert("Error en la autentificación")
      document.getElementById("usuario").value = "";
      document.getElementById("contraseña").value = "";
    }

  }
}

/** Function used to download in a local text file the events creater by the user entered */
function getEvents(){
  // Connect to server and download events
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:5000/get_events", false);
  xhttp.send();
  const events = JSON.parse(xhttp.responseText);
  
  lon = Object.keys(events).length;
  // Add to a list of names, places and dates each event
  let nombres = [];
  let lugares = [];
  let fechas = []
  for(i = 0; i < lon; i++){
    nombres.push(events[i]["nombre"]);
    lugares.push(events[i]["lugar"]);
    fechas.push(events[i]["fecha"]);
  }
  // import python-shell and path modules
  let { PythonShell } = require("python-shell");
  const path = require("path");

  // create option object with info for the python script
  // in this case, it specifies where the script is and the arguments that it uses
  const options = {
    mode: 'text',
    scriptPath : path.join(__dirname,'../linkers/'),
    args: [nombres,lugares,fechas]
  };

  // Call the python script used to store the events in a local text file
   // The variable "auxiliar" stores the response from the pyhton script
  let auxiliar = "";
  PythonShell.run("getEvents.py", options, function (err, results) {
    if(err) throw err;
    auxiliar = String(results[0]);
    response();
  });
  
  function response(){
    console.log(auxiliar);
  }
  // Wait one second so that all the events can be downloaded and then go to the profile page 
  setTimeout(nextWindow, 1000);
}

/** Go to the profile page */
function nextWindow(){
  window.location.href = "../Perfil/perfil.html";
}