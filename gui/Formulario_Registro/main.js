const{app, BrowserWindow} = require('electron')

    function createWindow(){
        //Creación de la ventana del navegador
        window = new BrowserWindow({width: 1500, height: 800})
        //Cargar archivo main.html de la app
        window.loadFile('formularioRegistro.html')
    }
app.on('ready', createWindow)