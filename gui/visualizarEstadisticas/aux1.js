function edad(){
    document.getElementById("myChart1").style.display = 'none';
    document.getElementById("myChart2").style.display = 'block';
    document.getElementById("myChart3").style.display = 'none';
    document.getElementById("myChart4").style.display = 'none';
  
    
    var ctx = document.getElementById("myChart2");
    var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: 'Edad',
            data: [12, 19, 3, 5, 2, 3],
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
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: 'Número de asistentes',
            data: [12, 19, 3, 5, 2, 3],
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

function ocupacion(){
    document.getElementById("myChart1").style.display = 'none';
    document.getElementById("myChart2").style.display = 'none';
    document.getElementById("myChart3").style.display = 'block';
    document.getElementById("myChart4").style.display = 'none';
    
     
    var ctx = document.getElementById("myChart3");
    var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: 'Ocupación',
            data: [12, 19, 3, 5, 2, 3],
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
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: 'Sexo',
            data: [12, 19, 3, 5, 2, 3],
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