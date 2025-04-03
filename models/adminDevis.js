const mongoose = require('mongoose');
const User = require('../models/User');
const Vehicule = require('../models/Vehicule');
const Service = require('../models/Service');


const AdminDevisSchema = new mongoose.Schema({
    numero: {type: String, required: true},
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vehicule: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicule', required: true },
    dateCreation: { type: Date, required: true },
    totalHT: { type: Number, required: true },
    totalTTC: { type: Number, required: true },
    facture: {type: String, required: false},
    etat: { type: String, required: true },
    lignes: [{
        reference: { type: String, required: true,},
          service: {
                  Service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
              },
          description: {
            type: String, required: false,},
          remise: { type: Number,
            default: 0,
          },
          prixUnitaireHT: { type: Number, required: true,},
          taxe: { type: Number, required: true,},
          quantite: { type: Number, required: true,},
          totalHT: { type: Number, required: true,},
          totalTTC: { type: Number, required: true,},}
      ],
}, { timestamps: true });


module.exports = mongoose.model('AdminDevis', AdminDevisSchema);