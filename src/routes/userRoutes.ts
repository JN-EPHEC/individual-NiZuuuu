import { Router, type Request, type Response } from 'express';
import User from '../models/User.js';

const router = Router();


router.get('/', async (req: Request, res: Response) => {
    try {
        const users = await User.findAll(); //
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des données" });
    }
});

router.post('/', async (req, res) => {
    try {
        const { nom, prenom, email } = req.body; 

        if (!nom || !prenom || !email) {
            return res.status(400).json({ error: "Tous les champs sont obligatoires." });
        }

        const newUser = await User.create({ nom, prenom, email });
        res.status(201).json(newUser);
        
    } catch (error: any) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ error: "Cet email est déjà utilisé." });
        }
        res.status(500).json({ error: "Erreur serveur lors de la création." });
    }
});

router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await User.destroy({ where: { id: id } });
        
        if (deleted) {
            res.status(204).send(); 
        } else {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression" });
    }
});

export default router;