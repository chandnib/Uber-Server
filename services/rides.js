var mongo = require("../routes/mongo");
var mongoURL = "mongodb://localhost:27017/UberPrototypeDB";
var async = require('async');
var ObjectId = require('mongodb').ObjectID;

var mysql = require("../routes/mysql");

var self=this;

exports.handle_request_createLocation = function(msg, callback) {
	var res = {};
	console.log("inside create location");

	var location = msg.location;
	console.log("location: " + JSON.stringify(msg.location));
	var insertLocation = "INSERT INTO LOCATION(`LATITUDE`, `LONGITUDE`, "
			+ "`STREET_NUMBER`,`ROUTE`,`LOCALITY`,`CITY`,`STATE`,"
			+ "`COUNTRY`,`POSTAL_CODE`) " + "VALUES(" + msg.latitude + ","
			+ msg.longitude + ",'"
			+ location[0].address_components[0].long_name + "','"
			+ location[0].address_components[1].long_name + "','"
			+ location[0].address_components[2].long_name + "','"
			+ location[0].address_components[3].long_name + "','"
			+ location[0].address_components[5].long_name + "','"
			+ location[0].address_components[6].long_name + "','"
			+ location[0].address_components[7].long_name + "');";
	console.log("query is:" + insertLocation);

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			console.log("RESULTS" + results);
			res.code = 200;
			res.value = results.insertId;
			callback(null, res);
		}
	}, insertLocation);
};

exports.handle_request_createRide = function(msg, callback) {
	var res = {};
	console.log("inside create ride");

	var pickup_location = msg.pickup_location;
	var dropoff_location = msg.dropoff_location;
	var customer_id = msg.customer_id;
	var driver_id = msg.driver_id;

	var insertRide = "INSERT INTO RIDES(`PICKUP_LOCATION`,`DROPOFF_LOCATION`,`CUSTOMER_ID`,`DRIVER_ID`,`RIDE_EVENT_ID`)VALUES("
			+ pickup_location
			+ ","
			+ dropoff_location
			+ ","
			+ customer_id
			+ "," + driver_id + "," + "43567);";

	console.log("query is:" + insertRide);

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			console.log("RESULTS" + results);
			res.code = 200;
			res.value = results.insertId;
			callback(null, res);
		}
	}, insertRide);

};


exports.handle_request_editRide = function(msg, callback) {
	var res = {};
	console.log("inside edit ride");

	var newdropoff_location = msg.newdropoff_location;
	var customer_id = msg.customer_id;

	var editRide = "UPDATE RIDES SET DROPOFF_LOCATION = '"
			+ newdropoff_location + "' WHERE CUSTOMER_ID = " + customer_id
			+ " AND RIDE_END_TIME = '0000-00-00 00:00:00';";

	console.log("query is:" + editRide);

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			console.log("RESULTS" + results);
			res.code = 200;
			res.value = results;
			callback(null, res);
		}
	}, editRide);

};

exports.handle_request_deleteRide = function(msg,callback)
{
	var res= {};
	console.log("inside delete ride" + msg.customer_id);
	var customer_id = msg.customer_id;
	
	var deleteRide = "DELETE FROM RIDES WHERE CUSTOMER_ID = " + customer_id + " AND RIDE_END_TIME = '0000-00-00 00:00:00';";
	
	console.log("query is:" + deleteRide);

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			console.log("RESULTS" + results);
			res.code = 200;
			res.value = results;
			callback(null, res);
		}
	}, deleteRide);
};