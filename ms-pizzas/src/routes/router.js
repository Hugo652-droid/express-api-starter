// routes/router.js
const express = require('express');
const pizzasRouter = require('../pizzas/pizzaRoutes.js');
const pizzaHasIngredientRouter = require('../pizzaHasIngredient/pizzaHasIngredientsRoutes');

const router = express.Router();

/**
 * Création des routes
 */
router.use('/pizzas', pizzasRouter);
router.use('/pizzaHasIngredient', pizzaHasIngredientRouter);

module.exports = router;
