const express = require('express');
const router = express.Router();
const RendezVous = require('../models/rendezVous');

//Créer un rendezVous
router.post('/', async(req, res) =>{
    try{
        const rendezVous = new RendezVous(req.body);
        await rendezVous.save();
        res.status(201).json(rendezVous);

    }
    catch(error){
        res.status(400).json({message: error.message});
    }
});

// Lire tous les rendezVous
router.get('/', async(req, res) =>{
    try {
        const rendezVous = await RendezVous.find().populate("client").populate('service');
        res.json(rendezVous);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//Mettre à jour un devis
router.put('/:id', async(req,res) =>{
    try {
        const rendezVous = await RendezVous.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(rendezVous);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

//Supprimer un rendezVous
router.delete('/:id', async(req, res)=>{
    try {
        await RendezVous.findByIdAndDelete(req.params.id);
        res.json({message:"Rendez-vous supprimé"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const rendezVous = await RendezVous.findById(req.params.id);
        if (!rendezVous) {
            return res.status(404).json({ message: 'Rendez-vous non trouvé' });
        }
        res.json(rendezVous);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
});

module.exports = router;