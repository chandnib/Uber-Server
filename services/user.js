var mongo = require("../routes/mongo");
var mongoURL = "mongodb://localhost:27017/SocialMediaPrototypeDB";
//SELECT `ROW_ID`, `FIRST_NAME`, `LAST_NAME`, `EMAIL_ADDR`, `DATE_OF_BIRTH`, `PASSWORD`, `GENDER`, `IMAGE_URL` FROM `USERS` WHERE 1
exports.signup = function(msg, callback){
	var EMAIL_ADDR = msg.EMAIL_ADDR;
	var PASSWORD = msg.PASSWORD;
	var FIRST_NAME = msg.FIRST_NAME;
	var LAST_NAME = msg.LAST_NAME;
	var DATE_OF_BIRTH = msg.DATE_OF_BIRTH;
	var GENDER = msg.GENDER;
	var IMAGE_URL = msg.IMAGE_URL;
	var res = {};

	mongo.connect(mongoURL, function(){ 
		console.log('Connected to mongo at: ' + mongoURL); 
		var coll = mongo.collection('USERS'); 
		coll.findOne({EMAIL_ADDR: EMAIL_ADDR},function(err,user){
			if(!err){
				if(!user){
					coll.insertOne({ROW_ID: 'getNextSequence("userid")',EMAIL_ADDR: EMAIL_ADDR, PASSWORD : PASSWORD, FIRST_NAME:FIRST_NAME, LAST_NAME:LAST_NAME, DATE_OF_BIRTH:DATE_OF_BIRTH,GENDER:GENDER,IMAGE_URL:IMAGE_URL}, function(err,user){
						if(!err){
								console.log("User Sucessfully Inserted" + JSON.stringify(user));
								coll.findOne({EMAIL_ADDR: EMAIL_ADDR},function(err,user){    
								if (!err) {
									if(!user){
										//Unknown Error
										console.log("err" + err);
										res.code = "401";
										res.err  = "Failed to Insert User!!!";
										callback("Failed to Insert User!!!", res);	
									}		 
									else{
										res.code = 200;
										res.EMAIL_ADDR = user['EMAIL_ADDR'];
										res.FIRST_NAME = user['FIRST_NAME'];
										res.LAST_NAME = user['LAST_NAME'];
										res.DATE_OF_BIRTH = user['DATE_OF_BIRTH'];
										res.GENDER = user['GENDER'];
										res.IMAGE_URL = user['IMAGE_URL'];
										res.ROW_ID = user['_id'];
										callback(null, res);
		 
									} 
								}else{
									//Unknown Error
									console.log("err" + err);
									res.code = "401";
									res.err  = "Failed to Create User!!!please try again later...";
									callback(err, res);
								}
							});
						}
						else{
							//Unknown Error
							res.code = "401";
							res.err  = err;
							callback(err, res);
						}
					});	
				}else{
					//Username already Taken
					res.code = "401";
					res.err  = "This Email is already registered to another user!! Please try to register with another Email Address";
					callback(null, res);
				}
			}else{
				//Unknown Error
				res.code = "401";
				res.err  = err;
				callback(err, res);
			}
		});
	});
};

exports.login = function(msg, callback){
	var res = {};
	mongo.connect(mongoURL, function(){ 
		console.log('Connected to mongo at: ' + mongoURL); 
		var coll = mongo.collection('USERS'); 
		console.log("Input from System -- msg : " + JSON.stringify(msg));
		coll.findOne({EMAIL_ADDR: msg.username},function(err,user){
			if(!err){
				if(user != null){
					console.log("User Found !! " + JSON.stringify(user));
					res = user;
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
	});
};


exports.getNewsFeed = function(msg, callback){
	var res = {};
	mongo.connect(mongoURL, function(){ 
		console.log('Connected to mongo at: ' + mongoURL); 
		var coll = mongo.collection('FRIENDS_LIST'); 
		console.log("getNewsFeed from System -- msg : " + JSON.stringify(msg));
		coll.find({ $and: [ { USER1:msg.username }, { ACCEPTED: 'Y'} ] },function(err,user){ 
			if(!err){//Friends
				
			}else{
				//Unknown Error
				res.code = "401";
				res.err  = err;
				callback(err, res);
			}
		});
		
		coll.findOne({EMAIL_ADDR: msg.username},function(err,user){
			if(!err){
				if(user != null){
					console.log("User Found !! " + JSON.stringify(user));
					res = user;
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
	});
};