const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');

exports.deleteOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const document = await Model.findByIdAndDelete(req.params.id);

        if (!document) {
            return next(new AppError('No document found with that ID', 404));
        }

        res.status(204).json({
            status: 'success',
            data: null,
        });
    });

exports.updateOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const document = await Model.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        ); // Con el parametro new nos devolvera el
        // documento ya actualizado

        if (!document) {
            return next(new AppError('No document found with that ID', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                data: document,
            },
        });
    });

exports.createOne = (Model) =>
    catchAsync(async (req, res, next) => {
        console.log(req.body);
        const doc = await Model.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                data: doc,
            },
        }); // El codigo 201 significado creado
    });

exports.getOne = (Model, popOptions) =>
    catchAsync(async (req, res, next) => {
        let query = Model.findById(req.params.id);
        if (popOptions) query = query.populate(popOptions);
        const doc = await query;

        console.log(doc);

        if (!doc) {
            return next(new AppError('No document found with that ID', 404));
        }
        res.status(200).json({
            status: 'success',
            data: { data: doc },
        });

        // const tour = tours.find((el) => el.id === id);

        // console.log(tour);
        // res.status(200).json({
        //     status: 'success',
        //     data: { tour },
        // });
    });

// EXECUTE QUERY
exports.getAll = (Model) =>
    catchAsync(async (req, res, next) => {
        // To allow for nested GET reviews on tour
        let filter = {};
        if (req.params.tourId) filter = { tour: req.params.tourId };
        const features = new APIFeatures(Model.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate(0);

        // Mostrar la informacion del query pqrq saber cuantos documentos estan siendo examinados
        // const doc = await features.query.explain();

        // query.sort().select().skip().limit()

        // SEND RESPONSE
        res.status(200).json({
            status: 'success',
            // requestedAt: req.requestTime,
            results: doc.length,
            data: { doc },
        });
        // console.log(err);
    });
