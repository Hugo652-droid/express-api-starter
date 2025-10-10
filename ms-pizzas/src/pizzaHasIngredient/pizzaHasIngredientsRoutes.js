// pizzas/ingredientsRoutes.js
const express = require('express');
const { body, param } = require('express-validator');
const pizzaHasIngredientController = require('./pizzaHasIngredientController');

const router = express.Router();

/**
 * @openapi
 * /api/v1/pizzaHasIngredient:
 *   get:
 *     summary: Retrieve a list of pizzasHasIngredients
 *     responses:
 *       200:
 *         description: A list of pizzasHasIngredients
 *   post:
 *     summary: Create a new pizza
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pizza_id
 *               - ingredient_id
 *             properties:
 *               pizza_id:
 *                 type: number
 *               ingredient_id:
 *                 type: number
 *     responses:
 *       201:
 *         description: pizzaHasIngredient created
 *       400:
 *         description: Invalid input
 */

/**
 * @openapi
 * /api/v1/pizzaHasIngredient/{id}:
 *   get:
 *     summary: Get a pizzaHasIngredient by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single pizzaHasIngredient
 *       404:
 *         description: pizzaHasIngredient not found
 *   put:
 *     summary: Update a pizzaHasIngredient by ID
 *     parameters:
 *       - in: path
 *         pizza_id: id
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
 *               pizza_id:
 *                 type: number
 *               ingredient_id:
 *                 type: number
 *     responses:
 *       200:
 *         description: pizzaHasIngredient updated
 *       400:
 *         description: pizzaHasIngredient input
 *       404:
 *         description: pizzaHasIngredient not found
 *   delete:
 *     summary: Delete a pizzaHasIngredient by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: pizzaHasIngredient deleted
 *       404:
 *         description: pizzaHasIngredient not found
 */

/**
 * Validation rules
 */
const createAndUpdateValidations = [
    body('pizza_id').isInt().notEmpty().withMessage('pizza_id is required'),
    body('ingredient_id').isInt().notEmpty().withMessage('ingredient_id is required'),
];

router.get('/', pizzaHasIngredientController.findAll);
router.post('/', createAndUpdateValidations, pizzaHasIngredientController.create);
router.get('/:id', [param('id').isInt().withMessage('id must be an integer')], pizzaHasIngredientController.findOne);
router.delete('/:id', [param('id').isInt().withMessage('id must be an integer')], pizzaHasIngredientController.delete);

module.exports = router;
