const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = 3000;

// Helper function to verify password strength
function isPasswordStrong(password, commonPasswords) {
  const minLength = 8;
  const hasNumbers = /\d/.test(password);
  const hasLetters = /[a-zA-Z]/.test(password);
  const isNotCommon = !commonPasswords.includes(password);
  return (
    password.length >= minLength && hasNumbers && hasLetters && isNotCommon
  );
}

// Load common passwords list
const commonPasswords = fs
  .readFileSync("10-million-password-list-top-1000.txt", "utf8")
  .split("\n");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve static files from 'public' directory

// Route for home page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/login", (req, res) => {
  const password = req.body.password;

  if (isPasswordStrong(password, commonPasswords)) {
    // Password is strong, render welcome page
    res.send(
      `<h1>Welcome!</h1><p>Your password is strong.</p><a href="/">Logout</a>`
    );
  } else {
    // Password does not meet the requirements, send an error message
    res
      .status(400)
      .send("Password does not meet the requirements or is too common.");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;
