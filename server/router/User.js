const express = require("express");

const router = express.Router();

require("../db/conn");

const User = require("../model/User");

router.post("/signup", async (req, res) => {
  const { name, email, password, number } = req.body;
  if (!name || !email || !password || !number) {
    return res.status(400).json({error:"Enter all fields"});
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({error : "Email exist"})
    }
    const newUser = new User({ name, email, password, number });
    const response = await newUser.save();
    if(response === null) {
      return res.status(500).json({error: "some error occured"})
    }
    res.status(200).json({ message: "new user created successfully"});
  } catch (err) {
    return res.status(500).json({error: "some error occured"})
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({error: "Enter all fields"});
  }
  try {
    const response = await User.findOne({ email: email });
    if (response === null) {
      return res.status(400).json({error : "User not found"});
    }
    if (password === response.password) {
      const token = (Math.random()).toString();
      return res.status(200).json({message:"Sign in successful",response, token});
    } else {
      return res.status(400).json({error: "Invalid password"});
    }
  } catch (err) {
    res.status(400).json({error: "server side error"});
  }
});

module.exports = router;
