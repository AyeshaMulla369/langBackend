const router = require("express").Router();
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
const User = require('../models/User');

router.get("/User/checkLogin/:username", async (req, res) => {
    try {
        const username = req.params.username; 
        const password = req.query.password;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(200).json({ message: "User not found" });
        }


        if (password === user.password) {
            return res.status(200).json({ message: "Login successful" });
        } else {
            return res.status(200).json({ message: "Incorrect password" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to check login" });
    }
});


//endpoint to create a new user in the backend
router.post("/User/Signup", async (req, res) => {
    try {
      const { username,name,password } = req.body;

      const newUserData = {
        username: username,
        name: name,
        password: password,
      };

      const newUser = new User(newUserData);
      console.log("User data to db",newUser);
      await newUser.save();
      res.status(200).json({ message: "User stored successfully"});
    } catch (error) {
      res.status(500).json({ message: "User storing failed" });
    }
  });



//check if usernam exixst
router.get("/User/checkUsername/:username", async (req, res) => {
  try {
      const username = req.params.username; 

      const user = await User.findOne({ username });

      if (user) {
          return res.status(200).json({ userExists: true,message: "User found" });
      }
      res.status(200).json({userExists: false ,message:'No username found can be used'})

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to check login" });
  }
});


  module.exports = router;