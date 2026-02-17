import { Router, type Request, type Response } from 'express';
import User from '../models/User.js';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const users = await User.findAll(); 
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des données" });
    }
});

export default router;