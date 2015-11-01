var amqp = require('amqp');
var util = require('util');
var user = require('./services/user');
var connection = amqp.createConnection({host:'localhost'});

connection.on('ready', function() {
	
	connection.queue('verifyUser', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			user.login(message, function(err,res){
				console.log("Response : " + JSON.stringify(res));
				connection.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("verifyUser Queue Created!!! and listening to the Queue!");
	});
	
	connection.queue('loginUser', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			user.login(message, function(err,res){
				console.log("Response : " + JSON.stringify(res));
				connection.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("loginUser Queue Created!!! and listening to the Queue!");
	});
	
	connection.queue('createUser', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			user.signup(message, function(err,res){
				console.log("Response : " + JSON.stringify(res));
				connection.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("createUser Queue Created!!! and listening to the Queue!");
	});
	
	
	connection.queue('getNewsFeed', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			user.getNewsFeed(message, function(err,res){
				console.log("Response : " + JSON.stringify(res));
				connection.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("loginUser Queue Created!!! and listening to the Queue!");
	});
	
});