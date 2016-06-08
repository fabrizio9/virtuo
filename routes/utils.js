var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/virtuo';

function getInfoByDate(info, plate, dates, callback) {
  var query = {};
  query['_id'] = 0;
  query[info] = 1;
  query['capture_at'] = 1;

  //Perform the info request
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    var col = db.collection('virtuo');
    col.find({'plate': plate, 'capture_at': { $gte: dates.from, $lte: dates.to}}, query).toArray(function(err, docs){
      db.close();
      callback(err, docs);
    });
  });
}

exports.getInfoFromTo = function(info, plate, from, to, callback){
  var dates = {};
  console.log('get '+info);
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    var col = db.collection('virtuo');

    // get from date value
    col.find({'plate': plate, 'gps': { 'latitude': from.latitude, 'longitude': from.longitude}}, {_id: 0, capture_at: 1}).toArray(function(err, docs){
      if (err) {
          console.log('err : '+err);
          console.log('doc : '+docs);
      } else {
        if (docs.length) {
          dates.from = docs[0].capture_at;
          // Check if toDate ok
          if (dates.to) {
            db.close();
            getInfoByDate(info, plate, dates, callback);
          }
        } else {
          callback(err, docs);
        }
      }
    });
    // get to date value
    col.find({'plate': plate, 'gps': { 'latitude': to.latitude, 'longitude': to.longitude}}, {_id: 0, capture_at: 1}).toArray(function(err, docs){
      if (err) {
          console.log('err : '+err);
          console.log('doc : '+docs);
      } else {
        if (docs.length) {
          dates.to = docs[0].capture_at;
          // Check if fromDate ok
          if (dates.from) {
            db.close();
            getInfoByDate(info, plate, dates, callback);
          }
        } else {
          callback(err, docs);
        }
      }
    });

  });
};
