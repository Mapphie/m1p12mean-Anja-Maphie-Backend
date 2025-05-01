const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice');

//Créer un devis
router.post('/', async(req, res) =>{
    try{
        const devis = (await new Invoice(req.body));
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
        const invoice = await Invoice.find().populate('client')
        .populate('manager')
        .populate('vehicule')
        .populate('lignes.service');
        res.json(invoice);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//Mettre à jour une facture
router.put('/:id', async(req,res) =>{
    try {
        const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(invoice);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});


router.get('/:id', async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id).populate('client')
        .populate('manager')
        .populate('vehicule')
        .populate('lignes.service');
        if (!invoice) {
            return res.status(404).json({ message: 'Facture non trouvé' });
        }
        res.json(invoice);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
});

// modifier état
router.put("/:id/etat", async (req, res) => {
    try {
      const { etat } = req.body
      const devis = await Invoice.findByIdAndUpdate(req.params.id, { etat: etat }, { new: true })
        .populate("client")
        .populate("manager")
        .populate("vehicule")
        .populate("lignes.service")
  
      if (!devis) {
        return res.status(404).json({ message: "Facture non trouvé" })
      }
  
      res.json(devis)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
});

module.exports = router;