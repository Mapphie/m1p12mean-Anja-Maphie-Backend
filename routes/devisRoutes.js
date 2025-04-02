const express = require('express');
const router = express.Router();
const Devis = require('../models/Devis');

//Créer un devis
router.post('/', async (req, res) => {
    try {
        const devis = new Devis(req.body);
        await devis.save();
        res.status(201).json(devis);

    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Lire tous les devi
router.get('/', async (req, res) => {
    try {
        const devis = await Devis.find();
        res.json(devis);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Mettre à jour un devis
router.put('/:id', async (req, res) => {
    try {
        const devis = await Devis.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(devis);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Supprimer un devis
router.delete('/:id', async (req, res) => {
    try {
        await Devis.findByIdAndDelete(req.params.id);
        res.json({ message: "Devis supprimé" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/byid-devis/:id', async (req, res) => {
    try {
        const devisId = req.params.id;

        const devis = await Devis.findById(devisId)
            .populate('client.User')
            .populate('vehicule')
            .populate('services.Service');

        if (!devis) {
            return res.status(404).json({ message: "Devis introuvable" });
        }
        
        res.json(devis);
    } catch (error) {
        console.error('Erreur lors de la récupération du devis:', error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

router.get('/clientdevis', async (req, res) => {
    try {
        const clientId = req.session.user._id;
        const devis = await Devis.find({ clientId: clientId})
            .populate('client.User')
            .populate('vehicule')
            .populate('services.Service');
        if (!devis) {
            return res.status(404).json({ message: "Liste de devis vide" });
        }
        res.json(devis);
    } catch (error) {
        console.error('Erreur lors de la récupération du devis:', error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

module.exports = router;