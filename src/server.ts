import sequelize from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import express, { type Request, type Response } from 'express';

const app= express();
const port= 3000;
app.use(express.json()); 
app.use('/api/users', userRoutes);
app.use(express.static('public'));


//ex 6.2
app.get('/api/hello/:name', (req, res) => {
    
    const name: string = req.params.name;
    
    
    const now: string = new Date().toISOString();

    
    res.json({
        message: `Bonjour ${name}`,
        timestamp: now
    });
});
//tp2 .2
sequelize.authenticate()
    .then(() => {
        console.log('Connexion à la base de données SQLite réussie !');
    })
    .catch((err) => {
        console.error('Impossible de se connecter à la base de données :', err);
    });
//tp 2.4
sequelize.sync({ alter: true }) 
    .then(() => {
        console.log('Base de données synchronisée !');
        
        app.listen(port, () => {
            console.log(`Serveur lancé sur http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error('Erreur lors de la synchronisation de la DB :', err);
    });


function greet(name: string): string {
return name+ " est le boat"
}
console.log(greet("Nizuu"))