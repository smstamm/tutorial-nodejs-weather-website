const request = require('request');
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude, longitude, callback) => {
  const darkSkyUrl = `https://api.darksky.net/forecast/6fae3da76f92f0bc77fedbb1532228b5/${latitude},${longitude}?units=us`;
  request({ url: darkSkyUrl, json: true }, (error, { body: { error: bodyError, currently, daily } }) => {
    if (error) {
      callback('Unable to connect to weather service', undefined);
    }
    else if (bodyError) {
      callback('Unable to find location.', undefined);
    }
    else {
      callback(undefined, `${daily.data[0].summary} It is currently ${currently.temperature} degrees out. There is a ${currently.precipProbability}% chance of rain.`);
    }
  });
}


module.exports = forecast;