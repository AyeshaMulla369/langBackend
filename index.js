const express = require("express");
const port = 8000;
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors"); 

require("./db");
require("./models/User.js");
require("./models/Quiz.js")
const authRoutes = require("./routes/AuthRoute.js");
const userRoutes = require("./routes/UserRoutes.js");
const quizRoutes = require("./routes/QuizRoutes.js");

app.use(cors());

// app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(bodyParser.text({ limit: '200mb' }));

app.use(quizRoutes);
app.use(authRoutes);
app.use(userRoutes);


app.get("/", (req, res) => {
    
  res.send(`
  <form action="/submit" method="POST">
    <!-- Question -->
    <label for="question">Question:</label>
    <textarea id="question" name="question" rows="4" cols="50" required></textarea>
    <br><br>
    <!-- Options -->
    <label for="options">Options:</label>
    <div id="options">
  <div>
    <textarea id="options[]" name="options[]" rows="2" cols="50" placeholder="Option text" required></textarea>
    <input type="checkbox" name="isAnswer" value="0"> Is Answer
  </div>
  <div>
    <textarea id="options[]" name="options[]" rows="2" cols="50" placeholder="Option text" required></textarea>
    <input type="checkbox" name="isAnswer" value="1"> Is Answer
  </div>
  <br><br>
</div>

    <!-- Level -->
    <label for="level">Level:</label>
    <input type="number" id="level" name="level" required>
    <br><br>

    <!-- Score -->
    <label for="score">Score:</label>
    <input type="number" id="score" name="score" value="0">
    <br><br>

    <!-- Language -->
    <label for="language">Language:</label>
    <input type="text" id="language" name="language" required>
    <br><br>

    <button type="submit">Submit</button>
  </form>
  `);
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});

