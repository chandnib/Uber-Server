var mongo = require("../routes/mongo");
var mongoURL = "mongodb://localhost:27017/UberPrototypeDB";
var async = require('async');
var ObjectId = require('mongodb').ObjectID;
var mysql = require("../routes/mysql");

var self = this;

exports.verifyUser = function(msg, callback) {
	try {
		var res = {};
		var queryInsertDriver = "select * from DRIVER where EMAIL = '"
				+ msg.EMAIL + "'";
		mysql
				.fetchData(
						function(err, user) {
							if (!err) {
								if (user != null && user[0].VERIFIED == 1) {
									console.log("User Found !! "
											+ JSON.stringify(user[0]));
									delete user[0].PASSWORD
									res = user[0];
									res.code = "200";
									callback(null, res);
								} else {
									// User Not Found
									res.code = "401";
									res.err = "User not found in the system, Please register before trying to Login to the application..";
									callback(null, res);
								}
							} else {
								// Unknown Error
								res.code = "401";
								res.err = err;
								callback(err, res);
							}
						}, queryInsertDriver);
	} catch (e) {
		console.log("verifyUser : Error : " + e);
	}
};
exports.addDriver = function(msg, callback) {
	try {
		var res = {};
		var creditCardId;
		var fullName = msg.FIRSTNAME + " " + msg.LASTNAME;
		// First insert into the credit card table
		var insertCarQuery = "INSERT INTO CARS (CAR_MODEL, COLOR, YEAR)"
				+ " VALUES ('" + msg.CARMODEL + "','" + msg.CARCOLOR + "','"
				+ msg.CARYEAR + "');"
		mysql
				.fetchData(
						function(err, user) {
							if (!err) {
								console.log("about to find the car id with: "
										+ msg.CARMODEL);
								var checkCarQuery = "SELECT ROW_ID FROM CARS WHERE CAR_MODEL ='"
										+ msg.CARMODEL
										+ "' AND COLOR = '"
										+ msg.CARCOLOR
										+ "' AND YEAR = '"
										+ msg.CARYEAR + "';";
								mysql
										.fetchData(
												function(err, user) {
													if (!err) {
														console.log("CAR ID: "
																+ user);
														if (user != null) {
															console
																	.log("Credit Card ID: "
																			+ user[0].ROW_ID);
															carID = user[0].ROW_ID;
															console
																	.log("checking to see if credit is the same: "
																			+ carID);
															var insertCarQuery = "INSERT INTO DRIVER (CAR_ID,FIRST_NAME,LAST_NAME,ADDRESS,CITY,STATE,ZIPCODE,EMAIL,PASSWORD,PHONE_NUM) "
																	+ "VALUES ('"
																	+ carID
																	+ "','"
																	+ msg.FIRSTNAME
																	+ "','"
																	+ msg.LASTNAME
																	+ "','"
																	+ msg.ADDRESS
																	+ "','"
																	+ msg.CITY
																	+ "', '"
																	+ msg.STATE
																	+ "', '"
																	+ msg.ZIPCODE
																	+ "', '"
																	+ msg.EMAIL
																	+ "', '"
																	+ msg.PASSWORD
																	+ "','"
																	+ msg.MOBILENUMBER
																	+ "');"
															mysql
																	.fetchData(
																			function(
																					err,
																					user) {
																				if (!err) {
																					if (user != null) {
																						res.code = "200";
																						callback(
																								null,
																								res);
																					} else {
																						// User
																						// Not
																						// Found
																						// so
																						// added
																						// to
																						// the
																						// system
																						res.code = "401";

																						callback(
																								err,
																								res);
																					}
																				} else {
																					// Unknown
																					// Error
																					res.code = "401";
																					res.err = err;
																					callback(
																							err,
																							res);
																				}
																			},
																			insertCarQuery);

														} else {
															// User Not Found so
															// added to the
															// system
															res.code = "401";
															res.err = err;
															callback(err, res);
														}
													} else {
														// Unknown Error
														res.code = "401";
														res.err = err;
														callback(err, res);
													}
												}, checkCarQuery);

							}
						}, insertCarQuery);
	} catch (e) {
		console.log("verifyUser : Error : " + e);
	}
};

