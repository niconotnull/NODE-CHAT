// Servidor de express
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors')


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Http Server
        this.server = http.createServer(this.app);

        // Configuración del socket server
        this.io = socketio(this.server, { /* Configuraciones */});
        
        
    }

    middelwares() {
        // Desplegar el contenido público
        this.app.use(express.static(path.resolve(__dirname, '../public')));
        
        // CORS
        this.app.use(cors());
    }

    configuracionSockets() {
        new Sockets(this.io);
    }

    execute() {
        
         // Inicializar middelware
        this.middelwares();
        // Inicializar sockets
        this.configuracionSockets();

        // Inicializar server
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto: ', this.port);
        });
    }

   


}

module.exports = Server;