var http= require('http');
var qs = require('qs');
var querystring = require('querystring');
var assert = require('assert');

// Test input in server

var postData = qs.stringify(
  {
    "plate": "DY-655-EL",
    "mileage": 3360,
    "fuel": 38,
    "gps": {
      "latitude": 49.7074,
      "longitude": 0.203436
    },
    "capture_at":"2016-05-31T22:55:07.000Z"
  }
  );

  var options = {
    hostname: 'localhost',
    port: 9000,
    path: '/vehicle/input',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  };

  var req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
      console.log('No more data in response.')
    })
  });

  req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
  });

  // write data to request body
  req.write(postData);
  req.end();
