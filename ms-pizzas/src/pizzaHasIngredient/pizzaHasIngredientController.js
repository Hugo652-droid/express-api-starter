// pizzas/pizzaHasIngredientController.js
const { validationResult } = require('express-validator');
const services_pizzas = require('../services/pizzaServices');

/**
 * Controller functions use Express (req, res) signatures and
 * respond with status codes matching MDN/HTTP recommendations.
 */

exports.create = async (req, res, next) => {
    try {
        // validation result
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // 400 Bad Request for validation problems
            return res.status(400).json({ errors: errors.array() });
        }
        const { pizza_id, ingredient_id } = req.body;

        const ingredient = services_pizzas.addPizzaHasIngredient(pizza_id, ingredient_id);
        return res.status(201).json(ingredient);
    } catch (err) {
        next(err);
    }
};

exports.findAll = async (req, res, next) => {
    try {
        const pizzasHasIngredients = await services_pizzas.getAllPizzaHasIngredients();
        // 200 OK
        return res.status(200).json(pizzasHasIngredients);
    } catch (err) {
        next(err);
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid pizzaHasIngredient id' });

        const pizzasHasIngredients = await services_pizzas.getOnePizzaHasIngredients(id);
        if (!pizzasHasIngredients) return res.status(404).json({ error: 'pizzaHasIngredient not found' }); // 404 Not Found

        return res.status(200).json(pizzasHasIngredients);
    } catch (err) {
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid pizzaHasIngredient id' });

        const deleted = await services_pizzas.deletePizzaHasIngredient(id);
        if (deleted === 0) return res.status(404).json({ error: 'pizzaHasIngredient not found' });

        // 204 No Content on successful delete
        return res.status(204).send();
    } catch (err) {
        next(err);
    }
};
