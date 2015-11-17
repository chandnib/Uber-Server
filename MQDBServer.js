var amqp = require('amqp');
var util = require('util');
var admin = require('./services/admin');
var customer = require('./services/customer');
var driver = require('./services/driver');
var connection = amqp.createConnection({host:'localhost'});
var connection1 = amqp.createConnection({host:'localhost'});
var connection2 = amqp.createConnection({host:'localhost'});

connection.on('ready', function() {
	
	connection.queue('verifyAdmin', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			admin.verifyUser(message, function(err,res){
				console.log("verifyUser Response : " + JSON.stringify(res));
				connection.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("verifyAdmin Queue Created!!! and listening to the Queue!");
	});
});

connection1.on('ready', function() {
	connection.queue('verifyCustomer', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			customer.verifyUser(message, function(err,res){
				console.log("verifyUser Response : " + JSON.stringify(res));
				connection.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("verifyCustomer Queue Created!!! and listening to the Queue!");
	});
});
connection1.on('ready', function() {
	connection.queue('addCustomer', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			customer.insertUser(message, function(err,res){
				console.log("verifyUser Response : " + JSON.stringify(res));
				connection.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("addCustomer Queue Created!!! and listening to the Queue!");
	});
});
connection2.on('ready', function() {
	connection.queue('verifyDriver', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			driver.verifyUser(message, function(err,res){
				console.log("verifyUser Response : " + JSON.stringify(res));
				connection.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("verifyDriver Queue Created!!! and listening to the Queue!");
	});
	
});

//can you open the console please