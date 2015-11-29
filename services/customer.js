var mongo = require("../routes/mongo");
var mongoURL = "mongodb://localhost:27017/UberPrototypeDB";
var async = require('async');
var ObjectId = require('mongodb').ObjectID;
var mysql = require("../routes/mysql");

var self=this;

exports.verifyUser = function(msg, callback){
	try{
		var res = {};
		var verifyCustomerQuery = "SELECT * FROM CUSTOMER WHERE EMAIL = ?";
		var inserts = [msg.EMAIL];
		verifyCustomerQuery = mysql.formatSQLStatment(verifyCustomerQuery,inserts);
		mysql.fetchData(function(err,user){
			if(!err){
				if(user[0] != null){
					if(user[0].VERIFIED == 1){
						console.log("User Found And Verfied " + JSON.stringify(user[0]));
						delete user[0].PASSWORD
						res = user[0];
						res.code = "200";
						callback(null, res);
					}else{
						//User Not Found
						res.code = "401";
						res.err  = "User not found in the system or was not verfied by Admin. Please register before trying to Login to the application or wait until the admin approves you";
						callback(null, res);
					}
				}else{
					//User Not Found
					res.code = "401";
					res.err  = "User not found in the system or was not verfied by Admin. Please register before trying to Login to the application or wait until the admin approves you";
					callback(null, res);
				}
			}else{
				//Unknown Error
				res.code = "401";
				res.err  = err;
				callback(err, res);
			}
		},verifyCustomerQuery);
	}catch(e){
		console.log("verifyUser : Error : " + e);
	}
};

exports.insertUser = function(msg, callback){
	try{
		var res = {};
		var creditCardId;
		var fullName = msg.FIRSTNAME + " " + msg.LASTNAME;
		//First insert into the credit card table
		/*var insertCreditQuery = "INSERT INTO CREDIT_CARDS (CARD_NUM, CARD_HOLDER_NAME, CCV_NUM, MONTH, YEAR)"+
		" VALUES ('"+msg.CREDITCARDNUMBER+"','"+fullName+"','"+ msg.CVV+"','"+msg.MONTH+"','"+msg.YEAR+"');"*/
		
		var insertCreditQuery = "INSERT INTO CREDIT_CARDS (CARD_NUM, CARD_HOLDER_NAME, CCV_NUM, MONTH, YEAR) VALUES (?,?,?,?,?)";
		var inserts = [msg.CREDITCARDNUMBER,fullName,msg.CVV,msg.MONTH,msg.YEAR];
		insertCreditQuery = mysql.formatSQLStatment(insertCreditQuery,inserts);
		
		mysql.fetchData(function(err,user){
			if(!err)
			{
				console.log("about to find the credit card id with: " + fullName);
				var checkCreditQuery = "SELECT ROW_ID FROM CREDIT_CARDS WHERE CARD_HOLDER_NAME = ?;"
				var inserts = [fullName];
				checkCreditQuery = mysql.formatSQLStatment(checkCreditQuery,inserts);
				mysql.fetchData(function(err,user){
					if(!err){
						console.log("Credit Card ID: " + user);
						if(user != null){
							console.log("Credit Card ID: " + user[0].ROW_ID);
							creditCardId = user[0].ROW_ID;
							console.log("checking to see if credit is the same: " + creditCardId);
							/*var insertCustQuery = "INSERT INTO CUSTOMER (FIRST_NAME,LAST_NAME,ADDRESS,CITY,STATE,ZIPCODE,EMAIL,PHONE_NUM,CREDIT_CARD_ID,PASSWORD) " +
							"VALUES ('"+msg.FIRSTNAME+"','"+msg.LASTNAME+"','"+msg.ADDRESS+"','"+msg.CITY+"', '"+msg.STATE+"', '"+msg.ZIPCODE+"', '"+msg.EMAIL+"', '"+msg.MOBILENUMBER+"', '"+creditCardId+"','"+msg.PASSWORD+"');"
							*/
							var insertCustQuery = "INSERT INTO CUSTOMER (FIRST_NAME,LAST_NAME,ADDRESS,CITY,STATE,ZIPCODE,EMAIL,PHONE_NUM,CREDIT_CARD_ID,PASSWORD) " +
							"VALUES (?,?,?,?,?,?,?,?,?,?);"
							var inserts = [msg.FIRSTNAME,msg.LASTNAME,msg.ADDRESS,msg.CITY,msg.STATE,msg.ZIPCODE,msg.EMAIL,msg.MOBILENUMBER,creditCardId,msg.PASSWORD];
							insertCustQuery = mysql.formatSQLStatment(insertCustQuery,inserts);
							mysql.fetchData(function(err,user){
								if(!err){
									if(user != null){
										res.code = "200";
										callback(null, res);
									}else{
										//User Not Found so added to the system
										res.code = "401";

										callback(err, res);
									}
								}else{
									//Unknown Error
									res.code = "401";
									res.err  = err;
									callback(err, res);
								}
							},insertCustQuery);

						}else{
							//User Not Found so added to the system
							res.code = "401";
							res.err = err;
							callback(err, res);
						}
					}else{
						//Unknown Error
						res.code = "401";
						res.err  = err;
						callback(err, res);
					}
				},checkCreditQuery);


			}
		},insertCreditQuery);
	}catch(e){
		console.log("verifyUser : Error : " + e);
	}
};

