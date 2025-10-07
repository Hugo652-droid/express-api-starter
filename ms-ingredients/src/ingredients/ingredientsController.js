// ingredients/ingredientsController.js
const { validationResult } = require('express-validator');
const Ingredient = require('./Ingredients');

/**
 * Controller functions use Express (req, res) signatures and
 * respond with status codes matching MDN/HTTP recommendations.
 */

/**
 * Création d'un ingredients
 * @param req Body, id, ...
 * @param res Json, message erreur, ...
 * @param next
 * @returns {Promise<*>}
 */
exports.create = async (req, res, next) => {
    try {
        // validation result
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // 400 Bad Request for validation problems
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, price } = req.body; // Recupération du Body
        const created = await Ingredient.create({ name, price }); // Création de l'ingredients
        // 201 Created
        return res.status(201).json(created);
    } catch (err) {
        next(err);
    }
};

/**
 * Récupairation de tous les ingrédients
 * @param req Body, in, ...
 * @param res Json, message erreur, ...
 * @param next
 * @returns {Promise<*>}
 */
exports.findAll = async (req, res, next) => {
    try {
        const ingredients = await Ingredient.findAll(); // Récupairation de tous les ingredients
        // 200 OK
        return res.status(200).json(ingredients);
    } catch (err) {
        next(err);
    }
};

/**
 * Récupairation de un seul ingredient
 * @param req Id
 * @param res Json de l'ingredient ou message d'erreur
 * @param next
 * @returns {Promise<*>}
 */
exports.findOne = async (req, res, next) => {
    try {
        const id = Number(req.params.id); // Récupairation de l'id
        if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid ingredient id' });

        const ingredient = await Ingredient.findById(id); // Recherche de l'ingredient dans les Data
        if (!ingredient) return res.status(404).json({ error: 'ingredient not found' }); // 404 Not Found

        return res.status(200).json(ingredient);
    } catch (err) {
        next(err);
    }
};

/**
 * Modification d'un ingredients
 * @param req Body avec les nouvelles données + l'id
 * @param res Json de confirmation
 * @param next
 * @returns {Promise<*>}
 */
exports.update = async (req, res, next) => {
    try {
        // validation result
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id = Number(req.params.id); // Récupairation de l'id
        if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid ingredient id' });

        const { name } = req.body; // Récupairation du Body
        const updated = await Ingredient.update(id, { name }); // Envois des nouvelles data dans l'ingredient
        if (!updated) return res.status(404).json({ error: 'ingredient not found' }); // 404 Not Found

        return res.status(200).json(updated);
    } catch (err) {
        next(err);
    }
};

/**
 * Supression d'un ingredients
 * @param req l'id de l'ingredients
 * @param res Json de confirmation
 * @param next
 * @returns {Promise<*>}
 */
exports.delete = async (req, res, next) => {
    try {
        const id = Number(req.params.id); // Récupairation de l'id
        if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid ingredient id' });

        const deleted = await Ingredient.delete(id); // Suppression dans les data
        if (deleted === 0) return res.status(404).json({ error: 'ingredient not found' });

        // 204 No Content on successful delete
        return res.status(204).send();
    } catch (err) {
        next(err);
    }
};
