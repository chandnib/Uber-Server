var mongo = require("../routes/mongo");
var mongoURL = "mongodb://localhost:27017/UberPrototypeDB";
var async = require('async');
var ObjectId = require('mongodb').ObjectID;
var mysql = require("../routes/mysql");

var self=this;

exports.verifyUser = function(msg, callback){
	try{
		var queryVerifyAdmin = "select * from ADMIN where EMAIL = ? AND PASSWORD = SHA1(?)";
		var inserts = [msg.EMAIL, msg.PASSWORD];
		queryVerifyAdmin = mysql.formatSQLStatment(queryVerifyAdmin,inserts);
		var res = {};
		mysql.fetchData(function(err,user){
			if(!err){
				if(user[0] != null){
					console.log("User Found !! " + JSON.stringify(user[0]));
					delete user[0].PASSWORD
					res = user[0];
					res.code = "200";
					callback(null, res);
				}else{
					//User Not Found
					res.code = "401";
					res.err  = "User not found in the system, Please register before trying to Login to the application..";
					callback(null, res);
				}
			}else{
				//Unknown Error
				res.code = "401";
				res.err  = err;
				callback(err, res);
			}
		},queryVerifyAdmin);
	}catch(e){
		console.log("verifyUser : Error : " + e);
	}
};

//changes
exports.loadUnverifiedCustomers = function(msg, callback){
	try{
		var verifyUserQuery = "SELECT `ROW_ID`,IMAGE_URL, `FIRST_NAME`, `LAST_NAME`, `ADDRESS`, "
			+"`CITY`, `STATE`, `ZIPCODE`, `EMAIL`, `PHONE_NUM`," 
		+" `CREDIT_CARD_ID`, `VERIFIED` FROM `CUSTOMER` WHERE VERIFIED = 0 OR VERIFIED = 2 LIMIT "+ msg.currentRow	+",100;";
		var res = {};
		mysql.fetchData(function(err,user){
			if(!err){
				if(user != null){
					//console.log("UnVerified Customers Found !! " + JSON.stringify(user));
					res.data = user;
					res.code = "200";
					callback(null, res);
				}else{
					//User Not Found
					res.code = "401";
					res.err  = "User not found in the system, Please register before trying to Login to the application..";
					callback(null, res);
				}
			}else{
				//Unknown Error
				res.code = "401";
				res.err  = err;
				callback(err, res);
			}
		},verifyUserQuery);
	}catch(e){
		console.log("loadUnverifiedCustomers : Error : " + e);
	}
};

exports.approveCustomer = function(msg, callback){
	try{
		var verifyUserQuery = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
		var inserts = ['CUSTOMER','VERIFIED',1,'ROW_ID',msg.ROW_ID];
		verifyUserQuery = mysql.formatSQLStatment(verifyUserQuery,inserts)
		var res = {};
		mysql.fetchData(function(err,user){
			if(!err){
				if(user != null){
					console.log("UnVerified Customers Found !! " + JSON.stringify(user));
					res.data = user;
					res.code = "200";
					callback(null, res);
				}else{
					//User Not Found
					res.code = "401";
					res.err  = "User not found in the system, Please register before trying to Login to the application..";
					callback(null, res);
				}
			}else{
				//Unknown Error
				res.code = "401";
				res.err  = err;
				callback(err, res);
			}
		},verifyUserQuery);
	}catch(e){
		console.log("approveCustomer : Error : " + e);
	}
};

exports.rejectCustomer = function(msg, callback){
	try{
		var verifyUserQuery = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
		var inserts = ['CUSTOMER','VERIFIED',2,'ROW_ID',msg.ROW_ID];
		verifyUserQuery = mysql.formatSQLStatment(verifyUserQuery,inserts)
		var res = {};
		mysql.fetchData(function(err,user){
			if(!err){
				if(user != null){
					console.log("rejectCustomer Customers Found !! " + JSON.stringify(user));
					res.data = user;
					res.code = "200";
					callback(null, res);
				}else{
					//User Not Found
					res.code = "401";
					res.err  = "User not found in the system, Please register before trying to Login to the application..";
					callback(null, res);
				}
			}else{
				//Unknown Error
				res.code = "401";
				res.err  = err;
				callback(err, res);
			}
		},verifyUserQuery);
	}catch(e){
		console.log("rejectCustomer : Error : " + e);
	}
};

