function updateUserTable(){
    // import python-shell and path modules
  let { PythonShell } = require("python-shell");
  const path = require("path");

  // create option object with info for the python script
  // in this case, it specifies where the script is and the arguments that it uses
  const options = {
    mode: 'text',
    scriptPath : path.join(__dirname,'../linkers/'),
    args: []
  };

  PythonShell.run("userTable.py", options, function (err, results) {
    if(err) throw err;
    let usuarios = document.getElementById('tablaUsuarios');
    for(i=0; i<results.length; i+=3){
       let rowLength = usuarios.rows.length;
       let row = usuarios.insertRow(rowLength);
       let cell1 = row.insertCell(0);
       let cell2 = row.insertCell(1);
       let cell3 = row.insertCell(2);

       let usuario = results[i];

       cell1.innerHTML = results[i];
       cell2.innerHTML = results[i+1];
       cell3.innerHTML = '<p class="btn"><i class="glyphicon glyphicon-trash" id="'+ usuario +'" style="font-size:15px;color:black" onclick="confirmacion(this.id);"></i></p>'
    }
  });
}

function addUser(){
  // import python-shell and path modules
  let { PythonShell } = require("python-shell");
  const path = require("path");

  // get number entered in the interface
  var nombre = document.getElementById("nombreUsuario").value;
  var password = document.getElementById("password").value;
  var permisos = document.getElementById("permisos").value;

  // create option object with info for the python script
  // in this case, it specifies where the script is and the arguments that it uses
  const options = {
      mode: 'text',
      scriptPath: path.join(__dirname,'../linkers/'),
      args: [nombre,permisos]
  };

  let auxiliar = "";
  PythonShell.run("addUser.py", options, function (err, results) {
      if(err) throw err;
      auxiliar = String(results[0]);
      response();
  });

  // call the python script used look for a person in the "Database"

  // if the person is indeed in the "Database", return true, else return not
  function response(){
    if(auxiliar === "usuario agregado"){
      const xhttp = new XMLHttpRequest();
      xhttp.open("POST", `http://localhost:5000/manage_users?nombre=${nombre}&password=${password}&permiso=${permisos}`, false);
      xhttp.send();
      const statusCode = xhttp.status;
      if(statusCode == 201){
        alert("Usuario añadido exitosamente")
        window.location.href = "../Usuarios/usuarios.html"
      }
      else{
        alert("ERROR en la adición del usuario de parte del servidor")
      }
    }
    else{
      alert("ERROR en la adición del usuario de parte del cliente")
    }
  }
}

function confirmacion(usuario){
  if(confirm("Si presiona OK se eliminará el usuario " + usuario)){
    deleteUser(usuario);
  }
}

function deleteUser(usuario){
  // import python-shell and path modules
  let { PythonShell } = require("python-shell");
  const path = require("path");

   // get number entered in the interface
  var nombreUsuario = usuario;

  // create option object with info for the python script
  // in this case, it specifies where the script is and the arguments that it uses
  const options = {
    mode: 'text',
    scriptPath : path.join(__dirname,'../linkers/'),
    args: [nombreUsuario]
  };

  let auxiliar = "";
  PythonShell.run("deleteUser.py", options, function (err, results) {
    if(err) throw err;
    auxiliar = String(results[0]);
    response();
  });

  // call the python script used look for a person in the "Database"

  // if the person is indeed in the "Database", return true, else return not
  function response(){
    if(auxiliar === "usuario eliminado"){
      const xhttp = new XMLHttpRequest();
      xhttp.open("DELETE", `http://localhost:5000/manage_users?nombre=${nombreUsuario}`, false);
      xhttp.send();
      const statusCode = xhttp.status;
      if(statusCode == 204){
        alert("Usuario eliminado exitosamente")
        location.reload()
      }
      else{
        alert("ERROR en la eliminación del usuario de parte del servidor")
      }
    }
    else{
      alert("ERROR en la eliminación del usuario de parte del cliente")
    }
  }
}