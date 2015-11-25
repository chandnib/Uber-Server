var mongo = require("../routes/mongo");
var mongoURL = "mongodb://localhost:27017/UberPrototypeDB";
var async = require('async');
var ObjectId = require('mongodb').ObjectID;
var mysql = require("../routes/mysql");


var self=this;

exports.verifyUser = function(msg, callback){
	try{
		var res = {};
		var queryInsertDriver = "select * from DRIVER where EMAIL = '" + msg.EMAIL + "'";
		mysql.fetchData(function(err,user){
			if(!err){
				if(user != null && user[0].VERIFIED == 1){
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
		},queryInsertDriver);
	}catch(e){
		console.log("verifyUser : Error : " + e);
	}
};
exports.addDriver = function(msg, callback){
	try{
		var res = {};
		var creditCardId;
		var fullName = msg.FIRSTNAME + " " + msg.LASTNAME;
		//First insert into the credit card table
		var insertCarQuery = "INSERT INTO CARS (CAR_MODEL, COLOR, YEAR)"+
		" VALUES ('"+msg.CARMODEL+"','"+msg.CARCOLOR+"','"+ msg.CARYEAR+"');"
		mysql.fetchData(function(err,user){
			if(!err)
				{
				console.log("about to find the car id with: " + msg.CARMODEL);
		   var checkCarQuery = "SELECT ROW_ID FROM CARS WHERE CAR_MODEL ='"+msg.CARMODEL+"' AND COLOR = '"+msg.CARCOLOR+"' AND YEAR = '"+msg.CARYEAR+"';";
				mysql.fetchData(function(err,user){
					if(!err){
						console.log("CAR ID: "+user);
						if(user != null){
							console.log("Credit Card ID: "+user[0].ROW_ID);
							carID = user[0].ROW_ID;
							console.log("checking to see if credit is the same: "+carID);
							var insertCarQuery = "INSERT INTO DRIVER (CAR_ID,FIRST_NAME,LAST_NAME,ADDRESS,CITY,STATE,ZIPCODE,EMAIL,PASSWORD,PHONE_NUM) " +
							"VALUES ('"+carID+"','"+msg.FIRSTNAME+"','"+msg.LASTNAME+"','"+msg.ADDRESS+"','"+msg.CITY+"', '"+msg.STATE+"', '"+msg.ZIPCODE+"', '"+msg.EMAIL+"', '"+msg.PASSWORD+"','"+msg.MOBILENUMBER+"');" 
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
							},insertCarQuery);
							
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
				},checkCarQuery);
		

				}
		},insertCarQuery);
	}catch(e){
		console.log("verifyUser : Error : " + e);
	}
};
