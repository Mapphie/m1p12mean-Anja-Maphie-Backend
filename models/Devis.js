const mongoose = require('mongoose');
const User = require('../models/User');
const Vehicule = require('../models/Vehicule');
const Service = require('../models/Service');


const DevisSchema = new mongoose.Schema({
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Assurez-vous que User est bien une référence
    vehicule: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicule', required: true },
    matricule : { type: String, required: true },
    datedemande: { type: Date, required: true },
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true }],  // services est maintenant un tableau d'IDs de Service
    total: { type: Number, required: true },
    status: { type: String, required: true },
    validité: { type: Date, required: true }
}, { timestamps: true });


module.exports = mongoose.model('Devis', DevisSchema);