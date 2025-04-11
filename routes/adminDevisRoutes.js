const express = require('express');
const router = express.Router();
const AdminDevis = require('../models/adminDevis');

//Créer un devis
router.post('/', async(req, res) =>{
    try{
        const devis = (await new AdminDevis(req.body));
        await devis.save();
        res.status(201).json(devis);

    }
    catch(error){
        res.status(400).json({message: error.message});
    }
});

// Lire tous les devis
router.get('/', async(req, res) =>{
    try {
        const devis = await AdminDevis.find().populate('client')
        .populate('manager')
        .populate('vehicule')
        .populate('lignes.service');
        res.json(devis);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//Mettre à jour un devis
router.put('/:id', async(req,res) =>{
    try {
        const devis = await AdminDevis.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(devis);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

//Supprimer un devis
router.delete('/:id', async(req, res)=>{
    try {
        await AdminDevis.findByIdAndDelete(req.params.id);
        res.json({message:"devis supprimé"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const adminDevis = await AdminDevis.findById(req.params.id).populate('client')
        .populate('manager')
        .populate('vehicule')
        .populate('lignes.service');
        if (!adminDevis) {
            return res.status(404).json({ message: 'Devis non trouvé' });
        }
        res.json(adminDevis);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
});

// modifier état
router.put("/:id/etat", async (req, res) => {
    try {
      const { etat } = req.body
      const devis = await AdminDevis.findByIdAndUpdate(req.params.id, { etat: etat }, { new: true })
        .populate("client")
        .populate("manager")
        .populate("vehicule")
        .populate("lignes.service")
  
      if (!devis) {
        return res.status(404).json({ message: "Devis non trouvé" })
      }
  
      res.json(devis)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
});

module.exports = router;