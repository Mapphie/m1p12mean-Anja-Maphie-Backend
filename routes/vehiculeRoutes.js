const express = require('express');
const router = express.Router();
const Vehicule = require('../models/Vehicule');

//Créer un vehicule
router.post('/', async (req, res) => {
    try {
        const vehicule = new Vehicule(req.body);
        await vehicule.save();
        res.status(201).json(vehicule);

    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Lire tous les vehicule
router.get('/', async (req, res) => {
    try {
        const vehicules = await Vehicule.find();
        res.json(vehicules);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Mettre à jour un vehicule
router.put('/:id', async (req, res) => {
    try {
        const vehicule = await Vehicule.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(vehicule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Supprimer un vehicule
router.delete('/:id', async (req, res) => {
    try {
        await Vehicule.findByIdAndDelete(req.params.id);
        res.json({ message: "Vehicule supprimé" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;