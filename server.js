var express = require('express'),
    vehicle = require('./routes/vehicle'),
    http= require('http'),
    bodyParser = require('body-parser');

var app = express();

var server = http.createServer(app);

app.set('port', 9000);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/vehicle/:plate/mileage', vehicle.getInfo);
app.get('/vehicle/:plate/fuel', vehicle.getInfo);
app.get('/vehicle/:plate/coordinates', vehicle.getInfo);
app.post('/vehicle/input', vehicle.uploadFile);

server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
