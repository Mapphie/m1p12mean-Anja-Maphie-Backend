const mongoose = require('mongoose');
const User = require('../models/User');
const Vehicule = require('../models/Vehicule');
const Service = require('../models/Service');


const DevisSchema = new mongoose.Schema({
    client: {
        User: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        clientId: { type: String, required: true }
    },
    vehicule: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicule', required: true },
    datedemande: { type: Date, required: true },
    services: [{
        Service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
        quantite: { type: Number, required: true },
        serviceId: { type: String, required: true },
    }],
    totalDevis: { type: Number, required: true },
    status: { type: String, required: true },
    validite: { type: Date, required: true },
    libelle: { type: String, required: true },
}, { timestamps: true });


module.exports = mongoose.model('Devis', DevisSchema);