function createEvent(){
    // import python-shell and path modules
    let { PythonShell } = require("python-shell");
    const path = require("path");
  
     // get number entered in the interface
    var nombre = document.getElementById("nombreEvento").value;
    var lugar = document.getElementById("lugarEvento").value;
    var fecha = document.getElementById("fechaEvento").value;
  
    // create option object with info for the python script
    // in this case, it specifies where the script is and the arguments that it uses
    const options = {
      mode: 'text',
      scriptPath : path.join(__dirname,'../linkers/'),
      args: [nombre,lugar,fecha]
    };
  
    let auxiliar = "";
    PythonShell.run("createEvent.py", options, function (err, results) {
      if(err) throw err;
      auxiliar = String(results[0]);
      response();
    });

  // call the python script used look for a person in the "Database"

  // if the person is indeed in the "Database", return true, else return not
  function response(){
    if(auxiliar === "evento creado"){
        alert("Evento creado exitosamente")
    }
    else{
        alert("ERROR en la creación del evento")
    }
  }

}