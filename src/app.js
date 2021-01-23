const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 8080;

// define path for express configs
const publicDirPath = path.join(__dirname, "../public");
const viewsDirPath = path.join(__dirname, "../templates/views");
const partialsDirPath = path.join(__dirname, "../templates/partials");

// serves static directory index.html as base route, about.html as /about.html, help.html as /help.html
app.use(express.static(publicDirPath));

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsDirPath);
hbs.registerPartials(partialsDirPath);

app.get("", (req, res) => {
  res.render("index", { title: "Weather App", name: "Pooja" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", name: "Pooja" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Pooja",
    helpText: "Help page for Weather App",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "Search term is needed" });
  }
  console.log(req.query.search);
  res.render("about", { title: "About", name: "Pooja" });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Pooja",
    errorMessage: "Help Article Not Found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Pooja",
    errorMessage: "Page Not found",
  });
});

app.listen(port, () => {
  console.log("server is up on port " + port);
});
