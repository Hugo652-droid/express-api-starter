// pizzas/Pizza.js
const db_pizzas = require('./pizzasDatabase');
const db_pizzaHasIngredients = require('./pizzaHasIngredientDatabase');

class Pizza {
    static create({ name, imageUrl, price, ingredients }) {
        const sql = `INSERT INTO pizzas (name, imageUrl, price, created_at, updated_at)
                 VALUES (?, ?, ?, datetime('now'), datetime('now'))`;
        const params = [name, imageUrl || null, price];

        return new Promise((resolve, reject) => {
            db_pizzas.run(sql, params, function (err) {
                if (err) return reject(err);
                // fetch created row
                for (let ingredient in ingredients) {
                    const sql = `INSERT INTO pizza_has_igredient (id_pizza, id_ingredient)
                        VALUES (?, ?);`
                    const params = [this.lastID, ingredient];

                    db_pizzaHasIngredients.run(sql, params, function (err) {
                        if (err) return reject(err);
                    })

                }

                Pizza.findById(this.lastID).then(resolve).catch(reject);
            });
        });
    }

    static findAll() {
       const sql = `SELECT * FROM pizzas ORDER BY id DESC`;
        const sql_pizzaHasIngredients = `SELECT * FROM pizza_has_igredient ORDER BY id DESC`;
        return new Promise((resolve, reject) => {
            db_pizzas.all(sql, [], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
            db_pizzaHasIngredients.all(sql_pizzaHasIngredients, [], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        })
    }

    static findById(id) {
        const sql = `SELECT * FROM pizzas WHERE id = ?`;
        return new Promise((resolve, reject) => {
            db_pizzas.get(sql, [id], (err, row) => {
                if (err) return reject(err);
                resolve(row || null);
            });
        });
    }

    static update(id, { name, imageUrl, price }) {
        const sql = `
      UPDATE pizzas
      SET name = COALESCE(?, name),
          imageUrl = COALESCE(?, imageUrl),
          price = COALESCE(?, price),
          updated_at = datetime('now')
      WHERE id = ?
    `;
        const params = [name, imageUrl, price, id];

        return new Promise((resolve, reject) => {
            db_pizzas.run(sql, params, function (err) {
                if (err) return reject(err);
                if (this.changes === 0) return resolve(null);
                Pizza.findb_pizzasyId(id).then(resolve).catch(reject);
            });
        });
    }

    static delete(id) {
        const sql = `DELETE FROM pizzas WHERE id = ?`;
        return new Promise((resolve, reject) => {
            db_pizzas.run(sql, [id], function (err) {
                if (err) return reject(err);
                resolve(this.changes); // number of rows deleted
            });
        });
    }
}

module.exports = Pizza;