exports.approveAllCustomer = function(msg, callback){
	try{
		var verifyUserQuery = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
		var inserts = ['CUSTOMER','VERIFIED',1,'VERIFIED',0];
		verifyUserQuery = mysql.formatSQLStatment(verifyUserQuery,inserts)
		var res = {};
		mysql.fetchData(function(err,user){
			if(!err){
				if(user != null){
					console.log("approveAllCustomer Customers Found !! " + JSON.stringify(user));
					res.data = user;
					res.code = "200";
					callback(null, res);
				}else{
					//User Not Found
					res.code = "401";
					res.err  = "User not found in the system, Please register before trying to Login to the application..";
					callback(null, res);
				}
			}else{
				//Unknown Error
				res.code = "401";
				res.err  = err;
				callback(err, res);
			}
		},verifyUserQuery);
	}catch(e){
		console.log("approveAllCustomer : Error : " + e);
	}
};

exports.rejectAllCustomer = function(msg, callback){
	try{
		var verifyUserQuery = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
		var inserts = ['CUSTOMER','VERIFIED',2,'VERIFIED',0];
		verifyUserQuery = mysql.formatSQLStatment(verifyUserQuery,inserts)
		var res = {};
		mysql.fetchData(function(err,user){
			if(!err){
				if(user != null){
					console.log("rejectAllCustomer Customers Found !! " + JSON.stringify(user));
					res.data = user;
					res.code = "200";
					callback(null, res);
				}else{
					//User Not Found
					res.code = "401";
					res.err  = "User not found in the system, Please register before trying to Login to the application..";
					callback(null, res);
				}
			}else{
				//Unknown Error
				res.code = "401";
				res.err  = err;
				callback(err, res);
			}
		},verifyUserQuery);
	}catch(e){
		console.log("rejectAllCustomer : Error : " + e);
	}
};

//changes
exports.loadUnverifiedDrivers = function(msg, callback){
	try{
		var verifyUserQuery = "SELECT `ROW_ID`,IMAGE_URL, `FIRST_NAME`, `LAST_NAME`, `ADDRESS`, `CITY`, `STATE`, `ZIPCODE`, `EMAIL`, `PHONE_NUM`, `VERIFIED` FROM `DRIVER`  WHERE VERIFIED = 0 OR VERIFIED = 2 LIMIT ?,100;";
		var inserts = [msg.currentDriverRow];
		verifyUserQuery = mysql.formatSQLStatment(verifyUserQuery,inserts)
		var res = {};
		mysql.fetchData(function(err,user){
			if(!err){
				if(user != null){
					//console.log("UnVerified Drivers Found !! " + JSON.stringify(user));
					res.data = user;
					res.code = "200";
					callback(null, res);
				}else{
					//User Not Found
					res.code = "401";
					res.err  = "User not found in the system, Please register before trying to Login to the application..";
					callback(null, res);
				}
			}else{
				//Unknown Error
				res.code = "401";
				res.err  = err;
				callback(err, res);
			}
		},verifyUserQuery);
	}catch(e){
		console.log("loadUnverifiedDrivers : Error : " + e);
	}
};

exports.approveDriver = function(msg, callback){
	try{
		var verifyUserQuery = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
		var inserts = ['DRIVER','VERIFIED',1,'ROW_ID',msg.ROW_ID];
		verifyUserQuery = mysql.formatSQLStatment(verifyUserQuery,inserts)
		var res = {};
		mysql.fetchData(function(err,user){
			if(!err){
				if(user != null){
					console.log("UnVerified Drivers Found !! " + JSON.stringify(user));
					res.data = user;
					res.code = "200";
					callback(null, res);
				}else{
					//User Not Found
					res.code = "401";
					res.err  = "User not found in the system, Please register before trying to Login to the application..";
					callback(null, res);
				}
			}else{
				//Unknown Error
				res.code = "401";
				res.err  = err;
				callback(err, res);
			}
		},verifyUserQuery);
	}catch(e){
		console.log("approveDriver : Error : " + e);
	}
};

exports.rejectDriver = function(msg, callback){
	try{
		var verifyUserQuery = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
		var inserts = ['DRIVER','VERIFIED',2,'ROW_ID',msg.ROW_ID];
		verifyUserQuery = mysql.formatSQLStatment(verifyUserQuery,inserts)
		var res = {};
		mysql.fetchData(function(err,user){
			if(!err){
				if(user != null){
					console.log("rejectDriver Drivers Found !! " + JSON.stringify(user));
					res.data = user;
					res.code = "200";
					callback(null, res);
				}else{
					//User Not Found
					res.code = "401";
					res.err  = "User not found in the system, Please register before trying to Login to the application..";
					callback(null, res);
				}
			}else{
				//Unknown Error
				res.code = "401";
				res.err  = err;
				callback(err, res);
			}
		},verifyUserQuery);
	}catch(e){
		console.log("rejectDriver : Error : " + e);
	}
};

