// ingredients/Ingredients.js
const db = require('./ingredientsDatabase');

/**
 * Objet ingredients
 */
class Ingredients {
    /**
     * Création et exportation dans la Database d'un nouveau Ingredient
     * @param name Nom de l'ingredient
     * @param price Prix de l'ingredient
     * @returns {Promise<unknown>}
     */
    static create({ name, price }) {
        const sql = `INSERT INTO ingredients (name, price, created_at, updated_at)
                     VALUES (?, ?, datetime('now'), datetime('now'))`;
        const params = [name, price];

        return new Promise((resolve, reject) => {
            db.run(sql, params, function (err) {
                if (err) return reject(err);
                // fetch created row
                Ingredients.findById(this.lastID).then(resolve).catch(reject);
            });// Insertion dans la Database
        });
    }

    /**
     * Recupération de tous les ingredients de la Database
     * @returns {Promise<unknown>}
     */
    static findAll() {
        const sql = `SELECT * FROM ingredients ORDER BY id DESC`; // recupèration des ingredients de la Database
        return new Promise((resolve, reject) => {
            db.all(sql, [], (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    }

    /**
     * Recupération d'un ingredient
     * @param id identifient de l'ingredient recherché
     * @returns {Promise<unknown>}
     */
    static findById(id) {
        const sql = `SELECT * FROM ingredients WHERE id = ?`; // recupèration d'un ingredient de la Database
        return new Promise((resolve, reject) => {
            db.get(sql, [id], (err, row) => {
                if (err) return reject(err);
                resolve(row || null);
            });
        });
    }

    /**
     * Modification d'un ingredient dans la Database
     * @param id identifient de l'ingredient à modifier
     * @param name Nom de l'ingredient
     * @param price Prix de l'ingredient
     * @returns {Promise<unknown>}
     */
    static update(id, { name, price }) {
        const sql = `
      UPDATE ingredients
      SET name = COALESCE(?, name),
          price = COALESCE(?, price),
          updated_at = datetime('now')
      WHERE id = ?
    `; // Modification d'un ingredient dans la Database
        const params = [name, price, id];

        return new Promise((resolve, reject) => {
            db.run(sql, params, function (err) {
                if (err) return reject(err);
                if (this.changes === 0) return resolve(null);
                Ingredients.findById(id).then(resolve).catch(reject);
            });
        });
    }

    /**
     * Suppression d'un element
     * @param id identifient de l'élément de à suprimer
     * @returns {Promise<unknown>}
     */
    static delete(id) {
        const sql = `DELETE FROM ingredients WHERE id = ?`; // Suppression d'un element dans la Database
        return new Promise((resolve, reject) => {
            db.run(sql, [id], function (err) {
                if (err) return reject(err);
                resolve(this.changes); // number of rows deleted
            });
        });
    }
}

module.exports = Ingredients;
