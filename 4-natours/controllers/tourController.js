// const fs = require('fs');
const Tour = require('../models/tourModel');

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

exports.getAllTours = async (req, res) => {
    try {
        console.log(req.query);
        // BUILD QUERY
        // 1) Filtering
        const queryObj = { ...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach((el) => delete queryObj[el]);

        // 2) Advanced filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(
            /\b(gte|gt|lte|lt)\b/g,
            (match) => `$${match}`
        ); // g significa que reemplazará multiples veces en la cade de texto
        console.log(JSON.parse(queryStr));

        const query = Tour.find(JSON.parse(queryStr));
        // {difficulty: 'easy', duration: { $gte: 5}}
        // Queremos cambiar gte, gt, lte, lt

        // const query = await Tour.find({
        //     duration: 5,
        //     difficulty: 'easy',
        // });

        // const query = await Tour.find()
        //     .where('duration')
        //     .equals(5)
        //     .where('difficulty')
        //     .equals('easy');

        // EXECUTE QUERY
        const tours = await query;

        // SEND RESPONSE
        res.status(200).json({
            status: 'success',
            // requestedAt: req.requestTime,
            results: tours.length,
            data: { tours },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
        // console.log(err);
    }
};

exports.getTour = async (req, res) => {
    // Podemos crear parametro opcional agregando ?
    try {
        const tour = await Tour.findById(req.params.id);
        // Tour.findOne({_id: req.params.id})
        // console.log(req.params);
        console.log(tour);
        res.status(200).json({
            status: 'success',
            data: { tour },
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err,
        });
    }

    // const tour = tours.find((el) => el.id === id);

    // console.log(tour);
    // res.status(200).json({
    //     status: 'success',
    //     data: { tour },
    // });
};

exports.createTour = async (req, res) => {
    // Req contiene toda la información sobre la solicitud que se realizó, los datos que se envian estan
    // contenidos acá
    // console.log(req.body);
    // const newId = tours[tours.length - 1].id + 1;
    // // eslint-disable-next-line prefer-object-spread
    // const newTour = Object.assign({ id: newId }, req.body);

    // tours.push(newTour);
    // fs.writeFile(
    //     `${__dirname}/dev-data/data/tours-simple.json`,
    //     JSON.stringify(tours),
    //     (err) => {
    //         res.status(201).json({
    //             status: 'success',
    //             data: {
    //                 tour: newTour,
    //             },
    //         }); // El codigo 201 significado creado
    //     }
    // );

    // Forma de hacerlo directamente desde el documento
    // const newTour = new Tour({});
    // newTour.save();

    try {
        // Forma de hacerlo desde el objeto
        console.log(req.body);
        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour,
            },
        }); // El codigo 201 significado creado
    } catch (err) {
        // console.log(err);
        res.status(404).json({ status: 'fail', message: err });
    }
};

exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        }); // Con el parametro new nos devolvera el
        // documento ya actualizado
        res.status(200).json({
            status: 'success',
            data: {
                tour,
            },
        });
    } catch (err) {
        res.status(404).json({ status: 'fail', message: err });
    }
};

exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (err) {
        res.status(404).json({ status: 'fail', message: err });
    }
};
