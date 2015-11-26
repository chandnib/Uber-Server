var mongo = require("../routes/mongo");
var mongoURL = "mongodb://localhost:27017/UberPrototypeDB";
var async = require('async');
var ObjectId = require('mongodb').ObjectID;
var mysql = require("../routes/mysql");

var self=this;

exports.verifyUser = function(msg, callback){
	try{
		var verifyUserQuery = "select * from ADMIN where EMAIL = '" + msg.EMAIL + "'";
		var res = {};
		mysql.fetchData(function(err,user){
			if(!err){
				if(user != null){
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
		},verifyUserQuery);
	}catch(e){
		console.log("verifyUser : Error : " + e);
	}
};
