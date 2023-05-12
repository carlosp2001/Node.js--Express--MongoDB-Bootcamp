// En el archivo app.js mantenemos nuestra configuración de express
const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes.js')
const userRouter = require('./routes/userRoutes.js')
const app = express();

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint...');
// });

// 1) MIDDLEWARES

app.use(morgan('dev'));

app.use(express.json()); // Este es el middleware, es una función que puede modificar los datos de la solicitud
// entrante, se llama middleware porque se encuentra en medio de la solicitud y la respuesta

app.use((req, res, next) => {
    console.log('Hello from the middleware');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});






// 3) ROUTES


app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 4) START SERVER

module.exports = app;
