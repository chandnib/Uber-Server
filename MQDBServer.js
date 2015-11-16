var amqp = require('amqp');
var util = require('util');
var admin = require('./services/admin');
var connection = amqp.createConnection({host:'localhost'});

connection.on('ready', function() {
	
	connection.queue('verifyUser', function(q){
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
		console.log("verifyUser Queue Created!!! and listening to the Queue!");
	});
	
});