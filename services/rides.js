var mysql = require('../routes/mysql');

//exports.handle_request_createLocation = function(msg, callback) {
//	
//	try{
//	var res = {};
//	console.log("inside create location");
//
//	var location = msg.location;
//	console.log("location: " + JSON.stringify(msg.location));
//	var insertLocation = "INSERT INTO LOCATION(`LATITUDE`, `LONGITUDE`, "
//			+ "`STREET_NUMBER`,`ROUTE`,`LOCALITY`,`CITY`,`STATE`,"
//			+ "`COUNTRY`,`POSTAL_CODE`) " + "VALUES(" + msg.latitude + ","
//			+ msg.longitude + ",'"
//			+ location[0].address_components[0].long_name + "','"
//			+ location[0].address_components[1].long_name + "','"
//			+ location[0].address_components[2].long_name + "','"
//			+ location[0].address_components[3].long_name + "','"
//			+ location[0].address_components[5].long_name + "','"
//			+ location[0].address_components[6].long_name + "','"
//			+ location[0].address_components[7].long_name + "');";
//	console.log("query is:" + insertLocation);
//
//	mysql.fetchData(function(err, results) {
//		if (err) {	
//			throw err;
//		} else {
//			console.log("RESULTS" + results);
//			res.code = 200;
//			res.value = results.insertId;
//			callback(null, res);
//		}
//	}, insertLocation);
//	}catch(e){
//		console.log("CreateLocation : Error : " + e);
//	}
//};

exports.handle_request_createRide = function(msg, callback) {
	
	try{
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
	var distance_covered = msg.distance_covered;
	var total_time = msg.total_time;
	var driver_status = msg.driver_status;

	var insertRide = "INSERT INTO RIDES(`PICKUP_LOCATION`,`DROPOFF_LOCATION`,`CUSTOMER_ID`,`DRIVER_ID`,`RIDE_EVENT_ID`,`STATUS`,`PICKUP_LATITUDE`,`PICKUP_LONGITUDE`,`DROPOFF_LATITUDE`,`DROPOFF_LONGITUDE`,`DISTANCE_COVERED`,`TOTAL_TIME`)VALUES("
			+ "?,?,?,?,?,?,?,?,?,?,?,?);";
	var inserts = [pickup_location,dropoff_location,customer_id,driver_id,43567,'CR',pickup_latitude,pickup_longitude,dropoff_latitude,dropoff_longitude,distance_covered,total_time];
	insertRide = mysql.formatSQLStatment(insertRide,inserts);

	console.log("query is:" + insertRide);

	mysql.fetchData(function(err, results) {
		if (err) {
			res.code = 401;
			res.err  = err;
			callback(err, res);
		} else {
			console.log("RESULTS" + JSON.stringify(results));
			if(results.insertId >= 1)
				{
			res.code = 200;
			res.status = 'CR';
			res.value = results.insertId;
			var setDriverStatus = "UPDATE DRIVER_LOCATION SET ?? = ? where ?? = ?;";
			inserts = ["STATUS",driver_status,"driver_id",driver_id];
			setDriverStatus = mysql.formatSQLStatment(setDriverStatus,inserts);
			
			
			console.log("query is:" + setDriverStatus);
			
			mysql.fetchData(function(err, results_driver_status) {
				if (err) {
					res.code = 401;
					res.err  = err;
					callback(err, res);
				} else {
					console.log("RESULTS" + JSON.stringify(results_driver_status));
					if(results_driver_status.affectedRows >0){
//						res.code = 200;
						res.driver_status = 'U';
					}
					console.log("response is :" + res);
					callback(null, res);
				}
			}, setDriverStatus);
			}
			
			}
		
		}, insertRide);
	}catch(e){
		console.log("createRide : Error : " + e);
	}



};

