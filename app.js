const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const ejslint = require("ejs-lint");
const navigator = require("web-midi-api");

var path = require("path");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const apikey = "b96e0f2330c7681900d086d32bd4594b";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.post("/locationAPI", (req, res) => {
  var city = req.body.city;
  console.log("City -" + city);
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;

  request(url, (err, response, body) => {
    if (!err && response.statusCode == 200) {
      parsedCityDetails = JSON.parse(body);
      res.render("WeatherData.ejs", { Data: parsedCityDetails });
    } else {
      console.log(err);
      res.redirect("/");
    }
  });
});

app.post("/myloc", (req, res) => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      var url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;

      request(url, (err, response, body) => {
        if (!err && response.statusCode == 200) {
          parsedCityDetails = JSON.parse(body);
          res.render("LocalWeather.ejs", { Data: parsedCityDetails });
        } else {
          console.log(err);
          res.redirect("/");
        }
      });
    });
  } else {
    console.log("Location not available");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
