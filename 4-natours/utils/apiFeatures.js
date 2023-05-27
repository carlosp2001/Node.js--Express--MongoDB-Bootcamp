class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        const queryObj = { ...this.queryString };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach((el) => delete queryObj[el]);

        // 1B) Advanced filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(
            /\b(gte|gt|lte|lt)\b/g,
            (match) => `$${match}`
        ); // g significa que reemplazará multiples veces en la cade de texto
        // console.log(JSON.parse(queryStr));

        this.query = this.query.find(JSON.parse(queryStr));
        // let query = Tour.find(JSON.parse(queryStr));
        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            // console.log(sortBy);
            this.query = this.query.sort(sortBy);
            // sort('price ratingsAverage')
        } else {
            this.query = this.query.sort('-createdAt -price');
        }
        return this;
    }

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            // query = query.select('name space duration')
            this.query = this.query.select(fields);
            // console.log(this.queryString);
        } else {
            this.query = this.query.select('-__v');
        }

        return this;
    }

    paginate() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 100;
        const skip = (page - 1) * limit;
        // console.log(skip);
        // page=2&limit=10, 1-10, page 1, 11-20, page 2, 21-30, page 3
        this.query = this.query.skip(skip).limit(limit);

        // if (this.queryString.page) {
        //     const numTours = await Tour.countDocuments();
        //     if (skip >= numTours) throw new Error('This page does not exist');
        // }

        return this;
    }
}

module.exports = APIFeatures;
