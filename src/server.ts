import sequelize from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import express, { type Request, type Response } from 'express';
import User from './models/User.js'; 
const app= express();
const port= 3000;
app.use('/api/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send("Bienvenue sur mon serveur API");
});


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

app.listen(port,() => {
    console.log('serveur lancé sur http://localhost:'+port);
})

function greet(name: string): string {
return name+ " est le boat"
}
console.log(greet("Nizuu"))