exports.approveAllDriver = function(msg, callback){
	try{
		var verifyUserQuery = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
		var inserts = ['DRIVER','VERIFIED',1,'VERIFIED',0];
		verifyUserQuery = mysql.formatSQLStatment(verifyUserQuery,inserts)
		var res = {};
		mysql.fetchData(function(err,user){
			if(!err){
				if(user != null){
					console.log("approveAllDriver Drivers Found !! " + JSON.stringify(user));
					res.data = user;
					res.code = "200";
					callback(null, res);
				}else{
					//User Not Found
					res.code = "401";
					res.err  = "User not found in the system, Please register before trying to Login to the application..";
					callback(null, res);
				}
			}else{
				//Unknown Error
				res.code = "401";
				res.err  = err;
				callback(err, res);
			}
		},verifyUserQuery);
	}catch(e){
		console.log("approveAllDriver : Error : " + e);
	}
};

exports.rejectAllDriver = function(msg, callback){
	try{
		var verifyUserQuery = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
		var inserts = ['DRIVER','VERIFIED',2,'VERIFIED',0];
		verifyUserQuery = mysql.formatSQLStatment(verifyUserQuery,inserts)
		var res = {};
		mysql.fetchData(function(err,user){
			if(!err){
				if(user != null){
					console.log("rejectAllDriver Drivers Found !! " + JSON.stringify(user));
					res.data = user;
					res.code = "200";
					callback(null, res);
				}else{
					//User Not Found
					res.code = "401";
					res.err  = "User not found in the system, Please register before trying to Login to the application..";
					callback(null, res);
				}
			}else{
				//Unknown Error
				res.code = "401";
				res.err  = err;
				callback(err, res);
			}
		},verifyUserQuery);
	}catch(e){
		console.log("rejectAllDriver : Error : " + e);
	}
};


exports.loadCustomerDetail = function(msg, callback){
	try{
		var verifyUserQuery = "SELECT `ROW_ID`,IMAGE_URL, `FIRST_NAME`, `LAST_NAME`, `ADDRESS`, `CITY`, `STATE`, `ZIPCODE`, `EMAIL`, `PHONE_NUM`, `CREDIT_CARD_ID`, `VERIFIED` FROM `CUSTOMER` where ROW_ID = ?";
		var inserts = [msg.ROW_ID];
		var res = {};
		verifyUserQuery = mysql.formatSQLStatment(verifyUserQuery,inserts)
		mysql.fetchData(function(err,user){
			if(!err){
				if(user != null){
					console.log("loadCustomerDetail Customers Found !! " + JSON.stringify(user));
					res.data = user;
					res.code = "200";
					callback(null, res);
				}else{
					//User Not Found
					res.code = "401";
					res.err  = "User not found in the system, Please register before trying to Login to the application..";
					callback(null, res);
				}
			}else{
				//Unknown Error
				res.code = "401";
				res.err  = err;
				callback(err, res);
			}
		},verifyUserQuery);
	}catch(e){
		console.log("loadCustomerDetail : Error : " + e);
	}
};

exports.loadDriverDetail = function(msg, callback){
	try{
		var verifyUserQuery = "SELECT `ROW_ID`,IMAGE_URL, `FIRST_NAME`, `LAST_NAME`, `ADDRESS`, `CITY`, `STATE`, `ZIPCODE`, `EMAIL`, `PHONE_NUM`, `VERIFIED` FROM `DRIVER` where ROW_ID = ?";
		var inserts = [msg.ROW_ID];
		var res = {};
		verifyUserQuery = mysql.formatSQLStatment(verifyUserQuery,inserts)
		mysql.fetchData(function(err,user){
			if(!err){
				if(user != null){
					console.log("loadDriverDetail Customers Found !! " + JSON.stringify(user));
					res.data = user;
					res.code = "200";
					callback(null, res);
				}else{
					//User Not Found
					res.code = "401";
					res.err  = "User not found in the system, Please register before trying to Login to the application..";
					callback(null, res);
				}
			}else{
				//Unknown Error
				res.code = "401";
				res.err  = err;
				callback(err, res);
			}
		},verifyUserQuery);
	}catch(e){
		console.log("loadDriverDetail : Error : " + e);
	}
};