exports.deleteUser = function(msg, callback){
	try{
		var res = {};
		/*var verifyCustomerQuery = "UPDATE CUSTOMER SET VERIFIED = 0 where EMAIL = '" + msg.EMAIL + "'";*/
		var verifyCustomerQuery = "UPDATE CUSTOMER SET VERIFIED = ? where EMAIL = ?";
		var inserts = [0,msg.EMAIL];
		verifyCustomerQuery = mysql.formatSQLStatment(verifyCustomerQuery,inserts);
		mysql.fetchData(function(err,user){
			if(!err){
				if(user != null){
					res.code = "200";
					callback(null, res);
				}else{
					//User Not Found
					res.code = "401";
					res.err  = "User not found in the system";
					callback(null, res);
				}
			}else{
				//Unknown Error
				res.code = "401";
				res.err  = err;
				callback(err, res);
			}
		},verifyCustomerQuery);
	}catch(e){
		console.log("deleteUser : Error : " + e);
	}
};

exports.updateCustomer = function(msg,callback){
	try{
		/*var getUser="select * from CUSTOMER where EMAIL='"+msg.OLDEMAIL+"'";*/
		var getUser = "select * from CUSTOMER where EMAIL=?";
		var inserts = [msg.OLDEMAIL];
		getUser = mysql.formatSQLStatment(getUser,inserts);
		console.log("Query is:"+getUser);
		console.log("msg: "+msg.FIRSTNAME)
		mysql.fetchData(function(err,results){
			if(err){
				throw err;
			}
			else 
			{
				if(results.length > 0){	
					if(!msg.FIRSTNAME)
					{
						msg.FIRSTNAME = results[0].FIRST_NAME;
					}
					if(!msg.LASTNAME)
					{
						msg.LASTNAME = results[0].LAST_NAME;
					}
					if(!msg.CITY)
					{
						msg.CITY = results[0].CITY;
					}
					if(!msg.ZIPCODE)
					{
						msg.ZIPCODE = results[0].ZIPCODE;
					}
					if(!msg.EMAIL)
					{
						msg.EMAIL = results[0].EMAIL;
					}
					if(!msg.PHONENUMBER)
					{
						msg.PHONENUMBER = results[0].PHONE_NUM;
					}
					if(!msg.PASSWORD)
					{
						msg.PASSWORD = results[0].PASSWORD;
					}
					var getUser="UPDATE CUSTOMER SET FIRST_NAME ='"+msg.FIRSTNAME+"', LAST_NAME='" + msg.LASTNAME +"', CITY='"+msg.CITY+"', ZIPCODE='"+ msg.ZIPCODE +"', EMAIL='"+msg.EMAIL+"', PHONE_NUM='"+msg.PHONENUMBER+"', PASSWORD='"+msg.PASSWORD+"' WHERE EMAIL='"+msg.OLDEMAIL+ "';";
					console.log("Query is:"+getUser);

					mysql.fetchData(function(err,results){
						if(err){
							throw err;
						}
						else 
						{		
							console.log("Update about Successful");
							results.code = "200";
							sendResponse(results);
						}  
					},getUser);
				}
			}
		},getUser);

		function sendResponse(response){
			callback(null, response);
		}
	}catch(e){
		console.log("deleteUser : Error : " + e);
	}	
};

exports.aboutUser = function(msg, callback){
	try{
		var res = {};
		/*var verifyCustomerQuery = "select * from CUSTOMER where EMAIL = '" + msg.EMAIL + "'";*/
		var verifyCustomerQuery = "select * from CUSTOMER where EMAIL = ?";
		var inserts = [msg.EMAIL];
		verifyCustomerQuery = mysql.formatSQLStatment(verifyCustomerQuery,inserts);
		mysql.fetchData(function(err,user){
			if(!err){
				if(user != null){
					if(user[0].VERIFIED == 1){
						console.log("User Found And Verfied " + JSON.stringify(user[0]));
						res = user[0];
						res.code = "200";
						console.log("WE GOT THE USER: " + JSON.stringify(res.FIRST_NAME));
						callback(null, res);
					}else{
						//User Not Found
						res.code = "401";
						res.err  = "User not found in the system or was not verfied by Admin. Please register before trying to Login to the application or wait until the admin approves you";
						callback(null, res);
					}
				}else{
					//User Not Found
					res.code = "401";
					res.err  = "User not found in the system or was not verfied by Admin. Please register before trying to Login to the application or wait until the admin approves you";
					callback(null, res);
				}
			}else{
				//Unknown Error
				res.code = "401";
				res.err  = err;
				callback(err, res);
			}
		},verifyCustomerQuery);
	}catch(e){
		console.log("aboutUser : Error : " + e);
	}
};

