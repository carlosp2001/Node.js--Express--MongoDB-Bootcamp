// review / rating / createdAt / ref to tour / ref to tour  / ref to user

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        review: {
            type: String,
            required: [true, 'Review can not be empty!'],
        },
        rating: {
            type: Number,
            default: 4.5,
            min: [1, 'Rating must above 1.0'],
            max: [5, 'Rating must be below 5.0'],
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            select: false,
        },
        tour: {
            type: mongoose.Schema.ObjectId,
            ref: 'Tour',
            required: [true, 'Review must belong to a tour.'],
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'Review must belong to a user'],
        },
    },
    {
        toJSON: { virtuals: true }, // Nos ayuda para cuando halla una propiedad virtual, basicamente un campo
        // que no esté almacenado en la base de datos, sino que se calcule usando algun otro valor, asi que queremos
        // que esto tambien se muestre cuando haya un output
        toObject: { virtuals: true },
    }
);

reviewSchema.pre(/^find/, function (next) {
    //    this.populate({
    //        path: 'tour',
    //        select: 'name',
    //    });
    this.populate({
        path: 'user',
        select: 'name photo',
    });
    next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
