const crypto = require("crypto-js");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const key = "utyjombor123";

// setting ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", {
    encrypted: "",
    decrypted: ""
  });
});

app.post("/encrypt", (req, res) => {
  const text = req.body.text;
  const encrypted = crypto.AES.encrypt(text, key).toString();

  res.render("index", {
    encrypted,
    decrypted: ""
  });
});

app.post("/decrypt", (req, res) => {
  const text = req.body.text;
  const decrypted = crypto.AES.decrypt(text, key).toString(crypto.enc.Utf8);

  res.render("index", {
    encrypted: "",
    decrypted
  });
});

// ⛔ JANGAN app.listen
module.exports = app;
