// const fs = require('fs');
const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

// const tours = JSON.parse(
//     fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// exports.checkID = (req, res, next, val) => {
//     // if (id>tours.length)
//     console.log(`Tour id is ${val}`);
//     if (req.params.id * 1 > tours.length) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid ID',
//         });
//     }
//     next();
// };

// exports.checkBody = (req, res, next) => {
//     if (!req.body.name || !req.body.price) {
//         return res.status(400).json({
//             status: 'fail',
//             message: 'Missing name or price',
//         });
//     }

//     next();
// };

exports.aliasTopTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = 'price, -ratingsAverage';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
};

// exports.getAllTours = catchAsync(async (req, res, next) => {
//     // console.log(req.query);
//     // BUILD QUERY
//     // 1A) Filtering
//     // const queryObj = { ...req.query };
//     // const excludedFields = ['page', 'sort', 'limit', 'fields'];
//     // excludedFields.forEach((el) => delete queryObj[el]);
//
//     // // 1B) Advanced filtering
//     // let queryStr = JSON.stringify(queryObj);
//     // queryStr = queryStr.replace(
//     //     /\b(gte|gt|lte|lt)\b/g,
//     //     (match) => `$${match}`
//     // ); // g significa que reemplazará multiples veces en la cade de texto
//     // console.log(JSON.parse(queryStr));
//
//     // let query = Tour.find(JSON.parse(queryStr));
//     // {difficulty: 'easy', duration: { $gte: 5}}
//     // Queremos cambiar gte, gt, lte, lt
//
//     // const query = await Tour.find({
//     //     duration: 5,
//     //     difficulty: 'easy',
//     // });
//
//     // const query = await Tour.find()
//     //     .where('duration')
//     //     .equals(5)
//     //     .where('difficulty')
//     //     .equals('easy');
//
//     // 2) Sorting
//     // if (req.query.sort) {
//     //     const sortBy = req.query.sort.split(',').join(' ');
//     //     console.log(sortBy);
//     //     query = query.sort(sortBy);
//     //     // sort('price ratingsAverage')
//     // } else {
//     //     query = query.sort('-createdAt -price');
//     // }
//
//     // 3) Field limiting
//     // if (req.query.fields) {
//     //     const fields = req.query.fields.split(',').join(' ');
//     //     // query = query.select('name space duration')
//     //     query = query.select(fields);
//     // } else {
//     //     query = query.select('-__v');
//     // }
//
//     // 4) Pagination
//     // const page = req.query.page * 1 || 1;
//     // const limit = req.query.limit * 1 || 100;
//     // const skip = (page - 1) * limit;
//     // console.log(skip);
//     // // page=2&limit=10, 1-10, page 1, 11-20, page 2, 21-30, page 3
//     // query = query.skip(skip).limit(limit);
//
//     // if (req.query.page) {
//     //     const numTours = await Tour.countDocuments();
//     //     if (skip >= numTours) throw new Error('This page does not exist');
//     // }
//
//     // EXECUTE QUERY
//     const features = new APIFeatures(Tour.find(), req.query)
//         .filter()
//         .sort()
//         .limitFields()
//         .paginate(0);
//     const tours = await features.query;
//     // query.sort().select().skip().limit()
//
//     // SEND RESPONSE
//     res.status(200).json({
//         status: 'success',
//         // requestedAt: req.requestTime,
//         results: tours.length,
//         data: { tours }
//     });
//     // console.log(err);
// });

// exports.getTour = catchAsync(async (req, res, next) => {
//     // Podemos crear parametro opcional agregando ?
//     const tour = await Tour.findById(req.params.id).populate('reviews');
//     // Tour.findOne({_id: req.params.id})
//     // console.log(req.params);
//     console.log(tour);
//
//     if (!tour) {
//         return next(new AppError('No tour found with that ID', 404));
//     }
//     res.status(200).json({
//         status: 'success',
//         data: { tour }
//     });
//
//     // const tour = tours.find((el) => el.id === id);
//
//     // console.log(tour);
//     // res.status(200).json({
//     //     status: 'success',
//     //     data: { tour },
//     // });
// });

exports.getTour = factory.getOne(Tour, { path: 'reviews' });
exports.getAllTours = factory.getAll(Tour);
exports.createTour = factory.createOne(Tour);
exports.updateTour = factory.updateOne(Tour);
exports.deleteTour = factory.deleteOne(Tour);
// With no factory functions //
// exports.createTour = catchAsync(async (req, res, next) => {
//     // Req contiene toda la información sobre la solicitud que se realizó, los datos que se envian estan
//     // contenidos acá
//     // console.log(req.body);
//     // const newId = tours[tours.length - 1].id + 1;
//     // // eslint-disable-next-line prefer-object-spread
//     // const newTour = Object.assign({ id: newId }, req.body);
//
//     // tours.push(newTour);
//     // fs.writeFile(
//     //     `${__dirname}/dev-data/data/tours-simple.json`,
//     //     JSON.stringify(tours),
//     //     (err) => {
//     //         res.status(201).json({
//     //             status: 'success',
//     //             data: {
//     //                 tour: newTour,
//     //             },
//     //         }); // El codigo 201 significado creado
//     //     }
//     // );
//
//     // Forma de hacerlo directamente desde el documento
//     // const newTour = new Tour({});
//     // newTour.save();
//
//     // Forma de hacerlo desde el objeto
//     console.log(req.body);
//     const newTour = await Tour.create(req.body);
//
//     res.status(201).json({
//         status: 'success',
//         data: {
//             tour: newTour
//         }
//     }); // El codigo 201 significado creado
//
//     // try {
//
//     // } catch (err) {
//     //     // console.log(err);
//     //     res.status(400).json({ status: 'fail', message: err });
//     // }
// });

