const express = require('express');
const router = express.Router();
const Devis = require('../models/Devis');

//Créer un devis
router.post('/', async(req, res) =>{
    try{
        const devis = new Devis(req.body);
        await devis.save();
        res.status(201).json(devis);

    }
    catch(error){
        res.status(400).json({message: error.message});
    }
});

// Lire tous les devi
router.get('/', async(req, res) =>{
    try {
        const devis = await Devis.find();
        res.json(devis);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//Mettre à jour un devis
router.put('/:id', async(req,res) =>{
    try {
        const devis = await Devis.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(devis);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

//Supprimer un devis
router.delete('/:id', async(req, res)=>{
    try {
        await Devis.findByIdAndDelete(req.params.id);
        res.json({message:"Devis supprimé"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = router;