exports.handle_request_editRide = function(msg, callback) {
	
	try{
	var res = {};
	console.log("inside edit ride");

	var newdropoff_address = msg.newdropoff_address;
	var newdropoff_latitude = msg.newdropoff_latitude;
	var newdropoff_longitude = msg.newdropoff_longitude;
	var customer_id = msg.customer_id;
	var ride_id = msg.ride_id;
	var distance_covered = msg.distance_covered;
	var total_time = msg.total_time;

	var editRide = "UPDATE ?? SET ?? = ? , ?? = ?, ?? = ?, ?? = ? , ?? = ? WHERE ?? = ? AND ?? = ? AND ?? = ? ;";
	var inserts = ["RIDES","DROPOFF_LOCATION",newdropoff_address,"DROPOFF_LATITUDE",newdropoff_latitude,"DROPOFF_LONGITUDE",newdropoff_longitude,"DISTANCE_COVERED",distance_covered,"TOTAL_TIME",total_time,"CUSTOMER_ID",customer_id,"RIDE_END_TIME",'0000-00-00 00:00:00',"ROW_ID",ride_id];
	editRide = mysql.formatSQLStatment(editRide,inserts);

	

	console.log("query is:" + editRide);

	mysql.fetchData(function(err, results) {
		if (err) {
			res.code = 401;
			res.err  = err;
			callback(err, res);
		} else {
			console.log("RESULTS" + JSON.stringify(results));
			if(results.affectedRows >0){
				res.code = 200;
				res.value = results;
			}
			else
				{
				res.code = 401;
				res.err = "Unable to edit ride";
				}
			console.log("response object : " + res);
			callback(null, res);
		}
	}, editRide);
	}catch(e){
		console.log("editRide : Error : " + e);
	}

};

//exports.handle_request_deleteRide = function(msg,callback)
//{
//	try{
//	var res= {};
//	console.log("inside delete ride" + msg.customer_id);
//	var customer_id = msg.customer_id;
//	
//	var deleteRide = "DELETE FROM RIDES WHERE CUSTOMER_ID = " + customer_id + " AND RIDE_END_TIME = '0000-00-00 00:00:00';";
//	
//	console.log("query is:" + deleteRide);
//
//	mysql.fetchData(function(err, results) {
//		if (err) {
//			res.code = 401;
//			res.err  = err;
//			callback(err, res);
//		} else {
//			console.log("RESULTS" + results);
//			res.code = 200;
//			res.value = results;
//			callback(null, res);
//		}
//	}, deleteRide);
//	}catch(e){
//		console.log("deleteRide : Error : " + e);
//	}
//};


exports.handle_request_startRide = function(msg,callback)
{
	try{
	var res= {};
	console.log("inside start ride" + msg.customer_id);
	var ride_id = msg.ride_id;
		
	var startRide = "UPDATE ?? SET ?? = ? , ?? = NOW() WHERE ?? = ? AND ?? = ?";
	var inserts = ["RIDES","STATUS",'S',"RIDE_START_TIME","ROW_ID",ride_id,"RIDE_END_TIME",'0000-00-00 00:00:00'];
	startRide = mysql.formatSQLStatment(startRide,inserts);

	
	console.log("query is:" + startRide);

	mysql.fetchData(function(err, results) {
		if (err) {
			res.code = 401;
			res.err  = err;
			callback(err, res);
		} else {
			console.log("RESULTS" + JSON.stringify(results));
			if(results.affectedRows > 0){
				res.code = 200;
				res.status = 'S';
				res.value = results;
			}
			else
				{
				res.code = 401;
				res.err = "Unable to start ride"
				}
			callback(null, res);
		}
	}, startRide);
	}catch(e){
		console.log("startRide : Error : " + e);
	}
};

exports.handle_request_cancelRide = function(msg,callback)
{
	try{
	var res= {};
	console.log("inside cancel ride" + msg.ride_id);
	var ride_id = msg.ride_id;
	var driver_status = msg.driver_status;
	var driver_id = msg.driver_id;
		
	var cancelRide = "UPDATE ?? SET ?? = ? , ?? = NOW() WHERE ?? = ? AND ?? = ?;";
	var inserts = ["RIDES","STATUS",'CA',"RIDE_END_TIME","ROW_ID",ride_id,"RIDE_END_TIME",'0000-00-00 00:00:00'];
	cancelRide = mysql.formatSQLStatment(cancelRide,inserts);
	
	
	console.log("query is:" + cancelRide);

	mysql.fetchData(function(err, results) {
		if (err) {
			res.code = 401;
			res.err  = err;
			callback(err, res);
		} else{
			console.log("RESULTS" + JSON.stringify(results));
			if(results.affectedRows > 0){
				res.code = 200;
				res.status = 'CA';
				
				var setDriverStatus = "UPDATE DRIVER_LOCATION SET ?? = ? where ?? = ?;";
				inserts = ["STATUS",driver_status,"driver_id",driver_id];
				setDriverStatus = mysql.formatSQLStatment(setDriverStatus,inserts);	
				console.log("query is:" + setDriverStatus);
				
				mysql.fetchData(function(err, results_driver_status) {
					if (err) {
						res.code = 401;
						res.err  = err;
						callback(err, res);
					} else {
						console.log("RESULTS" + JSON.stringify(results_driver_status));
						if(results_driver_status.affectedRows >0){
//							res.code = 200;
							res.driver_status = 'A';
						}
						console.log("response is :" + JSON.stringify(res));
						callback(null, res);
					}
				}, setDriverStatus);
			}
		}
	}, cancelRide);
	
	}catch(e){
		console.log("cancelRide : Error : " + e);
	}
};

