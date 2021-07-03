const express = require('express');

const router = express.Router();

require('../db/conn');

const Meals  = require('../model/Meals');

router.get('/getmeals', async (req, res) => {
    try{
        const response = await Meals.find();
        const meals = [];
        for(let key in response) {
            meals.push(response[key]);
        }
        res.status(200).json({meals});
        } catch(err) {
        res.status(500).json({error: "slow network connection"});
    }
})


router.post('/postMeals', async (req, res) => {
    const {title, description, price, sId} = req.body;
    const meal = new Meals({title, description, price, sId});
    const data =  await meal.save();
    res.send(data);
})

module.exports = router;