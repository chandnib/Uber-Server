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
