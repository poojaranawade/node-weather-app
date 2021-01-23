const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=9d657d130f88335c04543061e2e3f3ac&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Can not connect to weather service");
    } else if (body.error) {
      callback("Unable to find the location");
    } else {
      const current = body.current;
      callback(
        undefined,
        current.weather_descriptions[0] +
          ". It is currently " +
          current.temperature +
          " degrees C out. It feels like " +
          current.feelslike +
          " degrees C out." +
          " Humidity is " +
          current.humidity +
          "%. There is " +
          current.precip +
          "% chance of raining"
      );
    }
  });
};

module.exports = forecast;
