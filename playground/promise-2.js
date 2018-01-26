const request = require('request');


const geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        const encodedAddress = encodeURIComponent(address);

        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
            json: true
        }, (err, res, body) => {
            if (err) {
                reject('Unable to connect to Google servers.');
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to find that address.');
            } else if (body.status === 'OVER_QUERY_LIMIT') {
                reject('API requests limit exceeded. Try again later.');
            } else if (body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }
        });
    });
};

geocodeAddress('19146').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
});