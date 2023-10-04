const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    Name: {
        type: String,
        required: [true]
    },
    doctorId: {
        type: String,
        required: [true]
    },
    hospitalRegnumber: {
        type: Number,
        required: [true]
    },
    UPRNnum: {
        type: Number,
        required: [true]
    },
    speciality: {
        type: String,
        required: [true]
    },
    password: {
        type: String,
        required: [true]
    },
    patients: {
        type: Array,
        required: [true]
    },
    insPatients: {
        type: Array,
        required: [true]
    },
    reqPatients: {
        type: Array,
        required: [true]
    },
    fullPatients: {
        type: Array,
        required: [true]
    }
});

module.exports = mongoose.model('Doctor', doctorSchema);