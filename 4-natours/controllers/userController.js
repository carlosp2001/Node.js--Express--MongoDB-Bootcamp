const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const tours = await User.find();
    // query.sort().select().skip().limit()

    // SEND RESPONSE
    res.status(200).json({
        status: 'success',
        // requestedAt: req.requestTime,
        results: tours.length,
        data: { tours },
    });
});

exports.getUser = (req, res, next) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined',
    });
};

exports.createUser = (req, res, next) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined',
    });
};

exports.updateUser = (req, res, next) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined',
    });
};

exports.deleteUser = (req, res, next) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined',
    });
};
