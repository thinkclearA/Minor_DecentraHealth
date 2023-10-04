const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const patientsSchema = new Schema({
    Phone: {
        type: String,
        required: [true]
    },
    patients: {
        type: Array,
        required: [true]
    }
});

module.exports = mongoose.model('Patients', patientsSchema);