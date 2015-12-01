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
	var rideID = msg.rideId;
	var checkBill = "select * from billing where ride_id=" + rideID + ";";
	mysql
			.fetchData(
					function(err, results) {
						if (err) {
							res.code = 401;
							res.value = "Error occur getting bill";
						} else if (results.length === 1) {
							console.log("RESULTS" + results);
							res.code = 200;
							res.value = results;
							callback(null, res);
						} else if (results.length === 0) {

							var getRide = "select * from rides where ROW_ID="
									+ rideID;
							mysql
									.fetchData(
											function(err, results) {
												if (err || results.length === 0) {
													res.code = 401;
													res.value = "No Ride found";
												} else {
													console.log("RESULTS"
															+ results);
													var time = msg.time;
													var distance_covered = msg.distance;
													var sourceLocation = results[0].PICKUP_LOCATION;
													var destLocation = results[0].DROPOFF_LOCATION;
													var driverID = results[0].DRIVER_ID;
													var customerID = results[0].CUSTOMER_ID;
													var time = time;
													var basefare = 2.20;
													var perMin = 0.26;
													var perMile = 1.30;
													var timeFare = time
															* perMin;
													var distanceFare = distance_covered
															* perMile;
													var totalFare = 2.20
															+ timeFare
															+ distanceFare;
													var billAmount = calculateBill(
															distance_covered,
															time);
													var insertBill = "INSERT INTO BILLING(BILL_DATE,DISTANCE_COVERED,SOURCE_LOCATION,DESTINATION_LOCATION,DRIVER_ID,CUSTOMER_ID,RIDE_ID,BILL_AMOUNT,BASE_FARE,DISTANCE_FARE,TIME_FARE) "
															+ "VALUES(now(), '"
															+ distance_covered
															+ "','"
															+ sourceLocation
															+ "','"
															+ destLocation
															+ "','"
															+ driverID
															+ "','"
															+ customerID
															+ "','"
															+ rideID
															+ "','"
															+ billAmount
															+ "','"
															+ basefare
															+ "','"
															+ distanceFare
															+ "','"
															+ timeFare
															+ "');";

													console.log("query is:"
															+ insertBill);
													mysql
															.fetchData(
																	function(
																			err,
																			results) {
																		if (err) {
																			res.code = 401;
																			res.value = "Error during insertion of bill";

																		} else {
																			if (results) {
																				var getBill = "select * from billing where ride_id="
																						+ rideID
																						+ ";";
																				console
																						.log("query is:"
																								+ getBill);
																				mysql
																						.fetchData(
																								function(
																										err,
																										results) {
																									if (err) {
																										res.code = 401;
																										res.value = "Error occur getting bill";
																									} else {
																										console
																												.log("RESULTS"
																														+ results);
																										res.code = 200;
																										res.value = results;
																										callback(
																												null,
																												res);
																									}
																								},
																								getBill);

																			}
																		}
																	},
																	insertBill);

												}
											}, getRide);
						}
					}, checkBill);
};
