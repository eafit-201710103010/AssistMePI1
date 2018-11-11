/**
 * Script used to manage all the events
 * 
 * Update event and statistics tables, create a new event, delete an event and download event information
 */


 /** Update buttons from event table
  *  Once the event assistants are downloaded, the inscription button changes and the register can begin */
function checkButtons(){

  // For each event in the table call the python script to check if the info was downloaded 
  let eventos = document.getElementById('tablaEventos');
  let rowLength = eventos.rows.length;
  for(i=1; i < rowLength; i++){
      // import python-shell and path modules
      let { PythonShell } = require("python-shell");
      const path = require("path");

      // Get the event name from the table and the file name where the assistants information should be stored
      let nombreEvento = eventos.rows[i].cells[0].innerHTML;
      let nombreArchivo = "Asistentes_"+nombreEvento+".txt";

      // create option object with info for the python script
      // in this case, it specifies where the script is and the arguments that it uses
      const options = {
      mode: 'text',
      scriptPath : path.join(__dirname,'../linkers/'),
      args: [nombreArchivo]
      };

      // Call the python script used to check if the event assistants was downloaded from the database
      // The variable "auxiliar" stores the response from the pyhton script
      let auxiliar = "";
      PythonShell.run("checkAssistance.py", options, function (err, results) {
      if(err) throw err;
      auxiliar = String(results[0]);
      response(nombreEvento);
      });

      // Receives the event name and updates the buttons if the assistants was downloaded
      function response(evento){
          let nombreEventoTabla = "";
          let j = 0;
          // Loops through the table until it finds the row where "evento" is stored
          while(evento !== nombreEventoTabla){
              nombreEventoTabla = eventos.rows[j].cells[0].innerHTML;
              j++;
          }
          // if the assistants haven't been downloaded, calls function "hideButton", otherwise, calls function "showButtonRegister"
          // "j-1" represents the row number where "evento" is stored
          if(auxiliar === "Vacio"){
              hideButton(j-1);
          }
          else{
              showButtonRegister(j-1);
          }
      }
  }
}

/** Once the event assistance is downloaded, the download button is hidden and the inscription button is replaced with the register button  */
function showButtonRegister(rowNumber){
  let tabla = document.getElementById('tablaEventos');
  // Inscription button
  let btn1 = tabla.rows.item(rowNumber).cells[3].childNodes[0].childNodes[0];
  // Download button
  let btn2 = tabla.rows.item(rowNumber).cells[4].childNodes[0];
  // Change inscription button with register button
  btn1.innerHTML = "Registrar";
  btn1.href = "../Registro/registro.html"
  // Hide download button
  btn2.style.display = "none";
}

/** In case the assistance hasn't been downloaded the inscription button is displayed */
function hideButton(rowNumber){
  let tabla = document.getElementById('tablaEventos');
  let btn1 = tabla.rows.item(rowNumber).cells[3].childNodes[0].childNodes[0];
  btn1.innerHTML = "Inscribir";
  btn1.href = "../Formulario_Registro/formularioRegistro.html"
}

/** Update buttons from event statistics table
 * Once the event statistics are downloaded, the download button is hidden and the view stats replace it */
function checkButtonStats(){
  let eventos = document.getElementById('tablaEventos');
  let rowLength = eventos.rows.length;
  // For each event in the table call the python script to check if the info was downloaded 
  for(i=1; i < rowLength; i++){
      // import python-shell and path modules
      let { PythonShell } = require("python-shell");
      const path = require("path");

      // Get the event name from the table and the file name where the event information should be stored
      let nombreEvento = eventos.rows[i].cells[0].innerHTML;
      let nombreArchivo = "Estadisticas_"+nombreEvento+".txt";

      // create option object with info for the python script
      // in this case, it specifies where the script is and the arguments that it uses
      const options = {
      mode: 'text',
      scriptPath : path.join(__dirname,'../linkers/'),
      args: [nombreArchivo]
      };

      // Call the python script used to check if the event statistics was downloaded from the database
      // The variable "auxiliar" stores the response from the pyhton script
      let auxiliar = "";
      PythonShell.run("checkStats.py", options, function (err, results) {
      if(err) throw err;
      auxiliar = String(results[0]);
      response(nombreEvento);
      });

      // Receives the event name and updates the buttons if the information was downloaded
      function response(evento){
          let nombreEventoTabla = "";
          let j = 0;
          // Loops through the table until it finds the row where "evento" is stored
          while(evento !== nombreEventoTabla){
              nombreEventoTabla = eventos.rows[j].cells[0].innerHTML;
              j++;
          }
          // if the information hasn't been downloaded, calls function "hideButtonStats", otherwise, calls function "showButtonStats"
          // "j-1" represents the row number where "evento" is stored
          if(auxiliar === "No vacio"){
            console.log("No vacio")
            showButtonStats(j-1);
          }
          else{
            console.log("vacio")
            hideButtonStats(j-1);
          }
      }
  }
}

