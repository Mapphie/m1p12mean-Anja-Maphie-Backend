const mongoose = require('mongoose');

const InterventionSchema = new mongoose.Schema({
    service: {type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true},
    client: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    vehicule: {type: mongoose.Schema.Types.ObjectId, ref: 'Vehicule', required: true},
    dateDemande: {type: Date, required: true},
    dateDebut: {type: Date, required: true},
    dateFin: {type: Date, required: true},
    dureeEstimee: {type: Number, required: true},
    mecanicien: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    coutEstime: {type: Number, required: true},
    status: {type: String, require: true},
}, {timestamps: true});

module.exports = mongoose.model('Intervention',InterventionSchema)