// routes/router.js
const express = require('express');
const pizzasRouter = require('../Pizzas/routes.js');
const ingredientsRouter = require('../Ingredients/routes.js');

const router = express.Router();

router.use('/pizzas', pizzasRouter);
router.use('/ingredients', ingredientsRouter);

module.exports = router;
