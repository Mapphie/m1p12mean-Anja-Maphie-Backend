const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    categorie: { type: String, required: true },
    description: { type: String },
    duree: { type: Number, required: true },
    prix: { type: Number, required: true },
    image: { type: String },
    taxe: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);
