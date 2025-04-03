const express = require('express');

const expressSession = require('express-session');

const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
app.use(cors());
app.use(express.json());

//Connexion MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connecté");
}).catch(err => {
    console.error("Erreur de connexion à MongoDB :", err);
    process.exit(1); // Arrête le serveur en cas d'erreur critique
});

//ajout de session après login
const MongoStore = require('connect-mongo');
app.use(expressSession({
    secret: 'maphieanjaP14',
    resave: false,
    saveUninitialized: false,
}));

// Middleware pour vérifier les cookies et les sessions (appliqué uniquement aux routes nécessitant une session)
const sessionMiddleware = (req, res, next) => {
    if (!req.session) {
        return res.status(500).json({ message: "Erreur de session, veuillez réessayer." });
    }
    next();
};

const isAuthenticatedManager = (req, res, next) => {
    if (req.session.user && req.session.user.idrole.role === "Manager") {
        next();
    } else {
        res.status(401).json({ message: "Non autorisé, veuillez vous connecter" });
    }
};
const isAuthenticatedMecanicien = (req, res, next) => {
    if (req.session.user && req.session.user.idrole.role === "Mécanicien") {
        next();
    } else {
        res.status(401).json({ message: "Non autorisé, veuillez vous connecter" });
    }
};
const isAuthenticatedClient = (req, res, next) => {
    if (req.session.user && req.session.user.idrole.role === "Client") {
        next();
    } else {
        res.status(401).json({ message: "Non autorisé, veuillez vous connecter" });
    }
};

//Routes nécessitant une session
app.use('/manager', sessionMiddleware, isAuthenticatedManager, (req, res, next) => {
    // Ajoutez ici des routes spécifiques pour les managers si nécessaire
    next();
});
app.use('/client', sessionMiddleware, isAuthenticatedClient, (req, res, next) => {
    // Ajoutez ici des routes spécifiques pour les clients si nécessaire
    next();
});
app.use('/mecanicien', sessionMiddleware, isAuthenticatedMecanicien, (req, res, next) => {
    // Ajoutez ici des routes spécifiques pour les mécaniciens si nécessaire
    next();
});

//Routes publiques ou sans session
app.use('/articles', require('./routes/articleRoutes'));

app.use('/employes', require('./routes/employeRoutes'));
app.use('/manager/employes', require('./routes/employeRoutes'));

app.use('/roles', require('./routes/roleRoutes'));
app.use('/manager/roles', require('./routes/roleRoutes'));

app.use('/users', require('./routes/userRoutes'));
app.use('/manager/users', require('./routes/userRoutes'));
app.use('/client/users', require('./routes/userRoutes'));

app.use('/services', require('./routes/ServiceRoute'));
app.use('/manager/services', require('./routes/ServiceRoute'));

app.use('/devis', require('./routes/devisRoutes'));
app.use('/manager/devis', require('./routes/devisRoutes'));
app.use('/client/devis', require('./routes/devisRoutes'));

app.use('/vehicules', require('./routes/vehiculeRoutes'));
app.use('/client/vehicules', require('./routes/vehiculeRoutes'));

app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
