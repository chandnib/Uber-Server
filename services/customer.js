var mongo = require("../routes/mongo");
var mongoURL = "mongodb://localhost:27017/UberPrototypeDB";
var async = require('async');
var ObjectId = require('mongodb').ObjectID;
var mysql = require("../routes/mysql");



var self=this;

exports.verifyUser = function(msg, callback){
	try{
		var res = {};
		var verifyCustomerQuery = "select * from CUSTOMER where EMAIL = '" + msg.EMAIL + "'";
		mysql.fetchData(function(err,user){
			if(!err){
				if(user != null && user[0].VERIFIED == 1){
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
		var insertCreditQuery = "INSERT INTO CREDIT_CARDS (CARD_NUM, CARD_HOLDER_NAME, CCV_NUM, MONTH, YEAR)"+
		" VALUES ('"+msg.CREDITCARDNUMBER+"','"+fullName+"','"+ msg.CVV+"','"+msg.MONTH+"','"+msg.YEAR+"');"
		mysql.fetchData(function(err,user){
			if(!err)
				{
				console.log("about to find the credit card id with: " + fullName);
		   var checkCreditQuery = "SELECT ROW_ID FROM CREDIT_CARDS WHERE CARD_HOLDER_NAME ='"+fullName+"';"
				mysql.fetchData(function(err,user){
					if(!err){
						console.log("Credit Card ID: "+user);
						if(user != null){
							console.log("Credit Card ID: "+user[0].ROW_ID);
							creditCardId = user[0].ROW_ID;
							console.log("checking to see if credit is the same: "+creditCardId);
							var insertCustQuery = "INSERT INTO CUSTOMER (FIRST_NAME,LAST_NAME,ADDRESS,CITY,STATE,ZIPCODE,EMAIL,PHONE_NUM,CREDIT_CARD_ID,PASSWORD) " +
							"VALUES ('"+msg.FIRSTNAME+"','"+msg.LASTNAME+"','"+msg.ADDRESS+"','"+msg.CITY+"', '"+msg.STATE+"', '"+msg.ZIPCODE+"', '"+msg.EMAIL+"', '"+msg.MOBILENUMBER+"', '"+creditCardId+"','"+msg.PASSWORD+"');" 
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
