var mysql = require('../routes/mysql');

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
	var pickup_latitude = msg.pickup_latitude;
	var pickup_longitude = msg.pickup_longitude;
	var dropoff_latitude = msg.dropoff_latitude;
	var dropoff_longitude = msg.dropoff_longitude;

	var insertRide = "INSERT INTO RIDES(`PICKUP_LOCATION`,`DROPOFF_LOCATION`,`CUSTOMER_ID`,`DRIVER_ID`,`RIDE_EVENT_ID`,`STATUS`,`PICKUP_LATITUDE`,`PICKUP_LONGITUDE`,`DROPOFF_LATITUDE`,`DROPOFF_LONGITUDE`)VALUES('"
			+ pickup_location
			+ "','"
			+ dropoff_location
			+ "',"
			+ customer_id
			+ "," + driver_id + "," + "43567" + "," + "'CR'," + pickup_latitude + "," + pickup_longitude + "," + dropoff_latitude + "," + dropoff_longitude + ");";

	console.log("query is:" + insertRide);

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			console.log("RESULTS" + JSON.stringify(results));
			if(results.insertId >= 1)
				{
			res.code = 200;
			res.status = 'CR';
			console.log("response object : " + res);
				}
			else
				res.code = 400;
			
			res.value = results.insertId;
				}
			console.log("response object :" + JSON.stringify(res));
			callback(null, res);
		}, insertRide);


};

exports.handle_request_editRide = function(msg, callback) {
	var res = {};
	console.log("inside edit ride");

	var newdropoff_address = msg.newdropoff_address;
	var newdropoff_latitude = msg.newdropoff_latitude;
	var newdropoff_longitude = msg.newdropoff_longitude;
	var customer_id = msg.customer_id;
	var ride_id = msg.ride_id;

	var editRide = "UPDATE RIDES SET DROPOFF_LOCATION = '"
			+ newdropoff_address + "', DROPOFF_LATITUDE = " + newdropoff_latitude + ", DROPOFF_LONGITUDE=" + newdropoff_longitude + " WHERE CUSTOMER_ID = " + customer_id
			+ " AND RIDE_END_TIME = '0000-00-00 00:00:00' AND ROW_ID = " + ride_id + ";";

	console.log("query is:" + editRide);

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			console.log("RESULTS" + JSON.stringify(results));
			if(results.affectedRows >0)
				res.code = 200;
			else
				res.code = 400;
			res.value = results;
			console.log("response object : " + res);
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

exports.handle_request_searchRides = function(msg,callback)
{
	var res = {};
	console.log("inside search rides" + msg.searchSpec);
	
	
};

exports.handle_request_startRide = function(msg,callback)
{
	var res= {};
	console.log("inside start ride" + msg.customer_id);
	var ride_id = msg.ride_id;
	
	var startRide = "UPDATE RIDES SET STATUS = 'S' , RIDE_START_TIME = NOW() WHERE ROW_ID = " + ride_id + " AND RIDE_END_TIME = '0000-00-00 00:00:00';";
	
	console.log("query is:" + startRide);

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			console.log("RESULTS" + JSON.stringify(results));
			if(results.affectedRows > 0){
				res.code = 200;
				res.status = 'S';
			}
			else
				res.code = 400;
			res.value = results;
			callback(null, res);
		}
	}, startRide);
};

exports.handle_request_cancelRide = function(msg,callback)
{
	var res= {};
	console.log("inside cancel ride" + msg.ride_id);
	var ride_id = msg.ride_id;
	
	var cancelRide = "UPDATE RIDES SET STATUS = 'CA' , RIDE_END_TIME = NOW() WHERE ROW_ID = " + ride_id + " AND RIDE_END_TIME = '0000-00-00 00:00:00';";
	
	console.log("query is:" + cancelRide);

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else{
			console.log("RESULTS" + JSON.stringify(results));
			if(results.affectedRows > 0){
				res.code = 200;
				res.status = 'CA';
			}
			else
				res.code = 400;
			res.value = results;
			console.log("response object : " + JSON.stringify(res));
			callback(null, res);
		}
	}, cancelRide);
};

