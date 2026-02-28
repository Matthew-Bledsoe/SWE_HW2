const express = require("express");
const app = express();
const port = 3000;
const apiRouter = require("./api");
const mysql = require("mysql2");
const path = require("path");
// Create MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Gr0wl1565",
    database: "RecipeDB"
});

// Connect to DB
db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL!");
    }
});


app.use("/api", apiRouter);

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

app.get("/", (req, res) => {
    db.query("SELECT * FROM Recipes", (err, results) => {
        if (err) throw err;
        res.render("index", { recipes: results });
    });
});

app.get("/recipe/:id", (req, res) => {
    const recipeId = req.params.id;

    db.query("SELECT * FROM Recipes WHERE recipe_id = ?", [recipeId], (err, recipeResult) => {
        if (err) throw err;

        db.query("SELECT * FROM Ingredients WHERE recipe_id = ?", [recipeId], (err, ingredientResult) => {
            if (err) throw err;

            db.query("SELECT * FROM Steps WHERE recipe_id = ? ORDER BY step_number", [recipeId], (err, stepResult) => {
                if (err) throw err;

                res.render("recipe", {
                    recipe: recipeResult[0],
                    ingredients: ingredientResult,
                    steps: stepResult
                });
            });
        });
    });
});