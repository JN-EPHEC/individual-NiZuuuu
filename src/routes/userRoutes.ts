import { Router } from "express";
import * as userController from "../controllers/userController";

const router = Router();

// On lie les routes aux fonctions du contrôleur
router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.delete("/:id", userController.deleteUser);

export default router;