const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:5000/manage_users", false);
  xhttp.send();
  const usuarios = JSON.parse(xhttp.responseText);
  console.log(usuarios);
  lon = Object.keys(usuarios).length;
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

  let auxiliar = "";
  PythonShell.run("getUsers.py", options, function (err, results) {
    if(err) throw err;
    auxiliar = String(results[0]);
    response();
  });
  
  function response(){
    console.log(auxiliar);
  }