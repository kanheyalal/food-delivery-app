const express = require("express");
const router = express.Router();

require("../db/conn");
const UserCart = require("../model/UserCart");

router.post("/createcart", async (req, res) => {
  const { email } = req.body;
  try {
    const newCart = new UserCart({ email, mealIds: [], totalAmount: 0 });
    const response = await newCart.save();
    res.status(200).json({ message: "cart created successfilly" });
  } catch (err) {
    res.status(400).json({ error: "server side error" });
  }
});
router.patch("/updatecart", async (req, res) => {
  const { email, mealId, operation, amount, mealPrice } = req.body;
  try {
    const userData = await UserCart.findOne({ email });
    const mealIds = userData.mealIds;
    let totalPrice = userData.totalAmount;
    let isPresent = false;
    for (let key in mealIds) {
      let obj = mealIds[key];
      if (obj.mealId === mealId) {
        isPresent = true;
        if (operation === "add") {
          if (amount) {
            obj.quantity += amount;
          } else {
            obj.quantity += 1;
          }
        } else {
          obj.quantity -= 1;
        }
        if (obj.quantity === 0) {
          mealIds.splice(key, 1);
        }
      }
    }
    if (!isPresent) {
      mealIds.push({
        mealId: mealId,
        quantity: amount,
      });
    }
    
    if(operation === 'add') {
        totalPrice += (amount * mealPrice);
    } else {
        totalPrice -= mealPrice;
    }
    const response = await UserCart.updateOne(
      { email: email },
      { $set: { mealIds: mealIds, totalAmount: totalPrice } },
      { new: true }
    );
    res.status(200).json({ message: "added to cart" });
  } catch (err) {
    res.status(400).json({ error: "failed" });
  }
});

router.get("/getcartdata/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const resData = await UserCart.findOne({ email });
    res
      .status(200)
      .json({ mealIds: resData.mealIds,totalAmount: resData.totalAmount, message: "data send successful" });
  } catch (err) {
    res.status(400).json({ error: "error occured white getting cart data" });
  }
});

module.exports = router;