exports.revenueStats = function(msg, callback){
	try{
		var revenueStatsQuery = "SELECT SUM(B.BILL_AMOUNT) AS BILL,COUNT(R.ROW_ID) AS RIDE,DATE_FORMAT(R.RIDE_START_TIME,'%m-%d-%y') AS RDATE FROM BILLING AS B, RIDES R WHERE B.RIDE_ID = R.ROW_ID AND B.RIDE_ID IN (SELECT ROW_ID FROM RIDES WHERE ACOS( SIN( RADIANS( PICKUP_LATITUDE ) ) * SIN( RADIANS( " + msg.lat + " ) ) + COS( RADIANS( PICKUP_LATITUDE ) ) * COS( RADIANS( " + msg.lat + " )) * COS( RADIANS( PICKUP_LONGITUDE ) - RADIANS( " + msg.long + " )) ) * 6380 < 4.828 AND STATUS = 'E' AND DATE(RIDE_START_TIME) BETWEEN '" + msg.startdate + "' AND '" + msg.enddate + "' AND STATUS = 'E' ) GROUP BY RIDE_START_TIME";
		console.log("query: "+revenueStatsQuery);
		var res = {};
		mysql.fetchData(function(err,user){
			if(!err){
				if(user != null){
					console.log("Stats Found !! " + JSON.stringify(user));
					res.code = 200;
					res.data = user;
					callback(null, res);
				}else{
					//User Not Found
					res.code = 401;
					res.err  = "Stats unavailable to the application..";
					callback(null, res);
				}
			}else{
				//Unknown Error
				res.code = 401;
				res.err  = err;
				callback(err, res);
			}
		},revenueStatsQuery);
	}catch(e){
		console.log("revenueStats : Error : " + e);
	}
};

exports.totalrideStats = function(msg, callback){
	try{
		var totalrideStatsQuery = "SELECT COUNT(ROW_ID) AS AREACOUNT FROM RIDES WHERE ACOS( SIN( RADIANS( PICKUP_LATITUDE ) ) * SIN( RADIANS( " + msg.lat + ") ) + COS( RADIANS( PICKUP_LATITUDE ) ) * COS( RADIANS( " + msg.lat + " )) * COS( RADIANS( PICKUP_LONGITUDE ) - RADIANS( " + msg.long + " )) ) * 6380 < 4.828 AND STATUS = 'E' AND DATE(RIDE_START_TIME) BETWEEN '" + msg.startdate + "' AND '" + msg.enddate + "'";
		var res = {};
		mysql.fetchData(function(err,user){
			if(!err){
				if(user != null){
					console.log("totalrideStatsQuery Stats Found !! " + JSON.stringify(user[0]));
					res.code = 200;
					res.data = user;
					callback(null, res);
				}else{
					//User Not Found
					res.code = 401;
					res.err  = "Stats unavailable to the application..";
					callback(null, res);
				}
			}else{
				//Unknown Error
				res.code = 401;
				res.err  = err;
				callback(err, res);
			}
		},totalrideStatsQuery);
	}catch(e){
		console.log("totalrideStats : Error : " + e);
	}
};

exports.cutomerrideStats = function(msg, callback){
	try{
		var cutomerrideStatsQuery = "SELECT COUNT(ROW_ID) AS CUSTOMERCOUNT FROM RIDES WHERE ACOS( SIN( RADIANS( PICKUP_LATITUDE ) ) * SIN( RADIANS( " + msg.lat + ") ) + COS( RADIANS( PICKUP_LATITUDE ) ) * COS( RADIANS( " + msg.lat + " )) * COS( RADIANS( PICKUP_LONGITUDE ) - RADIANS( " + msg.long + " )) ) * 6380 < 4.828 AND STATUS = 'E' AND DATE(RIDE_START_TIME) BETWEEN '" + msg.startdate + "' AND '" + msg.enddate + "' AND CUSTOMER_ID = "+ msg.Customerid;
		var res = {};
		mysql.fetchData(function(err,user){
			if(!err){
				if(user != null){
					console.log("Stats Found !! " + JSON.stringify(user[0]));
					res.code = 200;
					res.data = user;
					callback(null, res);
				}else{
					//User Not Found
					res.code = 401;
					res.err  = "Stats unavailable to the application..";
					callback(null, res);
				}
			}else{
				//Unknown Error
				res.code = 401;
				res.err  = err;
				callback(err, res);
			}
		},cutomerrideStatsQuery);
	}catch(e){
		console.log("cutomerrideStats : Error : " + e);
	}
};

