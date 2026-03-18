import { Router } from "express";
import * as userController from "../controllers/userController";
import { checkIdParam } from "../middlewares/checkIdParam";

const router = Router();

/**
 * @swagger
 * /api/users:
 *  get:
 *    summary: Récupère la liste des utilisateurs
 *    tags: [Users]
 *    responses:
 *      200:
 *        description: Succès
 */
router.get("/", userController.getAllUsers);
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Créer...
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: str
 *               prenom:
 *                 type: str
 *     responses:
 *       201:
 *         description: ok
 */
router.post("/", userController.createUser);
/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Modifier...
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *     responses:
 *       200:
 *         description: Modifié
 *       400:
 *         description: Invalide
 *       404:
 *         description: Non trouvé
 */
router.put("/:id", checkIdParam, userController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Suprimer...
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Id...
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Erreur
 */
router.delete("/:id", checkIdParam, userController.deleteUser);

export default router;