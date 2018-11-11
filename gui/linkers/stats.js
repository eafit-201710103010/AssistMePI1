/**
 * Script used to calculate the statistics from the event based on its assistants 
 * 
 * Age, assistance, occupation and gender charts
 */

 /** Function used to get the age from each assistant and create the chart based on this information */
function calcularEdad(){
    // import python-shell and path modules
    let { PythonShell } = require("python-shell");
    const path = require("path");

    // Get the name of the event
    const evento = localStorage["evento"];

    // create option object with info for the python script
    // in this case, it specifies where the script is and the arguments that it uses
    const options = {
        mode: 'text',
        scriptPath : path.join(__dirname,'../linkers/'),
        args: [evento]
    };
    
    // Call the pyhton script used to get the age information from each assistant
    PythonShell.run("calcular_edad.py", options, function (err, results) {
        if(err) throw err;
        edad(results);
    });
}

/** Function used to display the chart with the information given */
function edad(listaEdades){
    document.getElementById("myChart1").style.display = 'none'; // hide assistance chart
    document.getElementById("myChart2").style.display = 'block'; // show age chart
    document.getElementById("myChart3").style.display = 'none'; // hide occupation chart
    document.getElementById("myChart4").style.display = 'none'; // hide gender chart
  
    
    var ctx = document.getElementById("myChart2");
    // Create the chart
    var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["-18", "18-25","25-35","35-45","45-55","55+"],
        datasets: [{
            label: 'Edad',
            data: listaEdades, // list of number of people aged younger than 18, 18 to 25, 25 to 35, 35 to 45, 45 to 55 and older than 55 years old
            backgroundColor: [
                'rgba(255, 0, 0, 1)',
                'rgba(0, 0, 245, 1)',
                'rgba(255, 229, 36, 1)',
                'rgba(69, 219, 0, 1)',
                'rgba(134, 0, 230, 1)',
                'rgba(230, 111, 0, 1)'
        ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                    beginAtZero:true
                    }
                }]
            },
            legend: {
                display: false, // Hide the label
                labels: {
                    fontColor: "white"
                }
            }
        }
    });
}

/** Function used to get the assistance information and create the chart based on this */
function calcularAsistencia(){
    // import python-shell and path modules
    let { PythonShell } = require("python-shell");
    const path = require("path");

    // Get the name of the event
    const evento = localStorage["evento"];

    // create option object with info for the python script
    // in this case, it specifies where the script is and the arguments that it uses
    const options = {
        mode: 'text',
        scriptPath : path.join(__dirname,'../linkers/'),
        args: [evento]
    };
    
    // Call the python script used to get the assistance information
    PythonShell.run("calcular_asistencia.py", options, function (err, results) {
        if(err) throw err;
        asistencia(results);
    });
}

/** Function used to display the chart with the information given */
function asistencia(listaAsistencia){
    document.getElementById("myChart1").style.display = 'block' // show assistance chart
    document.getElementById("myChart2").style.display = 'none'; // hide age chart
    document.getElementById("myChart3").style.display = 'none'; // hide occupation chart
    document.getElementById("myChart4").style.display = 'none';  // hide gender chart
    
    var ctx = document.getElementById("myChart1");
    // Create the chart
    var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ["Ausentes", "Asistentes"],
        datasets: [{
            label: 'Número de asistentes',
            data: listaAsistencia, // list of number of absent people and assistants 
            backgroundColor: [
                'rgba(255, 0, 0, 1)',
                'rgba(0, 0, 245, 1)',
                'rgba(255, 229, 36, 1)',
                'rgba(69, 219, 0, 1)',
                'rgba(134, 0, 230, 1)',
                'rgba(230, 111, 0, 1)'
        ],
            borderColor: [
                'rgba(255,0,0,1)',
                'rgba(0, 0, 245, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                beginAtZero:true
                }
            }]
        },
        legend: {
            labels: {
                fontColor: "white"
            }
        }
    }
});
}

/** Function used to get the occupation from each assistant and create the chart based on this information */
function calcularOcupacion(){
    // import python-shell and path modules
    let { PythonShell } = require("python-shell");
    const path = require("path");

    // Get the name of the event
    const evento = localStorage["evento"];

    // create option object with info for the python script
    // in this case, it specifies where the script is and the arguments that it uses
    const options = {
        mode: 'text',
        scriptPath : path.join(__dirname,'../linkers/'),
        args: [evento]
    };
    
    // Call python script used to get the occupation from each assistant
    PythonShell.run("calcular_ocupacion.py", options, function (err, results) {
        if(err) throw err;
        ocupacion(results);
    });
}

