function login(){
  usuario = document.getElementById("usuario").value;
  password = document.getElementById("contraseña").value;

  if(usuario == "" || password === ""){
    alert("Por favor ingrese los datos");
  }
  else{
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `http://localhost:5000/log_in?nombre=${usuario}&password=${password}`, false);
    xhttp.send();
    if(xhttp.status == 500){
      alert("Usuario o contraseña incorrectos");
      document.getElementById("usuario").value = "";
      document.getElementById("contraseña").value = "";
    }
    else if(xhttp.status == 200){
      localStorage["usuario"] = usuario;
      getEvents();
    }
    else{
      alert("Error en la autentificación")
      document.getElementById("usuario").value = "";
      document.getElementById("contraseña").value = "";
    }

  }
}

function getEvents(){
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:5000/get_events", false);
  xhttp.send();
  const events = JSON.parse(xhttp.responseText);
  
  lon = Object.keys(events).length;
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

  let auxiliar = "";
  PythonShell.run("getEvents.py", options, function (err, results) {
    if(err) throw err;
    auxiliar = String(results[0]);
    response();
  });
  
  function response(){
    console.log(auxiliar);
  }

  setTimeout(nextWindow, 1000);
}

function nextWindow(){
  window.location.href = "../Perfil/perfil.html";
}