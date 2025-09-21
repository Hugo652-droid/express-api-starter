// pizzas/Pizza.js
const db_pizzaHasIngredients = require('./pizzaHasIngredientDatabase');

class PizzaHasIngredient {
    static create(id_pizza, id_ingredient) {
        const sql = `INSERT INTO pizza_has_igredient (id_pizza, id_ingredient)
                         VALUES (?, ?);`
        const params = [id_pizza, id_ingredient];
        return new Promise((resolve, reject) => {
            db_pizzaHasIngredients.run(sql, params, function (err) {
                if (err) return reject(err);

                PizzaHasIngredient.findById(this.lastID).then(resolve).catch(reject);
            })
        })
    }

    static findAll() {
        const sql = `SELECT * FROM pizza_has_igredient ORDER BY id DESC`;
        return new Promise((resolve, reject) => {
            db_pizzaHasIngredients.all(sql, [], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        })
    }

    static findById(id) {
        const sql = `SELECT * FROM pizza_has_igredient WHERE id_pizza = ?`;
        return new Promise((resolve, reject) => {
            db_pizzaHasIngredients.get(sql, [id], (err, row) => {
                if (err) return reject(err);
                resolve(row || null);
            });
        });
    }

    static update(id, { id_pizza, id_ingredient }) {
        const sql = `
            UPDATE pizza_has_igredient
            SET id_pizza = COALESCE(?, id_pizza),
                id_ingredient = COALESCE(?, id_ingredient),
            WHERE id = ?
        `;
        const params = [id_pizza, id_ingredient, id];

        return new Promise((resolve, reject) => {
            db_pizzaHasIngredients.run(sql, params, function (err) {
                if (err) return reject(err);
                if (this.changes === 0) return resolve(null);
                PizzaHasIngredient.findById(id).then(resolve).catch(reject);
            });
        });
    }

    static delete(id) {
        const sql = `DELETE FROM pizza_has_igredient WHERE id = ?`;
        return new Promise((resolve, reject) => {
            db_pizzaHasIngredients.run(sql, [id], function (err) {
                if (err) return reject(err);
                resolve(this.changes); // number of rows deleted
            });
        });
    }
}

module.exports = PizzaHasIngredient;
