require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("DB Connection Error:", err));

// Schema / Model
const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  course: String,
});

const Student = mongoose.model("Student", studentSchema);

// POST route to save student
app.post("/register", async (req, res) => {
  const { name, email, age, course } = req.body;
  await Student.create({ name, email, age, course });
  res.send("<h2>Registration Successful!</h2><a href='/'>Go Back</a>");
});

// Start Server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