exports.deleteDriver = function(msg, callback) {
	try {
		var res = {};
		var verifyCustomerQuery = "UPDATE DRIVER SET VERIFIED = 0 where EMAIL = '"
				+ msg.EMAIL + "'";
		mysql.fetchData(function(err, user) {
			if (!err) {
				if (user != null) {
					res.code = "200";
					callback(null, res);
				} else {
					// User Not Found
					res.code = "401";
					res.err = "User not found in the system";
					callback(null, res);
				}
			} else {
				// Unknown Error
				res.code = "401";
				res.err = err;
				callback(err, res);
			}
		}, verifyCustomerQuery);
	} catch (e) {
		console.log("deleteDriver : Error : " + e);
	}
};
exports.updateDriver = function(msg, callback) {
	var res = {};
	try {
		var getUser = "select * from DRIVER, CARS where EMAIL='" + msg.OLDEMAIL + "' AND DRIVER.CAR_ID = CARS.ROW_ID";
		console.log("Query is:" + getUser);
		console.log("msg: " + msg.FIRSTNAME)

		mysql.fetchData(function(err, results) {
			if (err) {
				throw err;
			} else {
				if (results.length > 0) {
					if (!msg.FIRSTNAME) {
						msg.FIRSTNAME = results[0].FIRST_NAME;
					}
					if (!msg.LASTNAME) {
						msg.LASTNAME = results[0].LAST_NAME;
					}
					if (!msg.ADDRESS) {
						msg.ADDRESS = results[0].ADDRESS;
					}
					if (!msg.CITY) {
						msg.CITY = results[0].CITY;
					}
					if (!msg.STATE) {
						msg.STATE = results[0].STATE;
					}
					if (!msg.CARMODEL) {
						msg.CARMODEL = results[0].CAR_MODEL;
					}
					if (!msg.CARCOLOR) {
						msg.CARCOLOR = results[0].COLOR;
					}
					if (!msg.CARYEAR) {
						msg.CARYEAR = results[0].YEAR;
					}
					if (!msg.ZIPCODE) {
						msg.ZIPCODE = results[0].ZIPCODE;
					}
					if (!msg.EMAIL) {
						msg.EMAIL = results[0].EMAIL;
					}
					if (!msg.PHONENUMBER) {
						msg.PHONENUMBER = results[0].PHONE_NUM;
					}
					if (!msg.PASSWORD) {
						msg.PASSWORD = results[0].PASSWORD;
					}
					var getUser = "UPDATE DRIVER SET FIRST_NAME ='"
							+ msg.FIRSTNAME + "', LAST_NAME='" + msg.LASTNAME
							+ "', ADDRESS ='" + msg.ADDRESS + "', CITY='"
							+ msg.CITY + "', STATE='" + msg.STATE
							+ "', ZIPCODE='" + msg.ZIPCODE + "', EMAIL='"
							+ msg.EMAIL + "', PHONE_NUM='" + msg.PHONENUMBER
							+ "', PASSWORD='" + msg.PASSWORD
							+ "' WHERE EMAIL='" + msg.OLDEMAIL + "';";
					getUser += "UPDATE CARS SET CAR_MODEL='" + msg.CARMODEL
							+ "', COLOR='" + msg.CARCOLOR + "', YEAR ='"
							+ msg.CARYEAR + "'WHERE CARS.ROW_ID= '"
							+ results[0].CAR_ID + "';";

					console.log("Query is:" + getUser);
					//Updating driver information
					mysql.fetchData(function(err, results) {
						if (err) {
							res.err = err;
							res.code = "401";
							console.log("Update Errors");
							sendResponse(res);
						} else {
							console.log("Update driver Successful");
							//Updating car information
							console.log("Query is:" + getUser);
							console.log("Update about Successful");
							res.code = "200";
							sendResponse(res);
						}
					}, getUser);

				}
			}
		}, getUser);

		function sendResponse(response) {
			callback(null, response);
		}
	} catch (e) {
		console.log("updateDriver : Error : " + e);
	}
};
exports.aboutDriver = function(msg, callback) {
	try {
		var res = {};
		var verifyDriverQuery = "select * from DRIVER, CARs where EMAIL = '"
				+ msg.EMAIL + "' AND DRIVER.CAR_ID = CARS.ROW_ID";
		mysql
				.fetchData(
						function(err, user) {
							if (!err) {
								if (user != null && user[0].VERIFIED == 1) {
									console.log("User Found And Verfied "
											+ JSON.stringify(user[0]));
									res = user[0];
									res.code = "200";
									console.log("WE GOT THE USER: "
											+ JSON.stringify(res.FIRST_NAME));
									callback(null, res);
								} else {
									//User Not Found
									res.code = "401";
									res.err = "User not found in the system or was not verfied by Admin. Please register before trying to Login to the application or wait until the admin approves you";
									callback(null, res);
								}
							} else {
								//Unknown Error
								res.code = "401";
								res.err = err;
								callback(err, res);
							}
						}, verifyDriverQuery);
	} catch (e) {
		console.log("aboutDriver : Error : " + e);
	}
};
