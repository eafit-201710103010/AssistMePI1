/**
 * Script used to manage all the users
 * 
 * Update user table, create and delete user
 */

 /** Update users table displayed in the interface */
function updateUserTable(){
  
  // import python-shell and path modules
  let { PythonShell } = require("python-shell");
  const path = require("path");

  // create option object with info for the python script
  // in this case, it specifies where the script is, it has no arguments
  const options = {
    mode: 'text',
    scriptPath : path.join(__dirname,'../linkers/'),
    args: []
  };

  // Call the python script used get the users stored and create the table 
  PythonShell.run("userTable.py", options, function (err, results) {
    if(err) throw err;
    // Get the table created in the html file by its id, creates a new row for each user
    // In each row there are three columns, for the username, permissions and the button to delete the user
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

/** Adds a new user to the database */
function addUser(){

  // import python-shell and path modules
  let { PythonShell } = require("python-shell");
  const path = require("path");

  // get name, password and permissions entered in the interface
  var nombre = document.getElementById("nombreUsuario").value;
  var password = document.getElementById("password").value;
  var permisos = document.getElementById("permisos").value;

  // create option object with info for the python script
  // It specifies where the script is and the arguments that it uses
  const options = {
      mode: 'text',
      scriptPath: path.join(__dirname,'../linkers/'),
      args: [nombre,permisos]
  };

  // Call the python script used to add a new user in a text file
  // The variable "auxiliar" stores the response from the pyhton script
  let auxiliar = "";
  PythonShell.run("addUser.py", options, function (err, results) {
      if(err) throw err;
      auxiliar = String(results[0]);
      response();
  });

  // If the user was successfully added to the text file, connect to the server and store the user in the database, else show the client an error alert
  function response(){
    if(auxiliar === "usuario agregado"){
      const xhttp = new XMLHttpRequest();
      xhttp.open("POST", `http://localhost:5000/manage_users?nombre=${nombre}&password=${password}&permiso=${permisos}`, false);
      xhttp.send();
      // Status code stores the response from the server, if it's "201" the user was successfully added, otherwise there was an error
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

/** Asks the client if they really want to delete the user, if the answer is "yes" call the function "deleteUser" */
function confirmacion(usuario){
  if(confirm("Si presiona OK se eliminará el usuario " + usuario)){
    deleteUser(usuario);
  }
}

/** Delete user given from the database */
function deleteUser(usuario){

  // import python-shell and path modules
  let { PythonShell } = require("python-shell");
  const path = require("path");

   // Store username to be deleted
  var nombreUsuario = usuario;

  // create option object with info for the python script
  // in this case, it specifies where the script is and the arguments that it uses
  const options = {
    mode: 'text',
    scriptPath : path.join(__dirname,'../linkers/'),
    args: [nombreUsuario]
  };

  // Call the python script used to delete a user from a local text file
  // The variable "auxiliar" stores the response from the pyhton script
  let auxiliar = "";
  PythonShell.run("deleteUser.py", options, function (err, results) {
    if(err) throw err;
    auxiliar = String(results[0]);
    response();
  });

  // if the user was succesfully deleted from the text file, connect to the server and delete it from the database
  function response(){
    if(auxiliar === "usuario eliminado"){
      const xhttp = new XMLHttpRequest();
      xhttp.open("DELETE", `http://localhost:5000/manage_users?nombre=${nombreUsuario}`, false);
      xhttp.send();
      // If the response from the server is "204" the user was successfully deleted, else there was an error
      const statusCode = xhttp.status;
      if(statusCode == 204){
        alert("Usuario eliminado exitosamente")
        // Reload the page to update the table
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