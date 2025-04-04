const mongoose = require('mongoose');

const RendezVousSchema = new mongoose.Schema({
    number: { type: String, required: true },
    service:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true }],
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    etat: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('RendezVous', RendezVousSchema);
