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

router.post('/', async (req: Request, res: Response) => {
    try {
        const { nom, prenom } = req.body;
        const newUser = await User.create({ nom, prenom });
        res.status(201).json(newUser); 
    } catch (error) {
        res.status(400).json({ message: "Erreur lors de la création de l'utilisateur" });
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