/** Function used to create the chart with the information given */
function ocupacion(listaOcupacion){
    document.getElementById("myChart1").style.display = 'none'; // hide assistance chart
    document.getElementById("myChart2").style.display = 'none'; // hide age chart
    document.getElementById("myChart3").style.display = 'block'; // show occupation chart
    document.getElementById("myChart4").style.display = 'none'; // hide gender chart
    
     
    var ctx = document.getElementById("myChart3");
    // Create the chart
    var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: [
                 "Administracion de negocios", 
                 "Bioligia", 
                 "Ciencias politicas", 
                 "Comunicacion social", 
                 "Contaduria publica", 
                 "Derecho", 
                 "Economia", 
                 "Estudiante", 
                 "Finanzas", 
                 "Geologia", 
                 "Ing. Civil", 
                 "Ing. de Diseño de producto",
                 "Ing. Fisica", 
                 "Ing. Matematica", 
                 "Ing. Mecanica", 
                 "Ing. de Procesos",
                 "Ing. de Produccion", 
                 "Ing. de Sistemas", 
                 "Literatura", 
                 "Mercadeo", 
                 "Musica", 
                 "Negocios Internacionales", 
                 "Psicologia"
                ],
        datasets: [{
            label: 'Ocupación',
            data: listaOcupacion, // List of number of people from each occupation
            backgroundColor: [
                'rgba(255, 0, 0, 1)',
                'rgba(0, 0, 245, 1)',
                'rgba(255, 229, 36, 1)',
                'rgba(69, 219, 0, 1)',
                'rgba(134, 0, 230, 1)',
                'rgba(230, 111, 0, 1)',
                'rgba(177, 236, 0, 1)',
                'rgba(69, 139, 211, 1)',
                'rgba(184, 139, 211, 1)',
                'rgba(80, 39, 68, 1)',
                'rgba(182, 7, 170, 1)',
                'rgba(182, 7, 236, 1)',
                'rgba(246, 80, 236, 1)',
                'rgba(43, 45, 236, 1)',
                'rgba(43, 45, 50, 1)',
                'rgba(43, 123, 50, 1)',
                'rgba(82, 55, 50, 1)',
                'rgba(82, 55, 196, 1)',
                'rgba(80, 141, 143, 1)',
                'rgba(249, 141, 143, 1)',
                'rgba(41, 141, 143, 1)',
                'rgba(41, 247, 240, 1)',
                'rgba(241, 222, 223, 1)'
                
        ],
            borderColor: [
                'rgba(255, 0, 0, 1)',
                'rgba(0, 0, 245, 1)',
                'rgba(255, 229, 36, 1)',
                'rgba(69, 219, 0, 1)',
                'rgba(134, 0, 230, 1)',
                'rgba(230, 111, 0, 1)',
                'rgba(177, 236, 0, 1)',
                'rgba(69, 139, 211, 1)',
                'rgba(184, 139, 211, 1)',
                'rgba(80, 39, 68, 1)',
                'rgba(182, 7, 170, 1)',
                'rgba(182, 7, 236, 1)',
                'rgba(246, 80, 236, 1)',
                'rgba(43, 45, 236, 1)',
                'rgba(43, 45, 50, 1)',
                'rgba(43, 123, 50, 1)',
                'rgba(82, 55, 50, 1)',
                'rgba(82, 55, 196, 1)',
                'rgba(80, 141, 143, 1)',
                'rgba(249, 141, 143, 1)',
                'rgba(41, 141, 143, 1)',
                'rgba(41, 247, 240, 1)',
                'rgba(241, 222, 223, 1)'
            ],
            borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                    beginAtZero:true
                    }
                }]
            },
            legend: {
                display: false // Hide labels
            }
        }
    });
}

/** Function used to get the gender from each assistant and create the chart based on this information */
function calcularSexo(){
    // import python-shell and path modules
    let { PythonShell } = require("python-shell");
    const path = require("path");

    // Get the name of the event
    const evento = localStorage["evento"];

    // create option object with info for the python script
    // in this case, it specifies where the script is and the arguments that it uses
    const options = {
        mode: 'text',
        scriptPath : path.join(__dirname,'../linkers/'),
        args: [evento]
    };
    
    // Call the pyhon script used to get the gender from each assistant
    PythonShell.run("calcular_sexo.py", options, function (err, results) {
        if(err) throw err;
        sexo(results);
    });
}

/** Function used to create the chart with the information given */
function sexo(listaSexo){
    document.getElementById("myChart1").style.display = 'none'; // hide assistance chart
    document.getElementById("myChart2").style.display = 'none'; // hide age chart
    document.getElementById("myChart3").style.display = 'none'; // hide occupation chart
    document.getElementById("myChart4").style.display = 'block'; // show gender chart
     

    var ctx = document.getElementById("myChart4");
    // Create the chart
    var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ["Hombre", "Mujer"],
        datasets: [{
            label: 'Sexo',
            data: listaSexo, // List with the number of men and women that assisted to the event
            backgroundColor: [
                'rgba(0, 0, 255, 1)',
                'rgba(251, 148, 173, 1)',
                'rgba(0, 229, 0, 1)',
                'rgba(69, 219, 0, 1)',
                'rgba(134, 0, 230, 1)',
                'rgba(230, 111, 0, 1)'
        ],
            borderColor: [
                'rgba(0, 0, 255, 1)',
                'rgba(251, 148, 173, 1)',
                'rgba(0, 229, 0, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                    beginAtZero:true
                    }
                }]
            },
            legend: {
                labels: {
                    fontColor: "white"
                }
            }
        }
    });
}