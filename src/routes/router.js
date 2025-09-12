// routes/router.js
const express = require('express');
const pizzasRouter = require('../Pizzas/routes.js');

const router = express.Router();

router.use('/pizzas', pizzasRouter);

module.exports = router;
