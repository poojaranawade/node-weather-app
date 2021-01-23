const request = require("postman-request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURI(address) +
    ".json?access_token=pk.eyJ1IjoicG9vamFyYW5hd2FkZSIsImEiOiJja2szM2w0dmgxN2lkMnN0Z3pkemszYmd0In0.2QuVJ6410plIfKVP-v6FHA&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Can not connect to location service");
    } else if (body.features.length === 0) {
      callback("Location unavailable");
    } else {
      const place = body.features[0];
      callback(undefined, {
        latitude: place.center[1],
        longitude: place.center[0],
        location: place.place_name,
      });
    }
  });
};
module.exports = geocode;
