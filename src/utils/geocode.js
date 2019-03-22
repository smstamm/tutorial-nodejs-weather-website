const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?types=address&access_token=pk.eyJ1Ijoic21zdGFtbSIsImEiOiJjanQ5Zmh1bDkwZnR3NDNxcjhzdjVrd3hiIn0.N4VOhi75ThXTIwFppREZXQ`;
  request({ url, json: true }, (error, { body: { features } }) => {
    if (error) {
      callback('Unable to connect to location services.', undefined);
    }
    else if (features.length === 0) {
      callback('Unable to find information on this location.', undefined);
    }
    else {
      // const { geometry: { coordinates }, place_name } = features[0];
      const latitude = features[0].geometry.coordinates[1];
      const longitude = features[0].geometry.coordinates[0];
      const location = features[0].place_name;
      callback(undefined, { latitude, longitude, location });
    }
  });
}

module.exports = geocode;