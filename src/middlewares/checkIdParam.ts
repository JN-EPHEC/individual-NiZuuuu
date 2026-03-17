import { type Request, type Response, type NextFunction } from 'express';

export const checkIdParam = (req: Request, res: Response, next: NextFunction) => {
const id = req.params.id as string;

if (!/^\d+$/.test(id || "")) { 
  
    return res.status(400).json({
        error: "L'identifiant fourni est invalide. Il doit s'agir d'un nombre entier."
    });
}


  next();
};