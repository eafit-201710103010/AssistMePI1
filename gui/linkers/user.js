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
       cell1.innerHTML = results[i];
       cell2.innerHTML = results[i+1];
       cell3.innerHTML = '<p id="permisos" class="pill-white btn"><a style="color: black" href="#">Ver permisos</a></p>'
    }
  });
}

function addUser(){
  // import python-shell and path modules
  let { PythonShell } = require("python-shell");
  const path = require("path");

  // get number entered in the interface
  var nombre = document.getElementById("nombreUsuario").value;
  var ocupacion = document.getElementById("ocupacion").value;

  // create option object with info for the python script
  // in this case, it specifies where the script is and the arguments that it uses
  const options = {
      mode: 'text',
      scriptPath: path.join(__dirname,'../linkers/'),
      args: [nombre,ocupacion]
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
    alert("Usuario añadido exitosamente")
  }
  else{
      alert("ERROR en la adición del usuario")
  }
}
}