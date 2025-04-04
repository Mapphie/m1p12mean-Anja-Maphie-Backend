const mongoose = require('mongoose');
const User = require('../models/User');


const VehiculeSchema = new mongoose.Schema({
    type: { type: String, required: true },
    marque: { type: String, required: true },
    modele: { type: String, required: true },
    annee: { type: String, required: true },
    matricule: { type: String, required: true },
    // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    user: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Vehicule', VehiculeSchema);