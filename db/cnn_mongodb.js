import mongoose from 'mongoose';

let isConnected = false;

const conectarMongoDB = async () => {
    if (isConnected) {
        console.log('Ya está conectado a MongoDB'.green);
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        isConnected = true;
        console.log('Conectado a MongoDB'.green);
    } catch (error) {
        console.error('Error al conectar a MongoDB'.red, error);
    }
}

const db = mongoose.connection;

db.on('error',(error) => {
    isConnected = false;
    console.error('Error al conectar a MongoDB'.red, error);
});

db.once('open', () => {
    isConnected = true;
});

db.on('disconnected', () => {
    isConnected = false;
    console.log('Desconectado de MongoDB'.yellow);
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('MongoDB desconectado'.yellow);
    process.exit(0);
})

export { conectarMongoDB, isConnected };