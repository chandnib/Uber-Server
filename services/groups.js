var self=this;
var mongo = require("../routes/mongo");
var mongoURL = "mongodb://localhost:27017/SocialMediaPrototypeDB";
var async = require('async');
var ObjectId = require('mongodb').ObjectID;

var UserInfoGroup;

function queryUserInfoGroup(row_id,callback){
	var coll = mongo.collection('USERS');
	coll.findOne( {"_id" : new ObjectId(row_id) },function(err,userinfo){
		console.log("queryUserInfo -- userinfo : " + JSON.stringify(userinfo));
		self.UserInfoGroup = userinfo;
		callback();
	});
}

function queryUserDetailsGroup(row_id,callback){
	var coll = mongo.collection('USER_DETAILS');
	coll.findOne( {"USER_ID" : new ObjectId(row_id) },function(err,userdetails){
		console.log("queryUserDetails -- userdetails : " +JSON.stringify(userdetails));
		self.UserInfoGroup.HOME_ADDR = userdetails.HOME_ADDR;
		self.UserInfoGroup.WEB_URL = userdetails.WEB_URL;
		self.UserInfoGroup.PROFESSIONAL_SKILLS = userdetails.PROFESSIONAL_SKILLS;
		self.UserInfoGroup.COMPANY = userdetails.COMPANY;
		self.UserInfoGroup.COLLEGE = userdetails.COLLEGE;
		self.UserInfoGroup.HIGH_SCHL = userdetails.HIGH_SCHL;
		self.UserInfoGroup.ABOUT_ME = userdetails.ABOUT_ME;
		self.UserInfoGroup.CURR_CITY = userdetails.CURR_CITY;
		self.UserInfoGroup.PHONE = userdetails.PHONE;
		callback();
	});
}

exports.renderGroupsPage = function(msg, callback){
	try{
		console.log("--------------------------renderGroupsPage----------------------------");
		console.log("renderGroupsPage Request : " + JSON.stringify(msg));
		var res = {};
		var row_id = msg.ROW_ID;
		self.UserInfoGroup = {};
		mongo.connect(mongoURL, function(){
			async.series({
				friendId: async.apply(queryUserInfoGroup,row_id),
				firendsdetails: async.apply(queryUserDetailsGroup,row_id)
			  }, function (error, results) {
			    if (error) {
			    	console.log("renderGroupsPage - Error : " + error);
			    	//Unknown Error
					res.code = "401";
					callback(error, res);
			    }else{
				    console.log("renderGroupsPage  UserInfoGroup -- : " + JSON.stringify(self.UserInfoGroup));
				    res.code = "200";
				    res.content = self.UserInfoGroup;
				    callback(error, res);
			    }
			});
		});
	}catch(e){
		console.log("renderGroupsPage : Error : " + e);
	}
};

var groupIdArray = [];
var groupIds = {};
var groups;

function getGroupIds(ROW_ID,callback){
	console.log("getGroupIds called !!");
	var coll = mongo.collection('GROUP_USERS');
	coll.find({USER_ID:ROW_ID}).toArray(function(err,friends){
		self.groupIds = friends;
		for(var group in self.groupIds){
			console.log("getGroupIds self.groupIds[friend] : " + JSON.stringify(self.groupIds[group]));
			//self.groupIdArray.push({USER_ID:self.groupIds[friend].USER2});
			self.groupIdArray.push(new ObjectId(self.groupIds[group].GROUP_ID));
		}
		callback();
	});
}

function getAllGroupDetails(callback){
	console.log("getAllGroupDetails : " + JSON.stringify(self.groupIdArray));
	var coll = mongo.collection('GROUPS');
	coll.find( {ROW_ID : {$nin:self.groupIdArray}}).toArray(function(err,groupids){
		console.log("getAllGroupDetails groupids who is not in your list: " +JSON.stringify(groupids));
		self.groups = groupids;
		callback();
	});
	
}

