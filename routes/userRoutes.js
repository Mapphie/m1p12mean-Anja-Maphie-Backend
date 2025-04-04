const express = require('express');
const router = express.Router();
const User = require('../models/User');


//Créer un user
router.post('/', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);

    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Lire tous les user
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Mettre à jour un user
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Supprimer un user
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "Utilisateur supprimé" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/byid-user/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        const users = await User.findById(userId);

        if (!users) {
            return res.status(404).json({ message: "Utilisateur introuvable" });
        }
        
        res.json(users);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "Utilisateur non trouvé" });
        }

        const isMatch = await user.isValidPassword(password);
        if (!isMatch) {
            return res.json({ success: false, message: "Mot de passe incorrect" });
        }

        req.session.user = { id: user._id, email: user.email, idrole: user.idrole };

        res.json({ success: true, message: "Connexion réussie", user });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Exemple : protéger une route
// router.get('/profile', isAuthenticated, async (req, res) => {
//     try {
//         const user = await User.findById(req.session.user.id);
//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });
router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: "Erreur lors de la déconnexion" });
        }
        res.json({ success: true, message: "Déconnexion réussie" });
    });
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;