import express from 'express';
import cors from 'cors';
import indexRoutes from '../routes/index.routes.js';
import * as db from '../db/cnn_mongodb.js';


export default class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.generalRoute= '/api/';
        this.conectarDBMongo();
        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
    }
    async conectarDBMongo() {
        if(!db.isConnected) {
            await db.conectarMongoDB();
        }
    }
    middlewares() {
        // CORS
        this.app.use(cors());
        // Lectura y parseo del body
        this.app.use(express.json());
        // Directorio público
        this.app.use(express.static('public'));
    }
    
    routes() {
        // localhost:3000/api/ejemplo/prueba
        this.app.use(this.generalRoute, indexRoutes);

    }

    listen() {
        this.app.listen(this.port, () => {
        console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}
