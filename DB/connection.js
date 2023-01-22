const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const connectDB = async () => {
    return await (await mongoose.connect('mongodb://localhost:27017/blog')
    //to ensure its done correct (for development side)
    .then((result) => {
        console.log('connect to db');
    }).catch((error) => {
        console.log(error);
    }))
}


module.exports = connectDB;