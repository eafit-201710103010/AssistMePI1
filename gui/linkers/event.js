function checkButtons(){
  let eventos = document.getElementById('tablaEventos');
  let rowLength = eventos.rows.length;
  for(i=1; i < rowLength; i++){

      let { PythonShell } = require("python-shell");
      const path = require("path");

      // get number entered in the interface
      let nombreEvento = eventos.rows[i].cells[0].innerHTML;
      let nombreArchivo = "Asistentes_"+nombreEvento+".txt";

      // create option object with info for the python script
      // in this case, it specifies where the script is and the arguments that it uses
      const options = {
      mode: 'text',
      scriptPath : path.join(__dirname,'../linkers/'),
      args: [nombreArchivo]
      };

      let auxiliar = "";
      PythonShell.run("checkAssistance.py", options, function (err, results) {
      if(err) throw err;
      auxiliar = String(results[0]);
      response(nombreEvento);
      });

      // call the python script used look for a person in the "Database"

      // if the person is indeed in the "Database", return true, else return not
      function response(evento){
          let nombreEventoTabla = "";
          let j = 0;
          while(evento !== nombreEventoTabla){
              nombreEventoTabla = eventos.rows[j].cells[0].innerHTML;
              j++;
          }
          if(auxiliar === "Vacio"){
              hideButton(j-1);
          }
          else{
              showButtonRegister(j-1);
          }
      }
  }
}

function showButtonRegister(rowNumber){
  let tabla = document.getElementById('tablaEventos');
  let btn1 = tabla.rows.item(rowNumber).cells[3].childNodes[0].childNodes[0];
  let btn2 = tabla.rows.item(rowNumber).cells[4].childNodes[0];
  btn1.innerHTML = "Registrar";
  btn1.href = "../Registro/registro.html"
  btn2.style.display = "none";
}

function hideButton(rowNumber){
  let tabla = document.getElementById('tablaEventos');
  let btn1 = tabla.rows.item(rowNumber).cells[3].childNodes[0].childNodes[0];
  btn1.innerHTML = "Inscribir";
  btn1.href = "../Formulario_Registro/formularioRegistro.html"
}

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

function updateTable(){
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
 
   PythonShell.run("eventTable.py", options, function (err, results) {
     if(err) throw err;
     let eventos = document.getElementById('tablaEventos');
     for(i=0; i<results.length; i+=4){
        let rowLength = eventos.rows.length;
        let row = eventos.insertRow(rowLength);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);

        let nombreEvento = results[i];

        cell1.innerHTML = results[i];
        cell2.innerHTML = results[i+1];
        cell3.innerHTML = results[i+2];
        cell4.innerHTML = '<p class="pill-white btn"><a id="'+ nombreEvento +'" style="color: black" href="../Formulario_Registro/formularioRegistro.html" onclick="storeId(this.id);">Inscribir</a></p>'
        cell5.innerHTML = '<p class="pill-white btn"><a id="'+ nombreEvento +'" style="color: black" href="#" onclick="descargar(this.id);">Descargar</a></p>'
        cell6.innerHTML = '<p class="btn"><i class="glyphicon glyphicon-trash" id="'+ nombreEvento +'" style="font-size:15px;color:black" onclick="confirmacion(this.id);"></i></p>'
     }
     checkButtons();
   });
  
}

function updateTableEvents(){
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

  PythonShell.run("tableCharts.py", options, function (err, results) {
    if(err) throw err;
    let eventos = document.getElementById('tablaEventos');

    for(i=0; i<results.length; i+=4){
       let rowLength = eventos.rows.length;
       let row = eventos.insertRow(rowLength);
       let cell1 = row.insertCell(0);
       let cell2 = row.insertCell(1);
       let cell3 = row.insertCell(2);
       let cell4 = row.insertCell(3);

       let nombreEvento = results[i];

       cell1.innerHTML = results[i];
       cell2.innerHTML = results[i+1];
       cell3.innerHTML = results[i+2];
       cell4.innerHTML = '<p id="verEstadisticas" class="pill-white btn"><a id="'+ nombreEvento +'" style="color: black" href="../visualizarEstadisticas/estadisticas.html" onclick="storeId(this.id);">Ver Estadísticas</a></p>'
    }
  });
}

function storeId(id){
  localStorage["evento"] = id;
}

function confirmacion(evento){
  if(confirm("Si presiona OK se eliminará el evento " + evento)){
    eliminarEvento(evento);
  }
}

function eliminarEvento(evento){
  // import python-shell and path modules
  let { PythonShell } = require("python-shell");
  const path = require("path");

   // get number entered in the interface
  var nombreEvento = evento;

  // create option object with info for the python script
  // in this case, it specifies where the script is and the arguments that it uses
  const options = {
    mode: 'text',
    scriptPath : path.join(__dirname,'../linkers/'),
    args: [nombreEvento]
  };

  let auxiliar = "";
  PythonShell.run("deleteEvent.py", options, function (err, results) {
    if(err) throw err;
    auxiliar = String(results[0]);
    response();
  });

  // call the python script used look for a person in the "Database"

  // if the person is indeed in the "Database", return true, else return not
  function response(){
    if(auxiliar === "evento eliminado"){
      alert("Evento eliminado exitosamente")
      location.reload()
    }
    else{
        alert("ERROR en la eliminación del evento")
    }
  }
}

function descargar(evento){
  console.log("Descargando evento: " + evento);
}