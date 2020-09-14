// model to create database
// in order to save questions

const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        //required: true
    },
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// now exporting this model
module.exports = mongoose.model('Question', questionSchema);