// With no handler factory function
// exports.updateTour = catchAsync(async (req, res, next) => {
//     const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators: true,
//     }); // Con el parametro new nos devolvera el
//     // documento ya actualizado
//
//     if (!tour) {
//         return next(new AppError('No tour found with that ID', 404));
//     }
//
//     res.status(200).json({
//         status: 'success',
//         data: {
//             tour,
//         },
//     });
// });

// Sin factory handler
// exports.deleteTour = catchAsync(async (req, res, next) => {
//     const tour = await Tour.findByIdAndDelete(req.params.id);
//
//     if (!tour) {
//         return next(new AppError('No tour found with that ID', 404));
//     }
//
//     res.status(204).json({
//         status: 'success',
//         data: null,
//     });
// });

exports.getToursStats = catchAsync(async (req, res, next) => {
    console.log('ehlsd');
    const stats = await Tour.aggregate([
        // La tuberia de agregacion (aggregation pipeline) nos ayuda para
        // calcular analisis de los datos que hay en la base de datos
        // podemos calcular sum, promedios, min y max de datos.
        // Tiene diferentes etapas, la primera es match que es el primer
        // filtro que aplicamos,
        // Luego la etapa de agrupacion que es donde definimos que datos
        // queremos obtener, mediante un operador
        // Y la ultima que es la etapa de orden, podemos usar 1 para ascendente
        // y 0 para descendente
        {
            $match: { ratingsAverage: { $gte: 4.5 } },
        },
        {
            $group: {
                // Id nos ayuda a dividir los datos, es decir a hacer
                // calculos dependiendo de algunos parámetros
                _id: { $toUpper: '$difficulty' },
                // _id: '$ratingsAverage',
                numTours: { $sum: 1 },
                numRatings: { $sum: '$ratingsQuantity' },
                avgRating: { $avg: '$ratingsAverage' },
                avgPrice: { $avg: '$price' },
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' },
            },
        },
        {
            $sort: {
                avgPrice: 1,
            },
        },
        // {
        //     // Podemos repetir etapas
        //     $match: { _id: { $ne: 'EASY' } },
        // },
    ]);
    // console.log(stats[0].numRatings);

    res.status(200).json({
        status: 'success',
        data: {
            stats,
        },
    });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
    const year = req.params.year * 1; // 2021
    const plan = await Tour.aggregate([
        {
            // Unwind hace deconstrucción de un array crea un documento
            // para cada registro
            $unwind: '$startDates',
        },
        {
            $match: {
                startDates: {
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year}-12-31`),
                },
            },
        },
        {
            $group: {
                _id: { $month: '$startDates' },
                numTourStarts: { $sum: 1 },
                tours: { $push: '$name' },
            },
        },
        {
            // Agregamos un campo
            $addFields: { month: '$_id' },
        },
        {
            // Le damos un valor predeterminado a un campo
            $project: {
                _id: 0,
            },
        },
        {
            $sort: {
                numTourStarts: -1,
            },
        },
        {
            $limit: 12,
        },
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            plan,
        },
    });
});

// /tours-within/:distance/center/:latln/unit/:unit"
// /tours-distance?distance=233&center=-40&45&unit=mi
// /tours-distance/233/center/-40,45/unit/mi
exports.getToursWithin = catchAsync(async (req, res, next) => {
    console.log(req.params);
    const { distance, latlng, unit } = req.params;
    const [lat, lng] = latlng.split(',');

    const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;

    if (!lat || !lng) {
        next(new AppError('Please provide in the format lat, lng.', 400));
    }

    console.log(distance, lat, lng);

    const tours = await Tour.find({
        startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
    });

    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            data: tours,
        },
    });
});

exports.getDistances = catchAsync(async (req, res, next) => {
    const { latlng, unit } = req.params;
    const [lat, lng] = latlng.split(',');

    const multiplier = unit === 'mi' ? 0.000621371 : 0.001;

    if (!lat || !lng) {
        next(new AppError('Please provide in the format lat, lng.', 400));
    }

    const distances = await Tour.aggregate([
        {
            $geoNear: {
                near: {
                    type: 'Point',
                    coordinates: [lng * 1, lat * 1],
                },
                distanceField: 'distance',
                distanceMultiplier: multiplier,
            },
        },
        {
            $project: {
                distance: 1,
                name: 1,
            },
        },
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            data: distances,
        },
    });
});
