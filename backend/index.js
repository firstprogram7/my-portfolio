require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const User = require("./model/user");
const PORT = process.env.PORT || 5000;
// Mongoose set up
let isConnected = false; // Track the connection state
async function connectDB() {
  if (isConnected) {
    console.log("Using existing MongoDB connection!");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    // Check if the connection is successful (readState 1 means connected)
    isConnected = db.connections[0].readyState;
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Couldn't connect to MongoDB", err);
    throw err;
  }
}
connectDB();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// Middleware to ensure DB is connected for every request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    res.status(500).send("Internal Server Error: Database Connection Failed");
  }
});


// Route for main profile
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/pages/index.html"));
});
//Route for blog menu page
app.get("/blogs", (req, res) => {
  res.render("blogMenu");
});
app.post("/blogs", async (req, res) => {
  const { email } = req.body;
  const Subscriber = await User.create({
    name: "subscriber",
    email: email,
    message: "N/A",
  });
  await Subscriber.save();
  res.json({ success: true });
});
//Route for sub-blogs
app.get("/blogs/:blog", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public/pages/blogs", `${req.params.blog}.html`)
  );
});

//Routes for projects
app.get("/projects/:project", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public/pages", `${req.params.project}.html`)
  );
});

// Contact form routes
app.get("/contact", (req, res) => {
  res.render("Contact");
});
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;
  const newUser = await User.create({
    name,
    email,
    message,
  });
  await newUser.save();
  res.redirect("/contact");
});

// app.listen(PORT, () => {
//   console.log(`Listening to port ${PORT}`);
// });
// DELETE your old app.listen() and paste this:

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
  });
}

module.exports = app;