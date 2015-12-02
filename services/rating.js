var mongo = require("../routes/mongo");
var mongoURL = "mongodb://localhost:27017/RatingDB";
var async = require('async');
var ObjectId = require('mongodb').ObjectID;

/* Method for saving customer Rating by Parteek */

exports.saveCustomerRating = function(msg, callback) {
	var res = {};
	var customerId = parseInt(msg.customerId);
	var rideId = parseInt(msg.rideId);
	var driverId = parseInt(msg.driverId);
	var rating = Number(msg.rating);
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
				console.log("err" + err);
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
	var customerId = parseInt(msg.customerId);
	var rideId = parseInt(msg.rideId);
	var driverId = parseInt(msg.driverId);
	var rating = Number(msg.rating);
	var review = msg.review;
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
	res.driverReviews = [];
	var driverId = parseInt(msg.driverId);
	var json_responses;

	mongo.connect(mongoURL, function() {
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('CustomerRating');
		coll.aggregate([ {
			$match : {
				driverId : driverId
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
				console.log("console.log(result);" + JSON.stringify(result));
				if (result.length != 0)
					res.rating = result[0].avgRating;
				else
					res.rating = 0;
				res.driverId = driverId;
				coll.find({
					driverId : driverId
				}).toArray(function(err, result) {
					if (err) {
						console.log("result is" + result[0]);
						res.code = "401";
						res.value = 'Unable to get reviews for the Driver';
					} else {
						console.log("result is" + JSON.stringify(result));
						res.code = "200";
						if (result.length === 1) {
							res.driverReviews.push(result[0].review);
							res.rating = result[0].rating;
						} else if (result.length > 1) {
							for (var i = 0; i < result.length; i++) {
								res.driverReviews.push(result[0].review);
							}
						} else if (result.length === 0) {
							res.code = "402";
							res.value = 'No Reviews and Rating Available';
							callback(null, res);
						}
						console.log(res + "res");
						callback(null, res);

					}
				});

			}

		});

	});
};

/* Method for Getting Driver Rating by Parteek */

exports.getCustomerRating = function(msg, callback) {
	var res = {};
	res.customerReviews = [];
	var customerId = parseInt(msg.customerId);
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
				console.log("console.log(result);" + JSON.stringify(result));
				if (result.length != 0)
					res.rating = result[0].avgRating;
				res.customerId = customerId;
				coll.find({
					customerId : customerId
				}).toArray(function(err, result) {
					if (err) {
						console.log("result is" + result[0]);
						res.code = "401";
						res.value = 'Unable to get reviews for the Driver';
					} else {
						console.log("result is" + JSON.stringify(result));
						res.code = "200";
						if (result.length === 1) {
							res.customerReviews.push(result[0].review);
							res.rating = result[0].rating;
						} else if (result.length > 1) {
							for (var i = 0; i < result.length; i++) {
								res.customerReviews.push(result[0].review);
							}
						} else if (result.length === 0) {
							res.code = "402";
							res.value = 'No Reviews and Rating Available';
							callback(null, res);
						}
						console.log(res + "res");
						callback(null, res);

					}
				});

			}

		});

	});
};
