const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const ejslint = require('ejs-lint');
var path = require('path');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const apikey = "";

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
