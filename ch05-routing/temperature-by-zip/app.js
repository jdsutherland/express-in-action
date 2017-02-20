const path = require("path");
const express = require("express");
const zipdb = require("zippity-do-dah");
const ForecastIo = require("forecastio");
const dotenv = require("dotenv").config();

const app = express();
const weather = new ForecastIo(process.env.API_KEY);

app.use(express.static(path.resolve(__dirname, "public")));

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("index");
});

app.get(/^\/(\d{5})$/, function(req, res, next) {
  const zipcode = req.params[0];
  const location = zipdb.zipcode(zipcode);
  if (!location.zipcode) {
    next();
    return;
  }

  weather.forecast(location.latitude, location.longitude, (err, data) => {
    if (err) {
      next();
      return;
    }

    res.json({ zipcode: zipcode, temperature: data.currently.temperature });
  });
});

app.use(function(req, res) {
  res.status(404).render("404");
});

app.listen(3000);
