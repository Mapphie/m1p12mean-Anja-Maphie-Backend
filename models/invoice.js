// models/Invoice.js
const mongoose = require('mongoose');
const InvoiceItemSchema = require('./InvoiceItem');
const { StatutInvoice } = require('./enums');

const InvoiceSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true },
  devis: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Devis',
  },
  client: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  manager: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  vehicule: {type: mongoose.Schema.Types.ObjectId, ref: 'Vehicule', required: true},
  dateCreation: { type: Date, default: Date.now },
  totalHT: { type: Number, required: true },
  totalTTC: { type: Number, required: true },
  etat: {
    type: String,
    enum: Object.values(StatutInvoice),
    default: StatutInvoice.BROUILLON,
  },
  lignes: [InvoiceItemSchema],
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
