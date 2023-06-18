const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);

    process.exit(1);
});

dotenv.config({
    path: './config.env',
});

const app = require('./app');

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        // .connect(process.env.DATABASE_LOCAL, { // Base de datos local
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        // console.log(con.connections);
        console.log('DB Connection Successful!');
    });
// console.log(process.env);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

// TEST

process.on('unhandledRejection', (err) => {
    // Codigo 0 significa representa exito, Codigo 1 representa una excepcion no detectada
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err);
    server.close(() => {
        process.exit(1);
    });
});

// console.log(x);