exports.handle_request_endRide = function(msg,callback)
{
	var res= {};
	console.log("inside end ride" + msg.ride_id);
	var ride_id = msg.ride_id;
	
	var endRide = "UPDATE RIDES SET STATUS = 'E' , RIDE_END_TIME = NOW() WHERE ROW_ID = " + ride_id + " AND RIDE_END_TIME = '0000-00-00 00:00:00';";
	
	console.log("query is:" + endRide);

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			console.log("RESULTS" + JSON.stringify(results));
			if(results.affectedRows > 0){
				res.code = 200;
				res.status = 'E';
			}
			else
				res.code = 400;
			res.value = results;
			console.log("response object : " + JSON.stringify(res));
			callback(null, res);
		}
	}, endRide);
};

exports.handle_request_fetchRideStatus = function(msg,callback)
{
	var res= {};
	console.log("inside end ride" + msg.ride_id);
	var ride_id = msg.ride_id;
	
	var fetchRideStatus = "SELECT STATUS FROM RIDES WHERE ROW_ID = " + ride_id +";";
	
	console.log("query is:" + fetchRideStatus);

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			console.log("RESULTS" + JSON.stringify(results));
			res.code = 200;
			res.value = results;
			console.log("response object : " + JSON.stringify(res));
			callback(null, res);
		}
	}, fetchRideStatus);
};

exports.handle_request_getRideCreated = function(msg,callback)
{
	var res= {};
	console.log("inside getRideCreated" + msg.driver_id);
	var driver_id = msg.driver_id;
	
	

		var getDetails = "SELECT R.ROW_ID , R.CUSTOMER_ID, C.FIRST_NAME, C.LAST_NAME, R.PICKUP_LOCATION, R.DROPOFF_LOCATION FROM RIDES R, CUSTOMER C WHERE R.DRIVER_ID = "
			+ driver_id
			+ " AND R.RIDE_END_TIME = '0000-00-00 00:00:00' AND R.STATUS = 'CR' AND C.ROW_ID = R.CUSTOMER_ID;";
	
	console.log("query is:" + getDetails);

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			console.log("RESULTS" + JSON.stringify(results));
			res.code = 200;
			res.value = results;
			console.log("response object : " + JSON.stringify(res));
			callback(null, res);
		}
	}, getDetails);
};

exports.handle_request_getCustomerTripSummary = function(msg,callback)
{
	var res= {};
	console.log("inside handle_request_getCustomerTripSummary" + msg.customer_id);
	var customer_id = msg.customer_id;
	
	


			var getCustomerTripSummary = "SELECT R.CUSTOMER_ID, C.FIRST_NAME AS CUSTOMER_FIRST_NAME, R.ROW_ID AS RIDEID, R.PICKUP_LOCATION, D.FIRST_NAME AS DRIVER, DATE_FORMAT(R.RIDE_START_TIME,'%m-%d-%y') AS PICKUP_DATE,	B.BILL_AMOUNT AS FARE, 'UberX' AS CAR, R.PICKUP_LOCATION AS SOURCE , R.DROPOFF_LOCATION AS DESTINATION, TIME(R.RIDE_START_TIME) AS PICKUPTIME, TIME(R.RIDE_END_TIME) AS  DROPOFFTIME, RIGHT(CC.CARD_NUM,4) AS PAYMENT FROM CUSTOMER C, RIDES R, DRIVER D, BILLING B, CREDIT_CARDS CC WHERE R.CUSTOMER_ID = "
			+ customer_id
			+ " AND R.STATUS = 'E' AND R.CUSTOMER_ID = C.ROW_ID AND R.DRIVER_ID = D.ROW_ID AND R.CUSTOMER_ID = B.CUSTOMER_ID AND R.DRIVER_ID = B.DRIVER_ID AND CONCAT(C.FIRST_NAME, ' ', C.LAST_NAME) = CC.CARD_HOLDER_NAME;";
	
	console.log("query is:" + getCustomerTripSummary);

	mysql.fetchData(function(err, results) {
		if (err) {
			throw err;
		} else {
			console.log("RESULTS" + JSON.stringify(results));
			res.code = 200;
			res.value = results;
			console.log("response object : " + JSON.stringify(res));
			callback(null, res);
		}
	}, getCustomerTripSummary);
};