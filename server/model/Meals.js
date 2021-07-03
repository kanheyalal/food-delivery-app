const mongoose = require('mongoose');

const meal = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    sId: {
        type: String
    }
})
const Meals = new mongoose.model('Meal', meal);
module.exports = Meals;