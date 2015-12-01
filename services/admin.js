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
		+" `CREDIT_CARD_ID`, `VERIFIED` FROM `CUSTOMER` LIMIT "+ msg.currentRow	+",100;";
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
		var verifyUserQuery = "SELECT `ROW_ID`,IMAGE_URL, `FIRST_NAME`, `LAST_NAME`, `ADDRESS`, `CITY`, `STATE`, `ZIPCODE`, `EMAIL`, `PHONE_NUM`, `VERIFIED` FROM `DRIVER` LIMIT 100;";
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
		var totalrideStatsQuery = "SELECT COUNT(ROW_ID) AS AREACOUNT FROM RIDES WHERE ACOS( SIN( RADIANS( PICKUP_LATITUDE ) ) * SIN( RADIANS( " + msg.lat + ") ) + COS( RADIANS( PICKUP_LATITUDE ) ) * COS( RADIANS( " + msg.lat + " )) * COS( RADIANS( PICKUP_LONGITUDE ) - RADIANS( " + msg.long + " )) ) * 6380 < 4.828 AND STATUS = 'E' AND DATE(RIDE_START_TIME) = '" + msg.startdate + "'";
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
		var cutomerrideStatsQuery = "SELECT COUNT(ROW_ID) AS CUSTOMERCOUNT FROM RIDES WHERE ACOS( SIN( RADIANS( PICKUP_LATITUDE ) ) * SIN( RADIANS( " + msg.lat + ") ) + COS( RADIANS( PICKUP_LATITUDE ) ) * COS( RADIANS( " + msg.lat + " )) * COS( RADIANS( PICKUP_LONGITUDE ) - RADIANS( " + msg.long + " )) ) * 6380 < 4.828 AND STATUS = 'E' AND DATE(RIDE_START_TIME) = '" + msg.startdate + "' AND CUSTOMER_ID = "+ msg.Customerid;
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
		var driverrideStatsQuery = "SELECT COUNT(ROW_ID) AS DRIVERCOUNT FROM RIDES WHERE ACOS( SIN( RADIANS( PICKUP_LATITUDE ) ) * SIN( RADIANS( " + msg.lat + ") ) + COS( RADIANS( PICKUP_LATITUDE ) ) * COS( RADIANS( " + msg.lat + " )) * COS( RADIANS( PICKUP_LONGITUDE ) - RADIANS( " + msg.long + " )) ) * 6380 < 4.828 AND STATUS = 'E' AND DATE(RIDE_START_TIME) = '" + msg.startdate + "' AND DRIVER_ID = "+ msg.Driverid;
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
	if (undefined != custEmailId) {
		SearchBillQuery += "AND C.EMAIL = ?"
		inserts.push(custEmailId);
	}
	if (undefined != driverEmailId) {
		SearchBillQuery += "AND D.EMAIL = ?"
		inserts.push(driverEmailId);
	}
	SearchBillQuery="LIMIT "+ msg.currentRow	+",100;";
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