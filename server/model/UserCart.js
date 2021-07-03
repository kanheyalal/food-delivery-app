const mongoose = require('mongoose');
const userCart = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    mealIds : [{
        mealId : String,
        quantity: Number,
    }],
    totalAmount: Number 
});

const UserCart = new mongoose.model('UserCart', userCart);
module.exports = UserCart;