exports.uploadProfilePic = function(msg, callback){
	try{
		var res = {};
		var verifyCustomerQuery = "UPDATE CUSTOMER SET IMAGE_URL = ? WHERE ROW_ID = ?";
		var res = {};
		var inserts = [msg.IMAGE_URL,msg.ROW_ID];
		verifyCustomerQuery = mysql.formatSQLStatment(verifyCustomerQuery,inserts)
		mysql.fetchData(function(err,user){
			if(!err){
				console.log("pic updated  " + JSON.stringify(user));
				res = user;
				res.code = "200";
				callback(null, res);
			}else{
				//Unknown Error
				res.code = "401";
				res.err  = err;
				callback(err, res);
			}
		},verifyCustomerQuery);
	}catch(e){
		console.log("uploadProfilePic : Error : " + e);
	}
};

exports.CreateCustomer = function(msg, callback){
	try{
		
		var res = {};
		var creditCardId;
		var fullName = msg.FIRSTNAME + " " + msg.LASTNAME;
		//First insert into the credit card table
		/*var insertCreditQuery = "INSERT INTO CREDIT_CARDS (CARD_NUM, CARD_HOLDER_NAME, CCV_NUM, MONTH, YEAR)"+
		" VALUES ('"+msg.CREDITCARDNUMBER+"','"+fullName+"','"+ msg.CVV+"','"+msg.MONTH+"','"+msg.YEAR+"');"*/
		
		var insertCreditQuery = "INSERT INTO CREDIT_CARDS (CARD_NUM, CARD_HOLDER_NAME, CCV_NUM, MONTH, YEAR) VALUES (?,?,?,?,?)";
		var inserts = [msg.CREDITCARDNUMBER,fullName,msg.CVV,msg.MONTH,msg.YEAR];
		insertCreditQuery = mysql.formatSQLStatment(insertCreditQuery,inserts);
		
		mysql.fetchData(function(err,user){
			if(!err)
			{
				console.log("about to find the credit card id with: " + fullName);
				var checkCreditQuery = "SELECT ROW_ID FROM CREDIT_CARDS WHERE CARD_HOLDER_NAME = ?;"
				var inserts = [fullName]	;
				checkCreditQuery = mysql.formatSQLStatment(checkCreditQuery,inserts);
				mysql.fetchData(function(err,user){
					if(!err){
						console.log("Credit Card ID: " + user);
						if(user != null){
							console.log("Credit Card ID: " + user[0].ROW_ID);
							creditCardId = user[0].ROW_ID;
							console.log("checking to see if credit is the same: " + creditCardId);
							/*var insertCustQuery = "INSERT INTO CUSTOMER (FIRST_NAME,LAST_NAME,ADDRESS,CITY,STATE,ZIPCODE,EMAIL,PHONE_NUM,CREDIT_CARD_ID,PASSWORD) " +
							"VALUES ('"+msg.FIRSTNAME+"','"+msg.LASTNAME+"','"+msg.ADDRESS+"','"+msg.CITY+"', '"+msg.STATE+"', '"+msg.ZIPCODE+"', '"+msg.EMAIL+"', '"+msg.MOBILENUMBER+"', '"+creditCardId+"','"+msg.PASSWORD+"');"
							*/
							var insertCustQuery = "INSERT INTO CUSTOMER (FIRST_NAME,LAST_NAME,ADDRESS,CITY,STATE,ZIPCODE,EMAIL,PHONE_NUM,CREDIT_CARD_ID,PASSWORD,IMAGE_URL,SSN_ID) " +
							"VALUES (?,?,?,?,?,?,?,?,?,?,?,?);"
							var inserts = [msg.FIRSTNAME,msg.LASTNAME,msg.ADDRESS,msg.CITY,msg.STATE,msg.ZIPCODE,msg.EMAIL,msg.MOBILENUMBER,creditCardId,msg.PASSWORD,msg.IMAGE_URL,msg.SSN_ID];
							insertCustQuery = mysql.formatSQLStatment(insertCustQuery,inserts);
							mysql.fetchData(function(err,user){
								if(!err){
									if(user != null){
										res.code = "200";
										callback(null, res);
									}else{
										//User Not Found so added to the system
										res.code = "401";

										callback(err, res);
									}
								}else{
									//Unknown Error
									res.code = "401";
									res.err  = err;
									callback(err, res);
								}
							},insertCustQuery);

						}else{
							//User Not Found so added to the system
							res.code = "401";
							res.err = err;
							callback(err, res);
						}
					}else{
						//Unknown Error
						res.code = "401";
						res.err  = err;
						callback(err, res);
					}
				},checkCreditQuery);


			}
		},insertCreditQuery);
	}catch(e){
		console.log("verifyUser : Error : " + e);
	}
};
