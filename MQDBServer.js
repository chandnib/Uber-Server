var amqp = require('amqp');
var util = require('util');
var admin = require('./services/admin');
var customer = require('./services/customer');
var driver = require('./services/driver');
var rides = require('./services/rides');
var billing = require('./services/billing');
var connection = amqp.createConnection({host:'localhost'});
var connection1 = amqp.createConnection({host:'localhost'});
var connection2 = amqp.createConnection({host:'localhost'});
var connection3 = amqp.createConnection({host:'localhost'});
var connection4 = amqp.createConnection({host:'localhost'});

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
	connection1.queue('updateCustomer', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			customer.updateCustomer(message, function(err,res){
				console.log("verifyUser Response : " + JSON.stringify(res));
				connection1.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("updateCustomer Queue Created!!! and listening to the Queue!");
	});
	
	connection1.queue('deleteCustomer', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			customer.deleteUser(message, function(err,res){
				console.log("verifyUser Response : " + JSON.stringify(res));
				connection1.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("deleteCustomer Queue Created!!! and listening to the Queue!");
	});
	
		connection1.queue('verifyCustomer', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			customer.verifyUser(message, function(err,res){
				console.log("verifyUser Response : " + JSON.stringify(res));
				connection1.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("verifyCustomer Queue Created!!! and listening to the Queue!");
		});
		
	connection1.queue('addCustomer', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			customer.insertUser(message, function(err,res){
				console.log("verifyUser Response : " + JSON.stringify(res));
				connection1.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("addCustomer Queue Created!!! and listening to the Queue!");
	});
		
	connection1.queue('aboutUser', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			customer.aboutUser(message, function(err,res){
				console.log("verifyUser Response : " + JSON.stringify(res));
				connection1.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("infoCustomer Queue Created!!! and listening to the Queue!");
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
connection2.on('ready', function() {
	connection.queue('aboutDriverUser', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			driver.aboutDriver(message, function(err,res){
				console.log("aboutDriverUser Response : " + JSON.stringify(res));
				connection.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("aboutDriverUser Queue Created!!! and listening to the Queue!");
	});
	
});
connection2.on('ready', function() {
	connection.queue('deleteDriver', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			driver.deleteDriver(message, function(err,res){
				console.log("deleteDriver Response : " + JSON.stringify(res));
				connection.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("deleteDriver Queue Created!!! and listening to the Queue!");
	});
	
});
connection2.on('ready', function() {
	connection.queue('updateDriver', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			driver.updateDriver(message, function(err,res){
				console.log("updateDriver Response : " + JSON.stringify(res));
				connection.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("updateDriver Queue Created!!! and listening to the Queue!");
	});
	
});
connection2.on('ready', function() {
	connection.queue('addDriver', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			driver.addDriver(message, function(err,res){
				console.log("verifyUser Response : " + JSON.stringify(res));
				connection.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("addDriver Queue Created!!! and listening to the Queue!");
	});
	
});
connection3.on('ready', function() {
	connection.queue('uber_createLocation_queue', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			rides.handle_request_createLocation(message, function(err,res){
				console.log("createRides Response : " + JSON.stringify(res));
				connection.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("createRides Queue Created!!! and listening to the Queue!");
	});
	
});

connection3.on('ready', function() {
	connection.queue('uber_createRide_queue', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			rides.handle_request_createRide(message, function(err,res){
				console.log("createRides2 Response : " + JSON.stringify(res));
				connection.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("createRides2 Queue Created!!! and listening to the Queue!");
	});
	
});

connection3.on('ready', function() {
	connection.queue('uber_editRide_queue', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			rides.handle_request_editRide(message, function(err,res){
				console.log("editRide Response : " + JSON.stringify(res));
				connection.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("editRide Queue Created!!! and listening to the Queue!");
	});
	
});

connection3.on('ready', function() {
	connection.queue('uber_deleteRide_queue', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			rides.handle_request_deleteRide(message, function(err,res){
				console.log("deleteRide Response : " + JSON.stringify(res));
				connection.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("deleteRide Queue Created!!! and listening to the Queue!");
	});
	
});


//Call added for generating bill

connection4.on('ready', function() {
	connection.queue('uber_generateBill_queue', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			rides.generateBill(message, function(err,res){
				console.log("generateBill Response : " + JSON.stringify(res));
				connection.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("uber_generateBill_queue  Created!!! and listening to the Queue!");
	});
	
});

//can you open the console please