/** Once the event statistics are downloaded, the download button is hidden and the view stats button replaces it  */
function showButtonStats(rowNumber){
  let tabla = document.getElementById('tablaEventos');
  // Download button
  let btnDescarga = tabla.rows.item(rowNumber).cells[3];
  // View button
  let btnVer = tabla.rows.item(rowNumber).cells[4];
  // Hide download button
  btnDescarga.style.display = "none";
  // Display view button
  btnVer.style.display = "";
}

/** In case the event statistics haven't been downloaded the download button is displayed and the view stats is hidden */
function hideButtonStats(rowNumber){
  let tabla = document.getElementById('tablaEventos');
  // Download button
  let btnDescarga = tabla.rows.item(rowNumber).cells[3];
  // View button
  let btnVer = tabla.rows.item(rowNumber).cells[4];
  // Display download button
  btnDescarga.style.display = "";
  // Hide view button
  btnVer.style.display = "none";
}

/** Create a new event and store it the the database */
function createEvent(){ 

    // import python-shell and path modules
    let { PythonShell } = require("python-shell");
    const path = require("path");
  
    // get event name, place and date entered in the interface
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
  
    // Call the python script used to add a new event and store it in a local text file
    // The variable "auxiliar" stores the response from the pyhton script
    let auxiliar = "";
    PythonShell.run("createEvent.py", options, function (err, results) {
      if(err) throw err;
      auxiliar = String(results[0]);
      response();
    });

  // If the event was successfully added to the text file, connect to the server and store the event in the database, else show the client an error alert
  function response(){
    if(auxiliar === "evento creado"){
      const xhttp = new XMLHttpRequest();
      xhttp.open("POST", `http://localhost:5000/add_event?nombre=${nombre}&lugar=${lugar}&fecha=${fecha}`, false);
      xhttp.send();
      // Status code stores the response from the server, if it's "201" the event was successfully added, otherwise there was an error
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

/** Update event table, creates the table and adds the events stored in the database */
function updateTable(){

   // import python-shell and path modules
   let { PythonShell } = require("python-shell");
   const path = require("path");
 
   // create option object with info for the python script
   const options = {
     mode: 'text',
     scriptPath : path.join(__dirname,'../linkers/'),
     args: []
   };
   
   // Call the python script used to read the text file where the events are stored
   // The variable "auxiliar" stores the response from the pyhton script
   PythonShell.run("eventTable.py", options, function (err, results) {
     if(err) throw err;
     let eventos = document.getElementById('tablaEventos');
     // If the file isn't empty creates a new row with five columns for each event
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

          cell1.innerHTML = results[i]; // Event name
          cell2.innerHTML = results[i+1]; // Place
          cell3.innerHTML = results[i+2]; // Date
          cell4.innerHTML = '<p class="pill-white btn"><a id="'+ nombreEvento +'" style="color: black" href="../Formulario_Registro/formularioRegistro.html" onclick="storeId(this.id);">Inscribir</a></p>' // Inscription button
          cell5.innerHTML = '<p class="pill-white btn"><a id="'+ nombreEvento +'" style="color: black" href="#" onclick="descargar(this.id);">Descargar</a></p>' // Download button
          cell6.innerHTML = '<p class="btn"><i class="glyphicon glyphicon-trash" id="'+ nombreEvento +'" style="font-size:15px;color:black" onclick="confirmacion(this.id);"></i></p>' // Delete button
      }
      // Change buttons that need to be changed
      checkButtons();
     }
   });
  
}

/** Update event statistics table, creates the table and adds the events downloaded from the database
 *  Only adds to the table the events that have already been downloaded from the database */
function updateTableEvents(){

  // import python-shell and path modules
  let { PythonShell } = require("python-shell");
  const path = require("path");

  // create option object with info for the python script
  const options = {
    mode: 'text',
    scriptPath : path.join(__dirname,'../linkers/'),
    args: []
  };

  // Call the python script used to read the text file where the events are stored and check if each event is downloaded
  PythonShell.run("tableCharts.py", options, function (err, results) {
    if(err) throw err;
    let eventos = document.getElementById('tablaEventos');

    // If the file isn't empty creates a new row with five columns for each event
    for(i=0; i<results.length; i+=4){
       let rowLength = eventos.rows.length;
       let row = eventos.insertRow(rowLength);
       let cell1 = row.insertCell(0);
       let cell2 = row.insertCell(1);
       let cell3 = row.insertCell(2);
       let cell4 = row.insertCell(3);
       let cell5 = row.insertCell(4);

       let nombreEvento = results[i];

       cell1.innerHTML = results[i]; // Event name
       cell2.innerHTML = results[i+1]; // Place
       cell3.innerHTML = results[i+2]; // Date
       cell4.innerHTML = '<p id="verEstadisticas" class="pill-white btn"><a id="'+ nombreEvento +'" style="color: black" href="#" onclick="descargarEstadisticas(this.id); ">Descargar Estadísticas</a></p>' // Download statistics button
       cell5.innerHTML = '<p id="verEstadisticas" class="pill-white btn"><a id="'+ nombreEvento +'" style="color: black" href="../visualizarEstadisticas/estadisticas.html" onclick="storeId(this.id); ">Visualizar Estadísticas</a></p>' // View statistics button
    }
    // Change buttons that need to be changed 
    checkButtonStats();
  });
}

/** Store the name of the event in the local storage so that it can be accessed to from another html page */
function storeId(id){
  localStorage["evento"] = id;
}

/** Asks the client if they realy want to delete the event, if the answer is "yes" calls the function "eliminarEvento"  */
function confirmacion(evento){
  if(confirm("Si presiona OK se eliminará el evento " + evento)){
    eliminarEvento(evento);
  }
}

/** Delete event given from the database */
function eliminarEvento(evento){

  // import python-shell and path modules
  let { PythonShell } = require("python-shell");
  const path = require("path");

  // Store event name to be deleted
  var nombreEvento = evento;

  // create option object with info for the python script
  // in this case, it specifies where the script is and the arguments that it uses
  const options = {
    mode: 'text',
    scriptPath : path.join(__dirname,'../linkers/'),
    args: [nombreEvento]
  };

  // Call the python script used to delete a event from a local text file
  // The variable "auxiliar" stores the response from the pyhton script
  let auxiliar = "";
  PythonShell.run("deleteEvent.py", options, function (err, results) {
    if(err) throw err;
    auxiliar = String(results[0]);
    response();
  });

  // if the event was succesfully deleted from the text file, connect to the server and delete it from the database
  function response(){
    if(auxiliar === "evento eliminado"){
      const xhttp = new XMLHttpRequest();
      xhttp.open("DELETE", `http://localhost:5000/remove_event?nombre=${nombreEvento}`, false);
      xhttp.send();
      // If the response from the server is "204" the event was successfully deleted, else there was an error
      const statusCode = xhttp.status;
      if(statusCode == 204){
        alert("Evento eliminado exitosamente")
        // reload the page to update the table
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

/** Connect to the server and get information of the people registered for the event */
function descargar(evento){
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", `http://localhost:5000/download_event/${evento}`, false);
  xhttp.send();
  const asistentesEvento = JSON.parse(xhttp.responseText);

  // Checks if there's at least one person registered for the event and store the information por each person in a text file
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

    // Call the python script used to write the information from each person in a text file
    // The variable "auxiliar" stores the response from the pyhton script
    let auxiliar = "";
    PythonShell.run("downloadEvents.py", options, function (err, results) {
      if(err) throw err;
      auxiliar = String(results[0]);
      response();
    });
    
    // if the information was succesfully stored in the text file, show confirmation to the client and update the buttons from the table, otherwise there was an error
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

/** Connect to the server and get information of the event assistance to create the statistics */
function descargarEstadisticas(evento){
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", `http://localhost:5000/download_stats/${evento}`, false);
  xhttp.send();
  const estadisticasEvento = JSON.parse(xhttp.responseText);

  // Check if there was at least one assistant to the event and store the information in a text file
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

    // Call the python script used to write the information from each event in a text file
    // The variable "auxiliar" stores the response from the pyhton script
    let auxiliar = "";
    PythonShell.run("downloadStats.py", options, function (err, results) {
      if(err) throw err;
      auxiliar = String(results[0]);
      response();
    });
    
    // if the information was succesfully stored in the text file, show confirmation to the client and update the buttons from the table, otherwise there was an error
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