exports.driverrideStats = function(msg, callback){
	try{
		var driverrideStatsQuery = "SELECT COUNT(ROW_ID) AS DRIVERCOUNT FROM RIDES WHERE ACOS( SIN( RADIANS( PICKUP_LATITUDE ) ) * SIN( RADIANS( " + msg.lat + ") ) + COS( RADIANS( PICKUP_LATITUDE ) ) * COS( RADIANS( " + msg.lat + " )) * COS( RADIANS( PICKUP_LONGITUDE ) - RADIANS( " + msg.long + " )) ) * 6380 < 4.828 AND STATUS = 'E' AND DATE(RIDE_START_TIME) BETWEEN '" + msg.startdate + "' AND '" + msg.enddate + "' AND DRIVER_ID = "+ msg.Driverid;
		var res = {};
		mysql.fetchData(function(err,user){
			if(!err){
				if(user != null){
					console.log("Stats Found !! " + JSON.stringify(user[0]));
					res.code = 200;
					res.data = user;
					callback(null, res);
				}else{
					//User Not Found
					res.code = 401;
					res.err  = "Stats unavailable to the application..";
					callback(null, res);
				}
			}else{
				//Unknown Error
				res.code = 401;
				res.err  = err;
				callback(err, res);
			}
		},driverrideStatsQuery);
	}catch(e){
		console.log("driverrideStats : Error : " + e);
	}
};

// searchBill Method for searching Bills by Parteek
exports.searchBill = function(msg, callback) {
	var res ={};
	var toDate, fromDate, custEmailId, driverEmailId;
	var scene = 0;
	toDate = msg.toDate.split("T")[0];
	fromDate = msg.fromdate.split("T")[0];
	custEmailId = msg.custEmailId;
	driverEmailId = msg.driverEmailId
	console.log("msg" + JSON.stringify(msg));
	console.log("toDate" + toDate + ":" + "fromDate" + fromDate + ":"
			+ "custEmailId" + custEmailId + ":" + "driverEmailId"
			+ driverEmailId);
	var SearchBillQuery;
	var inserts = [];

	SearchBillQuery = "SELECT B.*,D.FIRST_NAME AS DFIRSTNAME,D.LAST_NAME AS DLASTNAME,C.FIRST_NAME AS CFIRSTNAME,C.LAST_NAME AS CLASTNAME FROM DRIVER AS D, CUSTOMER AS C, BILLING AS B WHERE B.DRIVER_ID = D.ROW_ID AND B.CUSTOMER_ID = C.ROW_ID AND BILL_DATE < ? and BILL_DATE > ?";
	inserts.push(toDate);
	inserts.push(fromDate);
	if (undefined != custEmailId || null != custEmailId) {
		SearchBillQuery += "AND C.EMAIL = ?"
		inserts.push(custEmailId);
	}
	if (undefined != driverEmailId || null != driverEmailId) {
		SearchBillQuery += "AND D.EMAIL = ?"
		inserts.push(driverEmailId);
	}
	SearchBillQuery +=" LIMIT "+ msg.currentRow	+",100;";
	SearchBillQuery = mysql.formatSQLStatment(SearchBillQuery, inserts)
		console.log("SearchBillQuery : " + SearchBillQuery);
	mysql
			.fetchData(
					function(err, user) {
						if (!err) {
							if (user.length>0) {
								console
										.log("Search bill Found !! "
												+ JSON.stringify(user));
								res.data = user;
								res.code = "200";
								callback(null, res);
							} else {
								// User Not Found
								res.code = "401";
								res.err = "No bill found in the system, Please change the search criteria ..";
								callback(null, res);
							}
						} else {
							// Unknown Error
							res.code = "401";
							res.err = err;
							callback(err, res);
						}
					}, SearchBillQuery);
};

