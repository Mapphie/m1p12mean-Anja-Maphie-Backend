const mongoose = require('mongoose');

const InvoiceItemSchema = new mongoose.Schema({
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
  description: { type: String },
  remise: { type: Number, required: true },
  prixUnitaireHT: { type: Number, required: true },
  taxe: { type: Number, required: true },
  quantite: { type: Number, required: true },
  totalHT: { type: Number, required: true },
  totalTTC: { type: Number, required: true },
});

module.exports = InvoiceItemSchema; 
