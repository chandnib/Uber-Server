var mongo = require("../routes/mongo");
var mongoURL = "mongodb://localhost:27017/UberPrototypeDB";
var async = require('async');
var ObjectId = require('mongodb').ObjectID;

var mysql = require('mysql');
var connection = mysql.createConnection({
	multipleStatements: true,
	host : 'localhost',
	user : 'root',
	password : 'YyX26VXPxLHAGQK8',
	database: 'uberdb',
	connectTimeout: 6000,
	waitForConnections: true,
	pool: false,
});

var self=this;

exports.verifyUser = function(msg, callback){
	try{
		var res = {};
		connection.query("select * from ADMIN where EMAIL = '" + msg.EMAIL + "'",function(err,user){
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
		});
	}catch(e){
		console.log("verifyUser : Error : " + e);
	}
};
