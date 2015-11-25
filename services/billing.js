var mongo = require("../routes/mongo");
var mongoURL = "mongodb://localhost:27017/UberPrototypeDB";
var async = require('async');
var ObjectId = require('mongodb').ObjectID;

var mysql = require("../routes/mysql");

var self = this;

exports.getFareEstimate = function(msg, callback) {
	var res = {};
	console.log("inside Fare Estimate");

	var distance = msg.distance;
	var time = msg.time;
	var Basefare = 2.20;
	var perMin = 0.26;
	var perMile = 1.30;
	var totalFare = 2.20 + (time * perMin) + (distance * perMile);
	console.log("Fare Estimate is " + totalFare);
	// Check whether fare is less then minimum fare
	if (totalFare < 5.35) {
		res.fare = 5.35
		res.code = 200;
	} else {
		res.fare = totalFare;
		res.code = 200;
	}
	callback(null, res);
};

calculateBill = function(distance, time) {

	console.log("inside calculate bill");

	var distance = distance;
	var time = time;
	var Basefare = 2.20;
	var perMin = 0.26;
	var perMile = 1.30;
	var totalFare = 2.20 + (time * perMin) + (distance * perMile);
	console.log("Total Bill is " + totalFare);
	// Check whether fare is less then minimum fare
	if (totalFare < 5.35) {
		return 5.35;
	} else {
		return totalFare;
	}
};

exports.generateBill = function(msg, callback) {
	var res = {};
	console.log("inside generate bill");

	var rideID = msg.ride_id;
	var time = msg.time;
	var pickupTime = msg.ride_start_time;
	var dropOffTime = msg.ride_end_time;
	var distance_covered = msg.distance;
	var sourceLocation = msg.pickup_location;
	var driverID = msg.driver_id;
	var customerID = msg.customer_id;
	var billAmount = calculateBill(distance_covered, time);
	var insertBill = "INSERT INTO BILLING(BILL_DATE,PICKUP_TIME,DROPOFF_TIME,DISTANCE_COVERED,SOURCE_LOCATION,DRIVER_ID,CUSTOMER_ID,RIDE_ID,BILL_AMOUNT) "
			+ "VALUES(now()"
			+ ",'"
			+ pickupTime
			+ "','"
			+ dropOffTime
			+ "','"
			+ distance_covered
			+ "','"
			+ sourceLocation
			+ "','"
			+ driverID
			+ "','" + customerID + "','" + rideID + "','" + billAmount + "');";

	console.log("query is:" + insertBill);
	mysql.fetchData(function(err, results) {
		if (err) {
			throw new error("Error during insertion of bill" + err);
		} else {
			if (results) {
				var getBill = "select * from billing where ride_id=" + rideID
						+ ";";
				console.log("query is:" + getBill);
				mysql.fetchData(function(err, results) {
					if (err) {
						throw new error("No record found" + err);
					} else {
						console.log("RESULTS" + results);
						res.code = 200;
						res.value = results;
						callback(null, res);
					}
				}, getBill);

			}
		}
	}, insertBill);

};
