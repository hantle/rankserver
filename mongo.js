var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;

var db, Rank;

exports.connect = function() {
	mongoClient.connect('mongodb://127.0.0.1:27017/rank', function(err, data){
		if(err) throw err;
		db = data;
		Rank = db.collection("Rank");
		console.log('db connection');
	});
};

exports.findAllRank = function(callback) {
	Rank.find({}).sort({"point":-1}).limit(100).toArray(function(err, items) {
		if (err) console.log(err);
		callback(items);
	});
};

exports.insertRank = function(query, callback) {
	Rank.insert(query, function(err, item) {
		if (err) console.log(err);
		callback(item);
	});
};