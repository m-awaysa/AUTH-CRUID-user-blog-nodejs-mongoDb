const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: true,
    }
}, { timestamps: true })


const blogModel = mongoose.model('blog', blogSchema);


module.exports = { blogModel };