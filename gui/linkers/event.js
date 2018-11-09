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

function checkButtonStats(){
  let eventos = document.getElementById('tablaEventos');
  let rowLength = eventos.rows.length;
  for(i=1; i < rowLength; i++){

      let { PythonShell } = require("python-shell");
      const path = require("path");

      // get number entered in the interface
      let nombreEvento = eventos.rows[i].cells[0].innerHTML;
      let nombreArchivo = "Estadisticas_"+nombreEvento+".txt";

      // create option object with info for the python script
      // in this case, it specifies where the script is and the arguments that it uses
      const options = {
      mode: 'text',
      scriptPath : path.join(__dirname,'../linkers/'),
      args: [nombreArchivo]
      };

      let auxiliar = "";
      PythonShell.run("checkStats.py", options, function (err, results) {
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
              hideButtonStats(j-1);
          }
          else{
              showButtonStats(j-1);
          }
      }
  }
}

function showButtonStats(rowNumber){
  let tabla = document.getElementById('tablaEventos');
  let btn = tabla.rows.item(rowNumber).cells[3].childNodes[0].childNodes[0];
  btn.innerHTML = "Ver Estadísticas";
  btn.href = "../visualizarEstadisticas/estadisticas.html"
  btn.onclick = "#"
}

function hideButtonStats(rowNumber){
  let tabla = document.getElementById('tablaEventos');
  let btn = tabla.rows.item(rowNumber).cells[3].childNodes[0].childNodes[0];
  btn.innerHTML = "Descargar Estadísticas";
  btn.href = "#"
  btn.onclick = "descargarEstadisticas(this.id);";
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
      const xhttp = new XMLHttpRequest();
      xhttp.open("POST", `http://localhost:5000/add_event?nombre=${nombre}&lugar=${lugar}&fecha=${fecha}`, false);
      xhttp.send();
      const statusCode = xhttp.status;
      if(statusCode == 201){
        alert("Evento creado exitosamente")
        window.location.href = "../Eventos/eventos.html";
      }
      else{
        alert("ERROR en la creación del evento de parte del servidor")
      }
    }
    else{
        alert("ERROR en la creación del evento de parte del cliente")
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
     if(results != null) {
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
     }
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
       cell4.innerHTML = '<p id="verEstadisticas" class="pill-white btn"><a id="'+ nombreEvento +'" style="color: black" href="#" onclick="descargarEstadisticas(this.id); ">Descargar Estadísticas</a></p>'
      //  cell4.innerHTML = '<p id="verEstadisticas" class="pill-white btn"><a id="'+ nombreEvento +'" style="color: black" href="../visualizarEstadisticas/estadisticas.html" onclick="storeId(this.id);">Ver Estadísticas</a></p>'
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
      const xhttp = new XMLHttpRequest();
      xhttp.open("DELETE", `http://localhost:5000/remove_event?nombre=${nombreEvento}`, false);
      xhttp.send();
      const statusCode = xhttp.status;
      if(statusCode == 204){
        alert("Evento eliminado exitosamente")
        location.reload()
      }
      else{
        alert("ERROR en la eliminación del evento de parte del servidor")
      }
    }
    else{
        alert("ERROR en la eliminación del evento de parte del cliente")
    }
  }
}

function descargar(evento){
  console.log("Descargando evento: " + evento);
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", `http://localhost:5000/download_event/${evento}`, false);
  xhttp.send();
  const asistentesEvento = JSON.parse(xhttp.responseText);

  lon = Object.keys(asistentesEvento).length;
  if(lon > 0){
    let listaDoc_identidad = [];
    let listaSerial = [];
    let listaNombre = [];
    let listaCodigo = [];
    for(persona = 0; persona < lon; persona++){
      listaDoc_identidad.push(asistentesEvento[persona]["doc_identidad"]);
      listaSerial.push(asistentesEvento[persona]["serial"]);
      listaNombre.push(asistentesEvento[persona]["nombre"]);
      listaCodigo.push(asistentesEvento[persona]["codigo"]);
    }
    // import python-shell and path modules
    let { PythonShell } = require("python-shell");
    const path = require("path");

    // create option object with info for the python script
    // in this case, it specifies where the script is and the arguments that it uses
    const options = {
      mode: 'text',
      scriptPath : path.join(__dirname,'../linkers/'),
      args: [listaSerial,listaNombre,listaCodigo,listaDoc_identidad,evento]
    };

    let auxiliar = "";
    PythonShell.run("downloadEvents.py", options, function (err, results) {
      if(err) throw err;
      auxiliar = String(results[0]);
      response();
    });
    
    function response(){
      if(auxiliar === "Asistentes descargados exitosamente"){
        alert("Asistentes descargados exitosamente");
        checkButtons();
      }
      else{
        alert("Ocurrió un error en la descarga");
      }
    }
  }
  else{
    alert("No hay asistentes registrados para este evento");
  }
}

function descargarEstadisticas(evento){
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", `http://localhost:5000/download_stats/${evento}`, false);
  xhttp.send();
  const estadisticasEvento = JSON.parse(xhttp.responseText);

  lon = Object.keys(estadisticasEvento).length;
  if(lon > 0){
    let listaDoc_identidad = [];
    let listaSerial = [];
    let listaNombre = [];
    let listaCodigo = [];
    let listaOcupacion = [];
    let listaEdad = [];
    let listaSexo = [];
    let listaAsistio = [];

    for(persona = 0; persona < lon; persona++){
      listaDoc_identidad.push(estadisticasEvento[persona]["doc_identidad"]);
      listaSerial.push(estadisticasEvento[persona]["serial"]);
      listaNombre.push(estadisticasEvento[persona]["nombre"]);
      listaCodigo.push(estadisticasEvento[persona]["codigo"]);
      listaOcupacion.push(estadisticasEvento[persona]["ocupacion"]);
      listaEdad.push(estadisticasEvento[persona]["edad"]);
      listaSexo.push(estadisticasEvento[persona]["sexo"]);
      listaAsistio.push(estadisticasEvento[persona]["asistio"]);
    }
    // import python-shell and path modules
    let { PythonShell } = require("python-shell");
    const path = require("path");

    // create option object with info for the python script
    // in this case, it specifies where the script is and the arguments that it uses
    const options = {
      mode: 'text',
      scriptPath : path.join(__dirname,'../linkers/'),
      args: [listaSerial,listaNombre,listaCodigo,listaDoc_identidad,listaOcupacion,listaEdad,listaSexo,listaAsistio,evento]
    };

    let auxiliar = "";
    PythonShell.run("downloadStats.py", options, function (err, results) {
      if(err) throw err;
      auxiliar = String(results[0]);
      response();
    });
    
    function response(){
      if(auxiliar === "estadisticas descargadas exitosamente"){
        alert("Estadisticas descargadas exitosamente");
        checkButtonStats();
      }
      else{
        alert("Ocurrió un error en la descarga");
      }
    }
  }
  else{
    alert("No hay asistentes registrados para este evento");
  }
}