exports.loadAllGroups = function(msg, callback){
	try{
		console.log("-----------------loadAllGroups-------------------------------------");
		var res = {};
		var ROW_ID = msg.ROW_ID;
		self.groupIdArray = [];
		
		mongo.connect(mongoURL, function(){ 
			console.log('loadAllGroups Connected to mongo at: ' + mongoURL);
			
			async.series({
				friendId: async.apply(getGroupIds, ROW_ID),
				firendsdetails: getAllGroupDetails
			  }, function (error, results) {
			    if (error) {
			    	console.log("loadAllGroups Error : " + error);
			    	//Unknown Error
					res.code = "401";
					
					callback(error, res);
			    }else{
				    console.log("loadAllGroups results : " + JSON.stringify(results));
				    console.log("loadAllGroups groupIds : " + JSON.stringify(self.groupIds));
				    res.code = "200";
				    res.content  = self.groups;
				    callback(error, res);
			    }
			});
		});
	}catch(e){
		console.log("loadAllGroups : Error : " + e);
	}
};

var mygroupIdArray = [];
var mygroupIds = {};
var mygroups;

function getMyGroupIds(ROW_ID,callback){
	console.log("getMyGroupIds called !!");
	var coll = mongo.collection('GROUP_USERS');
	coll.find({USER_ID:ROW_ID}).toArray(function(err,friends){
		self.mygroupIds = friends;
		for(var group in self.mygroupIds){
			console.log("getMyGroupIds self.mygroupIds[friend] : " + JSON.stringify(self.mygroupIds[group]));
			self.mygroupIdArray.push(new ObjectId(self.mygroupIds[group].GROUP_ID));
		}
		callback();
	});
}

function getMyGroupDetails(callback){
	console.log("getMyGroupDetails : " + JSON.stringify(self.mygroupIdArray));
	var coll = mongo.collection('GROUPS');
	coll.find( {ROW_ID : {$in:self.mygroupIdArray}}).toArray(function(err,groupids){
		console.log("groupids who are in your list: " +JSON.stringify(groupids));
		self.mygroups = groupids;
		callback();
	});
	
}

exports.loadMyGroups = function(msg, callback){
	try{
		console.log("-----------------loadMyGroups-------------------------------------");
		var res = {};
		var ROW_ID = msg.ROW_ID;
		self.mygroupIdArray = [];
		
		mongo.connect(mongoURL, function(){ 
			console.log('loadMyGroups Connected to mongo at: ' + mongoURL);
			
			async.series({
				friendId: async.apply(getMyGroupIds, ROW_ID),
				firendsdetails: getMyGroupDetails
			  }, function (error, results) {
			    if (error) {
			    	console.log("loadMyGroups Error : " + error);
			    	//Unknown Error
					res.code = "401";
					callback(error, res);
			    }else{
				    console.log("loadMyGroups results : " + JSON.stringify(results));
				    console.log("loadMyGroups mygroupIds : " + JSON.stringify(self.mygroupIds));
				    res.code = "200";
				    res.content  = self.mygroups;
				    callback(error, res);
			    }
			});
		});
	}catch(e){
		console.log("loadMyGroups : Error : " + e);
	}
};

exports.addUserToGroup = function(msg, callback){
	try{
		console.log("--------------------------addUserToGroup----------------------------");
		console.log("addUserToGroup Request : " + JSON.stringify(msg));
		var res = {};
		var GROUP_ID = msg.ROW_ID;
		var USER_ID = msg.USER_ID;
		mongo.connect(mongoURL, function(){
			var coll = mongo.collection('GROUP_USERS');
			coll.insertOne({GROUP_ID:GROUP_ID,USER_ID:USER_ID}, function(err,user){
				console.log("addUserToGroup Inserted : " + JSON.stringify(user));
				if(!err){
					res.code = "200";
					callback(err, res);
				}else{
					//Unknown Error
					res.code = "401";
					res.err  = err;
					callback(err, res);
				}
			});
		});
	}catch(e){
		console.log("addUserToGroup : Error : " + e);
	}
};

