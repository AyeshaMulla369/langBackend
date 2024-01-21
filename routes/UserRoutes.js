const router = require("express").Router();
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
const User = require('../models/User');

//profile
router.get("/getScore/:username", async (req, res) => {
    try {
        const username = req.params.username; 
        const lang = req.query.lang;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user.score[lang]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to get profile" });
    }
});


//endpoint to create a new user in the backend
router.post("/postScore", async (req, res) => {
    try {
        const { username, lang, putscore } = req.body;
        console.log('Received data:', username, lang, putscore);

        const updatedUser = await User.findOneAndUpdate(
            { username },
            {
                $inc: { [`score.${lang}`]: putscore }, // Increment the score for the specified language
            },
            { new: true } // Return the modified document and create it if it doesn't exist
        );

        console.log('Updated user:', updatedUser);

        res.status(200).json({ message: "Score updated successfully" });
    } catch (error) {
        console.error('Error updating score:', error);
        res.status(500).json({ message: "Score update failed" });
    }
});



  //leaderboard
router.get("/leaderboard/:lang", async (req, res) => {
    try {
        const language = req.params.lang;
        // const leaderboard = await User.find({}).sort({ [`score.${language}`]: -1 }).select('username score.${language}');   
        const leaderboard = await User.find({})
            .sort({ [`score.${language}`]: -1 })
            .select(`username score.${language}`);     
        res.status(200).json(leaderboard);
        } catch (error) {
        res.status(500).json({ message: "User failed to get leaderboard" });
    }
  });


  module.exports = router;