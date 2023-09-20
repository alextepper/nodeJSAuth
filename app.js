const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const dbRoutes = require("./routes/dbRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");
const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI =
  "mongodb+srv://alextepper92:eFkO0cj38XYpLZLU@nodetuts.5aduk05.mongodb.net/node-auth?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(PORT))
  .catch((err) => console.log(err));

// routes
app.get("*", checkUser);
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));
app.get("/profile", requireAuth, (req, res) => res.render("profile"));
app.use(authRoutes);
app.use(dbRoutes);
