const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');

router.post('/', async (req, res) => {
    try {
        const invoice = new Invoice(req.body);
        await invoice.save();
        res.status(201).json(invoice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const invoices = await Invoice.find()
            .populate('client')
            .populate('vehicule')
            .populate('manager')
            .populate('devis');
        res.json(invoices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .populate('client')
            .populate('vehicule')
            .populate('manager')
            .populate('devis');
        res.json(invoice);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Invoice.findByIdAndDelete(req.params.id);
        res.json({ message: "Facture supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id)
            .populate('client')
            .populate('vehicule')
            .populate('manager')
            .populate('devis');

        if (!invoice) {
            return res.status(404).json({ message: "Facture introuvable" });
        }

        res.json(invoice);
    } catch (error) {
        console.error('Erreur lors de la récupération de la facture:', error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

router.get('/clientinvoice', async (req, res) => {
    try {
        if (!req.session.user || !req.session.user._id) {
            return res.status(401).json({ message: "Utilisateur non authentifié" });
        }

        const clientId = req.session.user._id;

        const invoices = await Invoice.find({ client: clientId })
            .populate('client')
            .populate('vehicule')
            .populate('manager')
            .populate('devis');

        if (!invoices || invoices.length === 0) {
            return res.status(404).json({ message: "Aucune facture trouvée pour ce client" });
        }

        res.json(invoices);
    } catch (error) {
        console.error('Erreur lors de la récupération des factures client:', error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

module.exports = router;
