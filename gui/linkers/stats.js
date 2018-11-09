function calcularEdad(){
    let { PythonShell } = require("python-shell");
    const path = require("path");

    const evento = localStorage["evento"];

    // create option object with info for the python script
    // in this case, it specifies where the script is and the arguments that it uses
    const options = {
        mode: 'text',
        scriptPath : path.join(__dirname,'../linkers/'),
        args: [evento]
    };
    
    PythonShell.run("calcular_edad.py", options, function (err, results) {
        if(err) throw err;
        edad(results);
    });
}

function edad(listaEdades){
    document.getElementById("myChart1").style.display = 'none';
    document.getElementById("myChart2").style.display = 'block';
    document.getElementById("myChart3").style.display = 'none';
    document.getElementById("myChart4").style.display = 'none';
  
    
    var ctx = document.getElementById("myChart2");
    var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["-18", "18-25","25-35","35-45","45-55","55+"],
        datasets: [{
            label: 'Edad',
            data: listaEdades,
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
                display: false,
                labels: {
                    fontColor: "white"
                }
            }
        }
    });
}

function calcularAsistencia(){
    let { PythonShell } = require("python-shell");
    const path = require("path");

    const evento = localStorage["evento"];

    // create option object with info for the python script
    // in this case, it specifies where the script is and the arguments that it uses
    const options = {
        mode: 'text',
        scriptPath : path.join(__dirname,'../linkers/'),
        args: [evento]
    };
    
    PythonShell.run("calcular_asistencia.py", options, function (err, results) {
        if(err) throw err;
        asistencia(results);
        let asistentes = parseInt(results[1]);
        let inscritos = parseInt(results[0]) + parseInt(results[1]);
        localStorage["asistentes"] = asistentes;
        localStorage["inscritos"] = inscritos;
    });
}

function asistencia(listaAsistencia){
    document.getElementById("myChart1").style.display = 'block'
    document.getElementById("myChart2").style.display = 'none';
    document.getElementById("myChart3").style.display = 'none';
    document.getElementById("myChart4").style.display = 'none';  
    

    var ctx = document.getElementById("myChart1");
    var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ["Ausentes", "Asistentes"],
        datasets: [{
            label: 'Número de asistentes',
            data: listaAsistencia,
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

function calcularOcupacion(){
    let { PythonShell } = require("python-shell");
    const path = require("path");

    const evento = localStorage["evento"];

    // create option object with info for the python script
    // in this case, it specifies where the script is and the arguments that it uses
    const options = {
        mode: 'text',
        scriptPath : path.join(__dirname,'../linkers/'),
        args: [evento]
    };
    
    PythonShell.run("calcular_ocupacion.py", options, function (err, results) {
        if(err) throw err;
        ocupacion(results);
    });
}

function ocupacion(listaOcupacion){
    document.getElementById("myChart1").style.display = 'none';
    document.getElementById("myChart2").style.display = 'none';
    document.getElementById("myChart3").style.display = 'block';
    document.getElementById("myChart4").style.display = 'none';
    
     
    var ctx = document.getElementById("myChart3");
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
            data: listaOcupacion,
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
                display: false
            }
        }
    });
}

function calcularSexo(){
    let { PythonShell } = require("python-shell");
    const path = require("path");

    const evento = localStorage["evento"];

    // create option object with info for the python script
    // in this case, it specifies where the script is and the arguments that it uses
    const options = {
        mode: 'text',
        scriptPath : path.join(__dirname,'../linkers/'),
        args: [evento]
    };
    
    PythonShell.run("calcular_sexo.py", options, function (err, results) {
        if(err) throw err;
        sexo(results);
    });
}

function sexo(listaSexo){
    document.getElementById("myChart1").style.display = 'none';
    document.getElementById("myChart2").style.display = 'none';
    document.getElementById("myChart3").style.display = 'none';
    document.getElementById("myChart4").style.display = 'block';
     

    var ctx = document.getElementById("myChart4");
    var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ["Hombre", "Mujer"],
        datasets: [{
            label: 'Sexo',
            data: listaSexo,
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