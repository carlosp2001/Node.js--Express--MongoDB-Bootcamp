const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((el) => {
        if (allowedFields.includes(el)) newObj[el] = obj[el];
    });
    return newObj;
};

exports.getMe = (req, res, next) => {
    // Se declara esta variable asi para que al momento de llamar a getOne
    // se ocupe la misma llamada para obtener este usuario
    req.params.id = req.user.id;
    next();
};

// exports.getAllUsers = catchAsync(async (req, res, next) => {
//     const tours = await User.find();
//     // query.sort().select().skip().limit()
//
//     // SEND RESPONSE
//     res.status(200).json({
//         status: 'success',
//         // requestedAt: req.requestTime,
//         results: tours.length,
//         data: { tours }
//     });
// });

exports.updateMe = catchAsync(async (req, res, next) => {
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
        return next(
            new AppError(
                'This route is not for password updates. Please use /updateMyPassword',
                400
            )
        );
    }

    // 2) Filtered out unwanted fields name that are not allowed to be updated
    const filteredBody = filterObj(req.body, 'name', 'email');

    // 3) Update user document

    // En este caso utilizamos findBydIdAndUpdate porque no estamos cambiando nuestra contraseña
    // simplemente es el cambio de datos no sensibles del usuario
    const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        filteredBody,
        {
            new: true,
            runValidators: true
        }
    );

    res.status(200).json({
        status: 'success',
        data: {
            user: updatedUser
        }
    });
});

// exports.getUser = (req, res, next) => {
//     res.status(500).json({
//         status: 'error',
//         message: 'This route is not yet defined'
//     });
// };

exports.createUser = (req, res, next) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not defined! Please use / signup instead'
    });
};

// With no factory
// exports.updateUser = (req, res, next) => {
//     res.status(500).json({
//         status: 'error',
//         message: 'This route is not yet defined'
//     });
// };

exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });

    res.status(204).json({
        status: 'success',
        data: null
    });
});

// With no factory handler
// exports.deleteUser = (req, res, next) => {
//     res.status(500).json({
//         status: 'error',
//         message: 'This route is not yet defined',
//     });
// };


// Do NOT update passwords with this
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
exports.getUser = factory.getOne(User);
exports.getAllUsers = factory.getAll(User);