exports.removeUserFromGroup = function(msg, callback){
	try{
		console.log("--------------------------removeUserFromGroup----------------------------");
		console.log("removeUserFromGroup Request : " + JSON.stringify(msg));
		var res = {};
		var GROUP_ID = msg.ROW_ID;
		var USER_ID = msg.USER_ID;
		mongo.connect(mongoURL, function(){
			var coll = mongo.collection('GROUP_USERS');
			coll.deleteOne({GROUP_ID:GROUP_ID,USER_ID:USER_ID}, function(err,user){
				console.log("removeUserFromGroup deleted : " + JSON.stringify(user));
				if(!err){
					res.code = "200";
					callback(err, res);
				}else{
					//Unknown Error
					res.code = "401";
					res.err  = err;
					callback(err, res);
				}
			});
		});
	}catch(e){
		console.log("removeUserFromGroup : Error : " + e);
	}
};

exports.createGroup = function(msg, callback){
	try{
		console.log("--------------------------createGroup----------------------------");
		console.log("createGroup Request : " + JSON.stringify(msg));
		var res = {};
		var GROUP_NAME = msg.GROUP_NAME;
		var GROUP_INFO = msg.GROUP_INFO;
		var IMAGE_URL = msg.IMAGE_URL;
		var CREATED_BY = msg.CREATED_BY;
		mongo.connect(mongoURL, function(){
			var coll = mongo.collection('GROUPS');
			coll.insert({ROW_ID:"",GROUP_NAME:GROUP_NAME,GROUP_INFO:GROUP_INFO,IMAGE_URL:IMAGE_URL,CREATED_BY:CREATED_BY}, function(err,group){
				console.log("createGroup Inserted : " + JSON.stringify(group));
				if(!err){
					var insertedIds = group.insertedIds;
					coll.updateOne({"_id": new ObjectId(insertedIds[0])}, {$set: { "ROW_ID": insertedIds[0] }}, function(err,response){
						var collGrpUser = mongo.collection('GROUP_USERS');
						collGrpUser.insertOne({GROUP_ID:insertedIds[0].toString(),USER_ID:CREATED_BY}, function(err,user){
							res.code = "200";
							callback(err, res);
						});
					});
				}else{
					//Unknown Error
					res.code = "401";
					res.err  = err;
					callback(err, res);
				}
			});
		});
	}catch(e){
		console.log("createGroup : Error : " + e);
	}
};

exports.navToGroupDetailPage = function(msg, callback){
	try{
		console.log("--------------------------createGroup----------------------------");
		console.log("navToGroupDetailPage Request : " + JSON.stringify(msg));
		var res = {};
		var ROW_ID = msg.ROW_ID;
		mongo.connect(mongoURL, function(){
			var coll = mongo.collection('USERS');
			coll.findOne( {"_id" : new ObjectId(ROW_ID) },function(err,user){
				console.log("navToGroupDetailPage result : " + JSON.stringify(user));
				if(!err){
					res.code = "200";
					res.content = user;
					callback(err, res);
				}else{
					//Unknown Error
					res.code = "401";
					res.err  = err;
					callback(err, res);
				}
			});
		});
	}catch(e){
		console.log("navToGroupDetailPage : Error : " + e);
	}
};

exports.getGroupDetails = function(msg, callback){
	try{
		console.log("--------------------------getGroupDetails----------------------------");
		console.log("getGroupDetails Request : " + JSON.stringify(msg));
		var res = {};
		var groupid = msg.groupid;
		var grouparr = [];
		mongo.connect(mongoURL, function(){
			var coll = mongo.collection('GROUPS');
			coll.findOne( {"_id" : new ObjectId(groupid) },function(err,GROUPS){
				console.log("getGroupDetails result : " + JSON.stringify(GROUPS));
				if(!err){
					res.code = "200";
					grouparr.push(GROUPS);
					res.content = grouparr;
					callback(err, res);
				}else{
					//Unknown Error
					res.code = "401";
					res.err  = err;
					callback(err, res);
				}
			});
		});
	}catch(e){
		console.log("getGroupDetails : Error : " + e);
	}
};

