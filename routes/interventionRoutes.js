const express = require('express');
const router = express.Router();
const Intervention = require('../models/intervention');

router.post('/', async(req, res) =>{
    try {
        const intervention = (await new Intervention(req.body));
        await intervention.save();
        res.status(201).json(intervention);
    }
    catch(error){
        res.status(400).json({message: error.message});
    }
});

router.get('/',async(req, res) =>{
    try {
        const intervention = await Intervention.find().populate('client')
        .populate('vehicule')
        .populate('mecanicien')
        .populate('service');
        res.json(intervention);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


router.put('/:id', async(req,res) =>{
    try {
        const intervention = await Intervention.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(intervention);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const intervention = await Intervention.findById(req.params.id).populate('client')
        .populate('manager')
        .populate('vehicule')
        .populate('service');
        if (!intervention) {
            return res.status(404).json({ message: 'Intervention non trouvé' });
        }
        res.json(intervention);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
});

router.put("/:id/etat", async (req, res) => {
    try {
      const { etat } = req.body
      const intervention = await Intervention.findByIdAndUpdate(req.params.id, { status: etat }, { new: true })
        .populate("client")
        .populate("manager")
        .populate("vehicule")
        .populate("service")
  
      if (!intervention) {
        return res.status(404).json({ message: "Intervention non trouvé" })
      }
  
      res.json(intervention)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
});

module.exports = router;