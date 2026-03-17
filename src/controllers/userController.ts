import type { Request, Response } from "express";
import User from "../models/User";

// Contrôleur pour récupérer tous les utilisateurs
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
};


export const createUser = async (req: Request, res: Response) => {
    try {
        console.log("Données reçues du front :", req.body);
        const { nom, prenom } = req.body; 
        const newUser = await User.create({ nom, prenom });
        res.status(201).json(newUser);
    } catch (error) {
        console.error("ERREUR SEQUELIZE :", (error as any).message);
        res.status(400).json({ error: (error as any).message });
    }
};
export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string; 
    const { nom, prenom } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }

    if (nom) user.nom = nom;
    if (prenom) user.prenom = prenom;

    await user.save();

    res.json({ message: "Utilisateur mis à jour !", user });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la mise à jour." });
  }
};

// Contrôleur pour la suppression
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await User.destroy({ where: { id } });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: "Utilisateur non trouvé" });
        }
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
};    