
const Pizza = require('../pizzas/Pizza');
const pizzaHasIngredient = require('../pizzaHasIngredient/PizzaHasIngredient');

const INGREDIENTS_SERVICE_URL = process.env.INGREDIENTS_SERVICE_URL || 'http://localhost:3001';

const pizzaServices = {
    async getAll() {
        return Pizza.findAll();
    },

    async getById(id) {
        return Pizza.findById(id);
    },

    async create(pizza) {
        return Pizza.create(pizza);
    },

    async update(pizzaId, pizza) {
        const existing = await Pizza.findById(pizzaId);
        if (!existing) return null;

        return Pizza.update(pizzaId, pizza);
    },

    async delete(pizzaId) {
        const existing = await Pizza.findById(pizzaId);
        if (!existing) return null;

        return Pizza.delete(pizzaId);
    },

    async getPizzaWithIngredients(pizzaId) {
        const pizza = await Pizza.findById(pizzaId);
        if (!pizza) return null;

        const pizzasHasIngredients = await pizzaHasIngredient.findByIdPizza(pizzaId);
        if (!pizzaHasIngredient) return null;

        const ingredients = await Promise.all(
            pizzasHasIngredients.map(async (ingredient) => {
                const response = await fetch(`${INGREDIENTS_SERVICE_URL}/api/v1/ingredients/${ingredient.ingredient_id}`);
                if (!response.ok) throw Error(`Ingredient ${ingredient.ingredient_id} not found`)

                const ingredientsData = await response.json();
                return { ...ingredientsData }
            })
        );

        return {...pizza, ingredients};
    },

    async getAllPizzaHasIngredients() {
        return pizzaHasIngredient.findAll();
    },

    async getOnePizzaHasIngredients(id) {
        return pizzaHasIngredient.findById(id);
    },

    async addPizzaHasIngredient(pizza_id, ingredient_id) {
        const response = await fetch(`${INGREDIENTS_SERVICE_URL}/api/v1/ingredients/${ingredient_id}`);
        if (!response.ok) throw Error(`Ingredient not find`)

        return pizzaHasIngredient.create({pizza_id, ingredient_id})
    },

    async deletePizzaHasIngredient(id) {
        const existing = await pizzaHasIngredient.findById(id);
        if (!existing) return null;

        return pizzaHasIngredient.delete(id)
    }
}

module.exports = pizzaServices;