var userIds;
var GrpUserArray;
var userslist;

function findAllUsersInGroup(groupid,callback){
	var coll = mongo.collection('GROUP_USERS');
	coll.find({GROUP_ID:groupid}).toArray(function(err,users){
		self.userIds = users;
		for(var user in self.userIds){
			console.log("self.userIds[user] : " + JSON.stringify(self.userIds[user]));
			self.GrpUserArray.push(new ObjectId(self.userIds[user].USER_ID));
		}
		callback();
	});
}

function getUserDetailsforAllMembers(groupid,callback){
	console.log("getUserDetailsforAllMembers : " + JSON.stringify(self.GrpUserArray));
	var coll = mongo.collection('USERS');
	coll.find( {"_id" : {$in:self.GrpUserArray}}).toArray(function(err,userlists){
		console.log("userlist : " +JSON.stringify(userlists));
		self.userslist = userlists;
		callback();
	});
}

exports.getGroupUserList = function(msg, callback){
	try{
		console.log("--------------------------getGroupUserList----------------------------");
		console.log("getGroupUserList Request : " + JSON.stringify(msg));
		var res = {};
		var groupid = msg.groupid;
		self.GrpUserArray = [];
		self.userIds = {};
		mongo.connect(mongoURL, function(){
			async.series({
				friendId: async.apply(findAllUsersInGroup, groupid),
				firendsdetails: async.apply(getUserDetailsforAllMembers,groupid)
			  }, function (error, results) {
			    if (error) {
			    	console.log("getGroupUserList Error : " + error);
			    	//Unknown Error
					res.code = "401";
					callback(error, res);
			    }else{
				    console.log("getGroupUserList results : " + JSON.stringify(results));
				    console.log("getGroupUserList mygroupIds : " + JSON.stringify(self.userslist));
				    res.code = "200";
				    res.content  = self.userslist;
				    callback(error, res);
			    }
			});
		});
	}catch(e){
		console.log("getGroupUserList : Error : " + e);
	}
};

var newuserIds;
var NewGrpUserArray;
var newuserslist;

function findNewUsersInGroup(groupid,callback){
	var coll = mongo.collection('GROUP_USERS');
	coll.find({GROUP_ID:groupid}).toArray(function(err,users){
		self.newuserIds = users;
		for(var user in self.newuserIds){
			console.log("self.newuserIds[user] : " + JSON.stringify(self.newuserIds[user]));
			self.NewGrpUserArray.push(new ObjectId(self.newuserIds[user].USER_ID));
		}
		callback();
	});
}

function getUserDetailsforNewMembers(groupid,callback){
	console.log("getUserDetailsforNewMembers : " + JSON.stringify(self.NewGrpUserArray));
	var coll = mongo.collection('USERS');
	coll.find( {"_id" : {$nin:self.NewGrpUserArray}}).toArray(function(err,userlists){
		console.log("userlist : " +JSON.stringify(userlists));
		self.newuserslist = userlists;
		callback();
	});
}

exports.getGroupNonMembers = function(msg, callback){
	try{
		console.log("--------------------------getGroupNonMembers----------------------------");
		console.log("getGroupNonMembers Request : " + JSON.stringify(msg));
		var res = {};
		var groupid = msg.groupid;
		self.NewGrpUserArray = [];
		self.newuserIds = {};
		mongo.connect(mongoURL, function(){
			async.series({
				friendId: async.apply(findNewUsersInGroup, groupid),
				firendsdetails: async.apply(getUserDetailsforNewMembers,groupid)
			  }, function (error, results) {
			    if (error) {
			    	console.log("getGroupNonMembers Error : " + error);
			    	//Unknown Error
					res.code = "401";
					callback(error, res);
			    }else{
				    console.log("getGroupNonMembers results : " + JSON.stringify(results));
				    console.log("getGroupNonMembers mygroupIds : " + JSON.stringify(self.newuserslist));
				    res.code = "200";
				    res.content  = self.newuserslist;
				    callback(error, res);
			    }
			});
		});
	}catch(e){
		console.log("getGroupNonMembers : Error : " + e);
	}
};

