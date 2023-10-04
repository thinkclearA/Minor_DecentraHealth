const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hospitalSchema = new Schema({
    Name: {
        type: String,
        required: [true]
    },
    regNo: {
        type: String,
        required: [true]
    },
    type: {
        type : String,
        required: [true]
    },
    password: {
        type: String,
        required: [true]
    },
    doctors: {
        type: Array,
        required: [true]
    },
    patients: {
        type: Array,
        required: [true]
    }
});

module.exports = mongoose.model('Hospital', hospitalSchema);