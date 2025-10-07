// routes/router.js
const express = require('express');
const pizzasRouter = require('../pizzas/pizzaRoutes.js');

const router = express.Router();

/**
 * Création des routes
 */
router.use('/pizzas', pizzasRouter);

module.exports = router;
