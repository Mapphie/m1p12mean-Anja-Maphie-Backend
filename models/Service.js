const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    nom: { type: String, required: true }, // Nom du service
    categorie: { type: String, required: true }, // Entretien, Réparation, etc.
    description: { type: String },
    duree: { type: Number, required: true }, // Durée estimée en minutes
    prix: { type: Number, required: true }, // Durée estimée en minutes
    image: { type: String }, // Durée estimée en minutes
    quantite: { type: Number, required: false }
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);
