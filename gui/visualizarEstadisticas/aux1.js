function edad(){
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
            data: [106, 324, 60, 12, 2, 0],
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
            }
        }
    });
}

function asistencia(){
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
            data: [8, 628],
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
        }
    }
});
}

function ocupacion(){
    document.getElementById("myChart1").style.display = 'none';
    document.getElementById("myChart2").style.display = 'none';
    document.getElementById("myChart3").style.display = 'block';
    document.getElementById("myChart4").style.display = 'none';
    
     
    var ctx = document.getElementById("myChart3");
    var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["Estudiante EAFIT", "Estudiante Externo", "Profesional", "Emprendedor", "Egresado"],
        datasets: [{
            label: 'Ocupación',
            data: [376, 121, 63, 25, 2],
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
            }
        }
    });
}

function sexo(){
    document.getElementById("myChart1").style.display = 'none';
    document.getElementById("myChart2").style.display = 'none';
    document.getElementById("myChart3").style.display = 'none';
    document.getElementById("myChart4").style.display = 'block';
     

    var ctx = document.getElementById("myChart4");
    var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["Hombre", "Mujer"],
        datasets: [{
            label: 'Sexo',
            data: [221, 412],
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
            }
        }
    });
}