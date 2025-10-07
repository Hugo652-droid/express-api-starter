// ingredients/ingredientsRoutes.js
const express = require('express');
const { body, param } = require('express-validator');
const ingredientController = require('./ingredientsController');

const router = express.Router();

/**
 * @openapi
 * /api/v1/ingredients:
 *   get:
 *     summary: Retrieve a list of ingredients
 *     responses:
 *       200:
 *         description: A list of ingredients
 *   post:
 *     summary: Create a new ingredient
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Ingredient created
 *       400:
 *         description: Invalid input
 */

/**
 * @openapi
 * /api/v1/ingredients/{id}:
 *   get:
 *     summary: Get an ingredient by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single ingredient
 *       404:
 *         description: Ingredient not found
 *   put:
 *     summary: Update an ingredient by ID
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
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Ingredient updated
 *       400:
 *         description: Ingredient input
 *       404:
 *         description: Ingredient not found
 *   delete:
 *     summary: Delete an ingredient by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Ingredient deleted
 *       404:
 *         description: Ingredient not found
 */

/**
 * Les différantes contraintes d'entrer
 */
const createAndUpdateValidations = [
    body('name').isString().notEmpty().withMessage('name is required'),
    body('price').isFloat({ gt : 0 }).notEmpty().withMessage('price is required'),
];

/**
 * Les routes d'Ingredients [http://localhost:3000/api/v1/Ingredients]
 */
router.get('/', ingredientController.findAll); // Récupairation de tous les ingredients
router.post('/', createAndUpdateValidations, ingredientController.create); // Creation d'un ingredients
router.get('/:id', [param('id').isInt().withMessage('id must be an integer')], ingredientController.findOne); // Récupairation d'un ingrédients spécifique
router.put('/:id', [param('id').isInt().withMessage('id must be an integer'), ...createAndUpdateValidations], ingredientController.update); // Modification d'un ingredient
router.delete('/:id', [param('id').isInt().withMessage('id must be an integer')], ingredientController.delete); // Suppression d'un ingredient

module.exports = router;
