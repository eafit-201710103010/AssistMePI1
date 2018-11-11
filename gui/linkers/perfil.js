/**
 * Script used to download all the users once the person is logged in
 */

// Connect to server and get all the users information
const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:5000/manage_users", false);
  xhttp.send();
  const usuarios = JSON.parse(xhttp.responseText);
  lon = Object.keys(usuarios).length;
  // For each user gotten from the server add the username and its permission to lists
  let nombres = [];
  let permisos = []
  for(i = 0; i < lon; i++){
    nombres.push(usuarios[i]["nombre"]);
    permisos.push(usuarios[i]["permiso"]);
  }
  // import python-shell and path modules
  let { PythonShell } = require("python-shell");
  const path = require("path");

  // create option object with info for the python script
  // in this case, it specifies where the script is and the arguments that it uses
  const options = {
    mode: 'text',
    scriptPath : path.join(__dirname,'../linkers/'),
    args: [nombres,permisos]
  };

  // Call the python script used to store all the users locally in a text file
  let auxiliar = "";
  PythonShell.run("getUsers.py", options, function (err, results) {
    if(err) throw err;
    auxiliar = String(results[0]);
    response();
  });
  
  function response(){
    console.log(auxiliar);
  }