//searchCustomer Method for searching Bills by Parteek
exports.searchCustomer = function(msg, callback) {
	var res ={};
	var customerFirstName,customerLastName,customerCity,customerEmailId,customerPhoneNo,customerSSNId ;
	customerFirstName = msg.customerFirstName;
	customerLastName = msg.customerLastName;
	customerCity = msg.customerCity;
	customerEmailId = msg.customerEmailId;
	customerPhoneNo = msg.customerPhoneNo;
	customerSSNId = msg.customerSSNId;
	console.log("msg" + JSON.stringify(msg));
	var CustomerBillQuery;
	var inserts = [];

	CustomerBillQuery = "SELECT * FROM CUSTOMER WHERE 1=1 ";
	if (undefined != customerFirstName || null != customerFirstName) {
		CustomerBillQuery += " AND FIRST_NAME = ?"
		inserts.push(customerFirstName);
	}
	if (undefined != customerLastName || null != customerLastName) {
		CustomerBillQuery += " AND LAST_NAME = ?"
		inserts.push(customerLastName);
	}
	if (undefined != customerCity || null != customerCity) {
		CustomerBillQuery += " AND CITY = ?"
		inserts.push(customerCity);
	}
	if (undefined != customerEmailId || null != customerEmailId) {
		CustomerBillQuery += " AND EMAIL = ?"
		inserts.push(customerEmailId);
	}
	if (undefined != customerPhoneNo || null != customerPhoneNo) {
		CustomerBillQuery += " AND PHONE_NUM = ?"
		inserts.push(customerPhoneNo);
	}
	if (undefined != customerSSNId || null != customerSSNId) {
		CustomerBillQuery += " AND SSN_ID = ?"
		inserts.push(customerSSNId);
	}
	CustomerBillQuery +=" LIMIT "+ msg.currentRow	+",100;";
	CustomerBillQuery = mysql.formatSQLStatment(CustomerBillQuery, inserts)
		console.log("CustomerBillQuery : " + CustomerBillQuery);
	mysql
			.fetchData(
					function(err, user) {
						if (!err) {
							if (user.length>0) {
								console
										.log("Search Customer Found !! "
												+ JSON.stringify(user));
								res.data = user;
								res.code = "200";
								callback(null, res);
							} else {
								// User Not Found
								res.code = "401";
								res.err = "No Customer found in the system, Please change the search criteria ..";
								callback(null, res);
							}
						} else {
							// Unknown Error
							res.code = "401";
							res.err = err;
							callback(err, res);
						}
					}, CustomerBillQuery);
};

//searchDriver Method for searching Bills by Parteek
exports.searchDriver = function(msg, callback) {
	var res ={};
	var driverFirstName,driverLastName,driverCity,driverEmailId,driverPhoneNo,driverSSNId ;
	driverFirstName = msg.driverFirstName;
	driverLastName = msg.driverLastName;
	driverCity = msg.driverCity;
	driverEmailId = msg.driverEmailId;
	driverPhoneNo = msg.driverPhoneNo;
	driverSSNId = msg.driverSSNId;
	console.log("msg" + JSON.stringify(msg));
	var DriverBillQuery;
	var inserts = [];

	DriverBillQuery = "SELECT * FROM DRIVER WHERE 1=1 ";
	if (undefined != driverFirstName || null != driverFirstName) {
		DriverBillQuery += " AND FIRST_NAME = ?"
		inserts.push(driverFirstName);
	}
	if (undefined != driverLastName || null != driverLastName) {
		DriverBillQuery += " AND LAST_NAME = ?"
		inserts.push(driverLastName);
	}
	if (undefined != driverCity || null != driverCity) {
		DriverBillQuery += " AND CITY = ?"
		inserts.push(driverCity);
	}
	if (undefined != driverEmailId || null != driverEmailId) {
		DriverBillQuery += " AND EMAIL = ?"
		inserts.push(driverEmailId);
	}
	if (undefined != driverPhoneNo || null != driverPhoneNo) {
		DriverBillQuery += " AND PHONE_NUM = ?"
		inserts.push(driverPhoneNo);
	}
	if (undefined != driverSSNId || null != driverSSNId) {
		DriverBillQuery += " AND SSN_ID = ?"
		inserts.push(driverSSNId);
	}
	DriverBillQuery +=" LIMIT "+ msg.currentRow	+",100;";
	DriverBillQuery = mysql.formatSQLStatment(DriverBillQuery, inserts)
		console.log("DriverBillQuery : " + DriverBillQuery);
	mysql
			.fetchData(
					function(err, user) {
						if (!err) {
							if (user.length>0) {
								console
										.log("Search Driver Found !! "
												+ JSON.stringify(user));
								res.data = user;
								res.code = "200";
								callback(null, res);
							} else {
								// User Not Found
								res.code = "401";
								res.err = "No Driver found in the system, Please change the search criteria ..";
								callback(null, res);
							}
						} else {
							// Unknown Error
							res.code = "401";
							res.err = err;
							callback(err, res);
						}
					}, DriverBillQuery);
};