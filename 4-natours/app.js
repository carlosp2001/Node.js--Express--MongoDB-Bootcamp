// En el archivo app.js mantenemos nuestra configuración de express
const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

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

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 2) ROUTE HANDLERS

const getAllTours = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {tours},
    });
};

const getTour = (req, res) => {
    // Podemos crear parametro opcional agregando ?
    console.log(req.params);
    const id = req.params.id * 1;
    const tour = tours.find((el) => el.id === id);

    // if (id>tours.length)
    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }

    console.log(tour);
    res.status(200).json({
        status: 'success',
        data: {tour},
    });
};

const createTour = (req, res) => {
    // Req contiene toda la información sobre la solicitud que se realizó, los datos que se envian estan
    // contenidos acá
    // console.log(req.body);
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);

    tours.push(newTour);
    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        (err) => {
            res.status(201).json({
                status: 'success',
                data: {
                    tour: newTour,
                },
            }); // El codigo 201 significado creado
        }
    );
};

const updateTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Updated tour here...>',
        },
    });
};

const deleteTour = (req, res) => {
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }

    res.status(204).json({
        status: 'success',
        data: null,
    });
};

const getAllUsers = (req, res, next) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined',
    });
};

const getUser = (req, res, next) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined',
    });
};

const createUser = (req, res, next) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined',
    });
};

const updateUser = (req, res, next) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined',
    });
};

const deleteUser = (req, res, next) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined',
    });
};

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);

// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// 3) ROUTES

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(createTour);

tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(createUser);

userRouter
    .route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 4) START SERVER
const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
