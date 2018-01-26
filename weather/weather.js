const request = require('request');


const API_KEY = process.env.API_KEY;

const getWeather = (latitude, longitude, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${API_KEY}/${latitude},${longitude}`,
        json: true
    }, (err, res, body) => {
        if (!err && res.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        } else {
            callback('Unable to fetch weather.');
        }
    });
};


module.exports = {
    getWeather
};