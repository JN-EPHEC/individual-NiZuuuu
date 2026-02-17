import userRoutes from './routes/userRoutes.js';
import express, { type Request, type Response } from 'express';

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

app.listen(port,() => {
    console.log('serveur lancé sur http://localhost:'+port);
})

function greet(name: string): string {
return name+ " est le boat"
}
console.log(greet("Nizuu"))