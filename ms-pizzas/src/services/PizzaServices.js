const axios = require('axios');

class PizzaServices {
    static checkIngredients(ingredients) {
        let data_ingredients;
        axios.get('http://localhost:3001/api/v1/ingredients')
            .then(function (response) {
                data_ingredients = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });

        let valide_ingredients;
        for (let ingredient of ingredients) {
            valide_ingredients = data_ingredients.find(data => data['id'] === ingredient);
        }

        return valide_ingredients.length === ingredients.length
    }
}

module.exports = PizzaServices;