exports.handle_request_endRide = function(msg,callback)
{
	try{
	var res= {};
	console.log("inside end ride" + msg.ride_id);
	var ride_id = msg.ride_id;
	var driver_status = msg.driver_status;
	var driver_id = msg.driver_id;
	
	var endRide = "UPDATE ?? SET ?? = ? , ?? = NOW() WHERE ?? = ? AND ?? = ?;";
	var inserts = ["RIDES","STATUS",'E',"RIDE_END_TIME","ROW_ID",ride_id,"RIDE_END_TIME",'0000-00-00 00:00:00'];
	endRide = mysql.formatSQLStatment(endRide,inserts);
	
	
	
	console.log("query is:" + endRide);

	mysql.fetchData(function(err, results) {
		if (err) {
			res.code = 401;
			res.err  = err;
			callback(err, res);
		} else {
			console.log("RESULTS" + JSON.stringify(results));
			if(results.affectedRows > 0){
				res.code = 200;
				res.status = 'E';
				var setDriverStatus = "UPDATE DRIVER_LOCATION SET ?? = ? where ?? = ?;";
				inserts = ["STATUS",driver_status,"driver_id",driver_id];
				setDriverStatus = mysql.formatSQLStatment(setDriverStatus,inserts);		
				console.log("query is:" + setDriverStatus);
				mysql.fetchData(function(err, results_driver_status) {
					if (err) {
						res.code = 401;
						res.err  = err;
						callback(err, res);
					} else {
						console.log("RESULTS" + JSON.stringify(results_driver_status));
						if(results_driver_status.affectedRows >0){
//							res.code = 200;
							res.driver_status = 'A';
						}
						console.log("response is :" + JSON.stringify(res));
						callback(null, res);
					}
				}, setDriverStatus);
			}
		}
	}, endRide);
	}catch(e){
		console.log("endRide : Error : " + e);
	}

};

exports.handle_request_fetchRideStatus = function(msg,callback)
{
	try{
	var res= {};
	console.log("inside end ride" + msg.ride_id);
	var ride_id = msg.ride_id;
	
	var fetchRideStatus = "SELECT ?? FROM ?? WHERE ?? = ?;";
	var inserts = ["STATUS","RIDES","ROW_ID",ride_id];
	fetchRideStatus = mysql.formatSQLStatment(fetchRideStatus,inserts);
	
	console.log("query is:" + fetchRideStatus);

	mysql.fetchData(function(err, results) {
		if (err) {
			res.code = 401;
			res.err  = err;
			callback(err, res);
		} else {
			console.log("RESULTS" + JSON.stringify(results));
			res.code = 200;
			res.value = results;
			console.log("response object : " + JSON.stringify(res));
			callback(null, res);
		}
	}, fetchRideStatus);
	}catch(e){
		console.log("fetchRideStatus : Error : " + e);
	}
};

exports.handle_request_getRideCreated = function(msg,callback)
{
	try{
	var res= {};
	console.log("inside getRideCreated" + msg.driver_id);
	var driver_id = msg.driver_id;
	
	

		var getDetails = "SELECT R.ROW_ID , R.CUSTOMER_ID, C.FIRST_NAME, C.LAST_NAME, R.PICKUP_LOCATION, R.DROPOFF_LOCATION FROM RIDES R, CUSTOMER C WHERE R.DRIVER_ID = ? AND R.RIDE_END_TIME = '0000-00-00 00:00:00' AND R.STATUS = 'CR' AND C.ROW_ID = R.CUSTOMER_ID;";
		var inserts = [driver_id];
		getDetails = mysql.formatSQLStatment(getDetails,inserts);
	
	console.log("query is:" + getDetails);

	mysql.fetchData(function(err, results) {
		if (err) {
			res.code = 401;
			res.err  = err;
			callback(err, res);
		} else {
			console.log("RESULTS" + JSON.stringify(results));
			res.code = 200;
			res.value = results;
			console.log("response object : " + JSON.stringify(res));
			callback(null, res);
		}
	}, getDetails);
	}catch(e){
		console.log("getRideCreated : Error : " + e);
	}
};

