var mongo = require("../routes/mongo");
var mongoURL = "mongodb://localhost:27017/RatingDB";
var async = require('async');
var ObjectId = require('mongodb').ObjectID;

/* Method for saving customer Rating by Parteek */

exports.saveCustomerRating = function(msg, callback) {
	var res = {};
	var customerId = msg.customerId;
	var rideId = msg.rideId;
	var driverId = msg.driverId;
	var rating = msg.rating;
	var review = msg.review;
	var json_responses;

	mongo.connect(mongoURL, function() {
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('CustomerRating');
		coll.insert({
			customerId : customerId,
			_id : rideId,
			driverId : driverId,
			rating : rating,
			review : review
		}, function(err, result) {
			if (err) {
				console.log(result);
				res.code = "401";
				res.value = 'Unable to insert rating for the Customer';
				callback(null, res);
			} else {
				console.log(result);
				res.code = "200";
				res.value = result;
				callback(null, res);
			}
		});

	});
};

/* Method for saving Driver Rating by Parteek */

exports.saveDriverRating = function(msg, callback) {
	var res = {};
	var customerId = msg.customerId;
	var rideId = msg.rideId;
	var driverId = msg.driverId;
	var rating = msg.rating;
	var json_responses;

	mongo.connect(mongoURL, function() {
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('DriverRating');
		coll.insert({
			customerId : customerId,
			_id : rideId,
			driverId : driverId,
			rating : rating,
			review : review
		}, function(err, result) {
			if (err) {
				console.log(result);
				res.code = "401";
				res.value = 'Unable to insert rating for the Driver';
				callback(null, res);
			} else {
				console.log(result);
				res.code = "200";
				res.value = result;
				callback(null, res);
			}
		});

	});
};

/* Method for Getting Driver Rating by Parteek */

exports.getDriverRating = function(msg, callback) {
	var res = {};
	var driverIds = msg.driverId;
	var json_responses;
	mongo.connect(mongoURL, function() {
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('DriverRating');
		for (i = 0; i <= driverIds.length - 1; i++) {
			coll.aggregate([ {
				$match : {
					driverId : driverIds[i]
				}
			}, {
				$group : {
					_id : "",
					avgRating : {
						$avg : "$rating"
					}
				}
			} ]).toArray(function(err, result) {
				if (err) {
					console.log(result);
					res.code = "401";
					res.value = 'Unable to get rating for the Driver';
				} else {
					console.log(result);
					res.code = "200";
					res.value.driverRating.push({
						"driverId" : driverIds[i],
						"rating" : result.avgRating
					});

				}
			});
		coll.find({driverId:driverIds[i]}).toArray(function(err, result) {
			if (err) {
				console.log(result);
				res.code = "401";
				res.value = 'Unable to get reviews for the Driver';
			} else {
				console.log(result);
				res.code = "200";
				res.value.driverReviews.push({
					"driverId" : driverIds[i],
					"review" : result.review
				});

			}
		});
		}
	});

	console.log("response is" + JSON.stringify(res));
	callback(null, res);
};

/* Method for Getting Driver Rating by Parteek */

exports.getCustomerRating = function(msg, callback) {
	var res = {};
	var customerId = msg.customerId;
	var json_responses;

	mongo.connect(mongoURL, function() {
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('CustomerRating');
		coll.aggregate([ {
			$match : {
				customerId : customerId
			}
		}, {
			$group : {
				_id : "",
				avgRating : {
					$avg : "$rating"
				}
			}
		} ]).toArray(function(err, result) {
			if (err) {
				console.log(result);
				res.code = "401";
				res.value = 'Unable to get rating for the Driver';
				callback(null, res);
			} else {
				coll.find({customerId:customerId}).toArray(function(err, result) {
					if (err) {
						console.log(result);
						res.code = "401";
						res.value = 'Unable to get reviews for the Driver';
					} else {
						console.log(result);
						res.code = "200";
						res.value.rating = result.avgRating;
						res.value.driverReviews.push({
							"customerId" : customerId,
							"review" : result.review
						});
						callback(null, res);

					}
				});
				
			}
		});

	});
};
