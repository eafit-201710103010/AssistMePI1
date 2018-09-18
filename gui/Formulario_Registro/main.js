const{app, BrowserWindow} = require('electron')

    function createWindow(){
        //Creación de la ventana del navegador
        window = new BrowserWindow({width: 800, height: 600})
        //Cargar archivo main.html de la app
        window.loadFile('main.html')
    }
app.on('ready', createWindow)