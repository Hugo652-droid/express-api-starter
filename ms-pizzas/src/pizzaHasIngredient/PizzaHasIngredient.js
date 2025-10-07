// pizzas/PizzaHasIngredient.js
const db = require('./pizzasHasIngredientDatabase');

class PizzaHasIngredient {
    static create(pizza_id, ingredient_id) {
        const sql = `INSERT INTO pizza_has_ingredient (pizza_id, ingredient_id)
                 VALUES (?, ?)`;
        const params = [pizza_id, ingredient_id];

        return new Promise((resolve, reject) => {
            db.run(sql, params, function (err) {
                if (err) return reject(err);
            });
        });
    }

    static findAll() {
        const sql = `SELECT * FROM pizza_has_ingredient ORDER BY id DESC`;
        return new Promise((resolve, reject) => {
            db.all(sql, [], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        })
    }

    static findById(id) {
        const sqlPizza = `SELECT * FROM pizza_has_ingredient WHERE id = ?`;
        return new Promise((resolve, reject) => {
            db.get(sqlPizza, [id], (err, row) => {
                if (err) return reject(err);
                resolve(row || null);
            });
        });
    }

    static update(id, { pizza_id, ingredient_id }) {
        const sql = `
          UPDATE pizza_has_ingredient
          SET pizza_id = COALESCE(?, pizza_id),
              ingredient_id = COALESCE(?, ingredient_id)
          WHERE id = ?
        `;
        const params = [pizza_id, ingredient_id, id];

        return new Promise((resolve, reject) => {
            db.run(sql, params, function (err) {
                if (err) return reject(err);
                if (this.changes === 0) return resolve(null);
                PizzaHasIngredient.findById(id).then(resolve).catch(reject);
            });
        });
    }

    static delete(id) {
        const sql = `DELETE FROM pizza_has_ingredient WHERE id = ?`;
        return new Promise((resolve, reject) => {
            db.run(sql, [id], function (err) {
                if (err) return reject(err);
                resolve(this.changes); // number of rows deleted
            });
        });
    }
}

module.exports = PizzaHasIngredient;
