const crypto = require("crypto-js");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const key = "utyjombor123";

// ==================
// CONFIG
// ==================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ==================
// ROUTES
// ==================

// HOME
app.get("/", (req, res) => {
  res.render("index", {
    encrypted: null,
    decrypted: null
  });
});

// ENKRIPSI
app.post("/encrypt", (req, res) => {
  const text = req.body.text || "";

  const encrypted = crypto.AES.encrypt(text, key).toString();

  res.render("index", {
    encrypted,
    decrypted: null
  });
});

// DEKRIPSI
app.post("/decrypt", (req, res) => {
  const text = req.body.text || "";

  let decrypted = crypto.AES.decrypt(text, key)
    .toString(crypto.enc.Utf8);

  // PENTING: cegah string kosong
  if (!decrypted) {
    decrypted = null;
  }

  res.render("index", {
    encrypted: null,
    decrypted
  });
});

// ⛔ JANGAN app.listen()
// untuk serverless (Vercel / Railway)
module.exports = app;
