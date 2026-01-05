const crypto = require("crypto-js");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const key = "utyjombor123";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: true }));

// ================= HOME =================
app.get("/", (req, res) => {
  res.render("index", {
    mode: null,
    encrypted: null,
    decrypted: null
  });
});

// ================= ENKRIPSI =================
app.post("/encrypt", (req, res) => {
  const text = req.body.text || "";
  const encrypted = crypto.AES.encrypt(text, key).toString();

  res.render("index", {
    mode: "encrypt",
    encrypted,
    decrypted: null
  });
});

// ================= DEKRIPSI =================
app.post("/decrypt", (req, res) => {
  const text = req.body.text || "";

  const result = crypto.AES.decrypt(text, key)
    .toString(crypto.enc.Utf8);

  res.render("index", {
    mode: "decrypt",
    encrypted: null,
    decrypted: result || "❌ Gagal didekripsi (teks / key salah)"
  });
});

module.exports = app;
