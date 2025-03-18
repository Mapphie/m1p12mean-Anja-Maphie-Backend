const mongoose = require('mongoose');

const EmployeSchema = new mongoose.Schema({
    nom: {type: String, required: true},
    email: {type: String, required: true},
    contact: {type: String, required: true},
    adresse: {type: String, required: true},
    poste: {type: String, required: true},
    date: {type: Date, required: true},
    salaire: {type: Number, required: true},
    intervention: {type: Number, required: true},
    etat: {type: String, required:true}
}, {timestamps: true});

module.exports = mongoose.model('Employe', EmployeSchema);