exports.addUserToGroupAdmin = function(msg, callback){
	try{
		console.log("--------------------------addUserToGroupAdmin----------------------------");
		console.log("addUserToGroupAdmin Request : " + JSON.stringify(msg));
		var res = {};
		var GROUP_ID = msg.GROUP_ID;
		var USER_ID = msg.ROW_ID;
		mongo.connect(mongoURL, function(){
			var coll = mongo.collection('GROUP_USERS');
			coll.insert({GROUP_ID:GROUP_ID,USER_ID:USER_ID}, function(err,group){
				console.log("addUserToGroupAdmin Inserted : " + JSON.stringify(group));
				if(!err){
					res.code = "200";
					callback(err, res);
				}else{
					//Unknown Error
					res.code = "401";
					res.err  = err;
					callback(err, res);
				}
			});
		});
	}catch(e){
		console.log("addUserToGroupAdmin : Error : " + e);
	}
};

exports.removeUserFromGroupAdmin = function(msg, callback){
	try{
		console.log("--------------------------removeUserFromGroupAdmin----------------------------");
		console.log("removeUserFromGroupAdmin Request : " + JSON.stringify(msg));
		var res = {};
		var GROUP_ID = msg.GROUP_ID;
		var USER_ID = msg.ROW_ID;
		mongo.connect(mongoURL, function(){
			var coll = mongo.collection('GROUP_USERS');
			coll.deleteOne({GROUP_ID:GROUP_ID,USER_ID:USER_ID}, function(err,group){
				console.log("removeUserFromGroupAdmin DELETED : " + JSON.stringify(group));
				if(!err){
					res.code = "200";
					callback(err, res);
				}else{
					//Unknown Error
					res.code = "401";
					res.err  = err;
					callback(err, res);
				}
			});
		});
	}catch(e){
		console.log("removeUserFromGroupAdmin : Error : " + e);
	}
};

function deleteGroupMembers(groupid,callback){
	var coll = mongo.collection('GROUP_USERS');
	coll.deleteMany({GROUP_ID:groupid}, function(err,group){
		console.log("deleteGroupMembers ==> deleted ==> " + JSON.stringify(group));
		callback();
	});
}

function deleteMainGroup(groupid,callback){
	var coll = mongo.collection('GROUPS');
	coll.deleteOne({"_id":new ObjectId(groupid)}, function(err,group){
		console.log("deleteMainGroup ==> deleted ==> " + JSON.stringify(group));
		callback();
	});
}

exports.deleteGroup = function(msg, callback){
	try{
		console.log("--------------------------deleteGroup----------------------------");
		console.log("deleteGroup Request : " + JSON.stringify(msg));
		var res = {};
		var GROUP_ID = msg.GROUP_ID;
		mongo.connect(mongoURL, function(){
			async.series({
				groupid : async.apply(deleteGroupMembers, GROUP_ID),
				groupids : async.apply(deleteMainGroup,GROUP_ID)
			  }, function (error, results) {
			    if (error) {
			    	console.log("deleteGroup Error : " + error);
			    	//Unknown Error
					res.code = "401";
					callback(error, res);
			    }else{
				    console.log("deleteGroup results : " + JSON.stringify(results));
				    res.code = "200";
				    callback(error, res);
			    }
			});
		});
	}catch(e){
		console.log("deleteGroup : Error : " + e);
	}
};

