require('dotenv').config(); // Load environment variables
const yargs = require('yargs');
const axios = require('axios');


const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true    // always parse the argument of command a / address as a String instead of something else
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

const encodedAddress = encodeURIComponent(argv.address);
const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeURL).then((res) => {
    if (res.data.status === 'ZERO_RESULTS')
        throw new Error('Unable to find that address.');
    if (res.data.status === 'OVER_QUERY_LIMIT')
        throw new Error('API requests limit exceeded. Try again later.');

    const latitude = res.data.results[0].geometry.location.lat;
    const longitude = res.data.results[0].geometry.location.lng;
    const weatherURL = `https://api.darksky.net/forecast/${process.env.API_KEY}/${latitude},${longitude}`;

    console.log(res.data.results[0].formatted_address);
    return axios.get(weatherURL);
}).then((res) => {
    const temperature = res.data.currently.temperature;
    const apparentTemperature = res.data.currently.apparentTemperature;

    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
}).catch((err) => {
    if (err.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.');
    } else {
        console.log(err.message);
    }
});