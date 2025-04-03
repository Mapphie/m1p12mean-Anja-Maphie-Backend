const express = require('express');

const expressSession = require('express-session');

const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

//Middleware
const corsOptions = {
    // origin: 'http://localhost:4200',
    origin: 'https://m1p12mean-anja-maphie.netlify.app',  // L'URL de ton front-end
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,  // Permet d'envoyer les cookies et autres informations de session
};

// Appliquer CORS à toutes les routes
app.use(cors(corsOptions));

app.use(express.json());


// Option pour gérer les requêtes préalables (OPTIONS)
app.options('*', cors());

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
    cookie: {
        secure: true, // À mettre à `true` si tu utilises HTTPS
        httpOnly: true, // Empêche l'accès au cookie depuis le client (sécurise un peu contre les XSS)
        maxAge: 1000 * 60 * 60 * 24, // Durée de vie du cookie, ici 1 jour
    },
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

app.use('/manager', isAuthenticatedManager);
app.use('/client', isAuthenticatedClient);
app.use('/mecanicien', isAuthenticatedMecanicien);

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


