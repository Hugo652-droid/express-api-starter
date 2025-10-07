// routes/router.js
const express = require('express');
const ingredientsRouter = require('../ingredients/ingredientsRoutes.js');

const router = express.Router();

/**
 * Création des routes
 */
router.use('/ingredients', ingredientsRouter);

module.exports = router;
