var MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    utils = require('./utils'),
    mongoose = require('mongoose'),
    url = require('url');

var Schema = mongoose.Schema;
var dataSchema = new Schema({
  plate:  String,
  mileage: Number,
  fuel:   Number,
  gps: {
    latitude: Number,
    longitude:  Number
  },
  capture_at: { type: Date, default: Date.now }
},  {collection: 'virtuo'} );
dataSchema.set('_id', false);
dataSchema.set('versionKey', false);

// Connection URL
var mongoUrl = 'mongodb://localhost:27017/virtuo';

/*
 * POST upload file
 */
exports.uploadFile = function(req, res){
  mongoose.connect(mongoUrl);
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    var Data = mongoose.model('Data', dataSchema);
    var data = new Data(req.body);
    data.save(function (err, data) {
      if (err) return res.status(404).json(err);
      console.log(data);
      mongoose.disconnect();
      res.status(200).json("Inserted new document");
    });
  });
};

/*
 * GET vehicle info (mileage, fuel, coordinates)
 */
exports.getInfo = function(req, res){
    var urlObj = url.parse(req.url);
    var info = urlObj.pathname.match(/([^\/]*)\/*$/)[1];
    var plate = req.params.plate;
    var from = req.query.from;
    var to = req.query.to;
    from = JSON.parse(from);
    to = JSON.parse(to);

    utils.getInfoFromTo(info, plate, from, to, function(err, docs){
      if (docs) {
        res.status(200).json(docs);
      } else {
        res.status(404).json("Not found");
      }
    });
};
