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

// Middleware pour parser le JSON et les données envoyées via formulaire
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Connexion MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connecté")).catch(err => console.log(err));

//ajout de session après login
app.use(expressSession({
    secret: 'maphieanjaP14',
    resave: false,
    saveUninitialized: false,
}));

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

//Routes

// app.use('/manager', isAuthenticatedManager);
// app.use('/client', isAuthenticatedClient);
// app.use('/mecanicien', isAuthenticatedMecanicien);

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

app.use('/adminDevis', require('./routes/adminDevisRoutes'));
app.use('/rendezVous', require('./routes/rendezVousRoutes'));

app.use('/intervention', require('./routes/interventionRoutes'));

app.use('/invoice', require('./routes/invoiceRoutes'));



app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