exports.handle_request_getCustomerTripSummary = function(msg,callback)
{
	try{
	var res= {};
	console.log("inside handle_request_getCustomerTripSummary" + msg.customer_id);
	var customer_id = msg.customer_id;
	
	var getCustomerTripSummary = "SELECT R.CUSTOMER_ID, R.STATUS, C.FIRST_NAME AS CUSTOMER_FIRST_NAME, R.ROW_ID AS RIDEID, R.PICKUP_LOCATION, D.FIRST_NAME AS DRIVER, DATE_FORMAT(R.RIDE_START_TIME,'%m-%d-%y') AS PICKUP_DATE,	B.BILL_AMOUNT AS FARE, 'UberX' AS CAR, R.PICKUP_LOCATION AS SOURCE , R.DROPOFF_LOCATION AS DESTINATION, TIME(R.RIDE_START_TIME) AS PICKUPTIME, TIME(R.RIDE_END_TIME) AS  DROPOFFTIME, RIGHT(CC.CARD_NUM,4) AS PAYMENT FROM CUSTOMER C, RIDES R, DRIVER D, BILLING B, CREDIT_CARDS CC WHERE R.CUSTOMER_ID = ? AND R.CUSTOMER_ID = C.ROW_ID AND R.DRIVER_ID = D.ROW_ID AND R.CUSTOMER_ID = B.CUSTOMER_ID AND R.DRIVER_ID = B.DRIVER_ID AND  C.CREDIT_CARD_ID = CC.ROW_ID;";
	var inserts = [customer_id];
	getCustomerTripSummary = mysql.formatSQLStatment(getCustomerTripSummary,inserts);
			
			
	console.log("query is:" + getCustomerTripSummary);

	mysql.fetchData(function(err, results) {
		if (err) {
			res.code = 401;
			res.err  = err;
			callback(err, res);
		} else {
			console.log("RESULTS" + JSON.stringify(results));
			res.code = 200;
			res.value = results;
			console.log("response object : " + JSON.stringify(res));
			callback(null, res);
		}
	}, getCustomerTripSummary);
	}catch(e){
		console.log("getCustomerTripSummary : Error : " + e);
	}
};

exports.handle_request_getDriverTripSummary = function(msg,callback)
{
	try{
	var res= {};
	console.log("inside handle_request_getDriverTripSummary" + msg.customer_id);
	var driver_id = msg.driver_id;
	
	var getDriverTripSummary = "SELECT R.CUSTOMER_ID, R.STATUS, C.FIRST_NAME AS CUSTOMER_FIRST_NAME, R.ROW_ID AS RIDE_ID, R.PICKUP_LOCATION, D.FIRST_NAME AS DRIVER, DATE_FORMAT(R.RIDE_START_TIME,'%m-%d-%y') AS PICKUP_DATE,	B.BILL_AMOUNT AS FARE, 'UberX' AS CAR, R.PICKUP_LOCATION AS SOURCE , R.DROPOFF_LOCATION AS DROPOFF_LOCATION, TIME(R.RIDE_START_TIME) AS PICKUPTIME, TIME(R.RIDE_END_TIME) AS  DROPOFFTIME, RIGHT(CC.CARD_NUM,4) AS PAYMENT FROM CUSTOMER C, RIDES R, DRIVER D, BILLING B, CREDIT_CARDS CC WHERE R.DRIVER_ID = ? AND R.CUSTOMER_ID = C.ROW_ID AND R.DRIVER_ID = D.ROW_ID AND R.CUSTOMER_ID = B.CUSTOMER_ID AND R.DRIVER_ID = B.DRIVER_ID AND C.CREDIT_CARD_ID = CC.ROW_ID;";
	var inserts = [driver_id];
	getDriverTripSummary = mysql.formatSQLStatment(getDriverTripSummary,inserts);
	
	
	console.log("query is:" + getDriverTripSummary);

	mysql.fetchData(function(err, results) {
		if (err) {
			res.code = 401;
			res.value = "cannot fetch customer trip summary";
//			res.err  = err;
			callback(err, res);
		} else {
			console.log("RESULTS" + JSON.stringify(results));
			res.code = 200;
			res.value = results;
			console.log("response object : " + JSON.stringify(res));
			callback(null, res);
		}
	}, getDriverTripSummary);
	}catch(e){
		console.log("getDriverTripSummary : Error : " + e);
	}
};