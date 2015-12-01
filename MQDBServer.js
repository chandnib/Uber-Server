var amqp = require('amqp');
var util = require('util');
var admin = require('./services/admin');
var customer = require('./services/customer');
var driver = require('./services/driver');
var rides = require('./services/rides');
var billing = require('./services/billing');
var rating = require('./services/rating');
var connection = amqp.createConnection({host:'localhost'});
var connection1 = amqp.createConnection({host:'localhost'});
var connection2 = amqp.createConnection({host:'localhost'});
var connection3 = amqp.createConnection({host:'localhost'});
var connection4 = amqp.createConnection({host:'localhost'});
var connection5 = amqp.createConnection({host:'localhost'});

//Admin Related Queues
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
	

	connection.queue('loadUnverifiedCustomers', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("loadUnverifiedCustomers => Message: "+JSON.stringify(message));
			util.log("loadUnverifiedCustomers => DeliveryInfo: "+JSON.stringify(deliveryInfo));
			admin.loadUnverifiedCustomers(message, function(err,res){
				//console.log("loadUnverifiedCustomers Response : " + JSON.stringify(res));
				connection.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("loadUnverifiedCustomers Queue Created!!! and listening to the Queue!");
	});

	connection.queue('approveCustomer', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("approveCustomer => Message: "+JSON.stringify(message));
			util.log("approveCustomer => DeliveryInfo: "+JSON.stringify(deliveryInfo));
			admin.approveCustomer(message, function(err,res){
				console.log("approveCustomer Response : " + JSON.stringify(res));
				connection.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("approveCustomer Queue Created!!! and listening to the Queue!");
	});
	
	//changes
	connection.queue('rejectCustomer', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("rejectCustomer => Message: "+JSON.stringify(message));
			util.log("rejectCustomer => DeliveryInfo: "+JSON.stringify(deliveryInfo));
			admin.rejectCustomer(message, function(err,res){
				console.log("rejectCustomer Response : " + JSON.stringify(res));
				connection.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("approveCustomer Queue Created!!! and listening to the Queue!");
	});
	
	//changes
	connection.queue('approveAllCustomer', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("approveAllCustomer => Message: "+JSON.stringify(message));
			util.log("approveAllCustomer => DeliveryInfo: "+JSON.stringify(deliveryInfo));
			admin.approveAllCustomer(message, function(err,res){
				console.log("approveAllCustomer Response : " + JSON.stringify(res));
				connection.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("approveCustomer Queue Created!!! and listening to the Queue!");
	});
	
	//changes
	connection.queue('rejectAllCustomer', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("rejectAllCustomer => Message: "+JSON.stringify(message));
			util.log("rejectAllCustomer => DeliveryInfo: "+JSON.stringify(deliveryInfo));
			admin.rejectAllCustomer(message, function(err,res){
				console.log("rejectAllCustomer Response : " + JSON.stringify(res));
				connection.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("rejectAllCustomer Queue Created!!! and listening to the Queue!");
	});
	
	//changes
	connection.queue('loadUnverifiedDrivers', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("loadUnverifiedDrivers => Message: "+JSON.stringify(message));
			util.log("loadUnverifiedDrivers => DeliveryInfo: "+JSON.stringify(deliveryInfo));
			admin.loadUnverifiedDrivers(message, function(err,res){
				console.log("loadUnverifiedDrivers Response : ");
				connection.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("loadUnverifiedDrivers Queue Created!!! and listening to the Queue!");
	});
	
	//changes
	connection.queue('approveDriver', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("approveDriver => Message: "+JSON.stringify(message));
			util.log("approveDriver => DeliveryInfo: "+JSON.stringify(deliveryInfo));
			admin.approveDriver(message, function(err,res){
				console.log("approveDriver Response : " + JSON.stringify(res));
				connection.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("approveDriver Queue Created!!! and listening to the Queue!");
	});
	
	//changes
	connection.queue('rejectDriver', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("rejectDriver => Message: "+JSON.stringify(message));
			util.log("rejectDriver => DeliveryInfo: "+JSON.stringify(deliveryInfo));
			admin.rejectDriver(message, function(err,res){
				console.log("rejectDriver Response : " + JSON.stringify(res));
				connection.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("approveDriver Queue Created!!! and listening to the Queue!");
	});
	
	//changes
	connection.queue('approveAllDriver', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("approveAllDriver => Message: "+JSON.stringify(message));
			util.log("approveAllDriver => DeliveryInfo: "+JSON.stringify(deliveryInfo));
			admin.approveAllDriver(message, function(err,res){
				console.log("approveAllDriver Response : " + JSON.stringify(res));
				connection.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("approveDriver Queue Created!!! and listening to the Queue!");
	});
	
	//changes
	connection.queue('rejectAllDriver', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("rejectAllDriver => Message: "+JSON.stringify(message));
			util.log("rejectAllDriver => DeliveryInfo: "+JSON.stringify(deliveryInfo));
			admin.rejectAllDriver(message, function(err,res){
				console.log("rejectAllDriver Response : " + JSON.stringify(res));
				connection.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("rejectAllDriver Queue Created!!! and listening to the Queue!");
	});
	
	//changes
	connection.queue('loadCustomerDetail', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("loadCustomerDetail => Message: "+JSON.stringify(message));
			util.log("loadCustomerDetail => DeliveryInfo: "+JSON.stringify(deliveryInfo));
			admin.loadCustomerDetail(message, function(err,res){
				console.log("loadCustomerDetail Response : " + JSON.stringify(res));
				connection.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("loadCustomerDetail Queue Created!!! and listening to the Queue!");
	});
	
	connection.queue('loadDriverDetail', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("loadDriverDetail => Message: "+JSON.stringify(message));
			util.log("loadDriverDetail => DeliveryInfo: "+JSON.stringify(deliveryInfo));
			admin.loadDriverDetail(message, function(err,res){
				console.log("loadDriverDetail Response : " + JSON.stringify(res));
				connection.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("loadDriverDetail Queue Created!!! and listening to the Queue!");
	});
	
	
	// ---Rekha Admin Module ------------------------------------------------------------------

	connection.queue('totalrideStats', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("totalrideStats => Message: "+JSON.stringify(message));
			util.log("totalrideStats => DeliveryInfo: "+JSON.stringify(deliveryInfo));
			admin.totalrideStats(message, function(err,res){
				//console.log("loadUnverifiedCustomers Response : " + JSON.stringify(res));
				connection.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("totalrideStats Queue Created!!! and listening to the Queue!");
	});
	
	connection.queue('cutomerrideStats', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("cutomerrideStats => Message: "+JSON.stringify(message));
			util.log("cutomerrideStats => DeliveryInfo: "+JSON.stringify(deliveryInfo));
			admin.cutomerrideStats(message, function(err,res){
				//console.log("loadUnverifiedCustomers Response : " + JSON.stringify(res));
				connection.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("cutomerrideStats Queue Created!!! and listening to the Queue!");
	});
	
	connection.queue('driverrideStats', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("driverrideStats => Message: "+JSON.stringify(message));
			util.log("driverrideStats => DeliveryInfo: "+JSON.stringify(deliveryInfo));
			admin.driverrideStats(message, function(err,res){
				//console.log("loadUnverifiedCustomers Response : " + JSON.stringify(res));
				connection.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("driverrideStats Queue Created!!! and listening to the Queue!");
	});
	
	connection.queue('revenueStats', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("revenueStats => Message: "+JSON.stringify(message));
			util.log("revenueStats => DeliveryInfo: "+JSON.stringify(deliveryInfo));
			admin.revenueStats(message, function(err,res){
				//console.log("loadUnverifiedCustomers Response : " + JSON.stringify(res));
				connection.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("revenueStats Queue Created!!! and listening to the Queue!");
	});
	
	// Search Bill for Admin
	connection.queue('searchBill', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("searchBill => Message: "+JSON.stringify(message));
			util.log("searchBill => DeliveryInfo: "+JSON.stringify(deliveryInfo));
			admin.searchBill(message, function(err,res){
				console.log("searchBill Response : " + JSON.stringify(res));
				connection.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("searchBill Queue Created!!! and listening to the Queue!");
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
    });

    connection1.on('ready', function() {
    		
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
    	
    	connection1.queue('uploadProfilePic', function(q){
    		q.subscribe(function(message, header, deliveryInfo, messageHeader){
    			util.log(util.format( deliveryInfo.routingKey, message));
    			util.log("uploadProfilePic Message: "+JSON.stringify(message));
    			util.log("uploadProfilePic DeliveryInfo: "+JSON.stringify(deliveryInfo));
    			customer.uploadProfilePic(message, function(err,res){
    				console.log("uploadProfilePic Response : " + JSON.stringify(res));
    				connection1.publish(messageHeader.replyTo, res, {
    					contentType:'application/json',
    					contentEncoding:'utf-8',
    					correlationId:messageHeader.correlationId
    				});
    			});
    		});
    		console.log("uploadProfilePic Queue Created!!! and listening to the Queue!");
    	});
    	
    	connection1.queue('CreateCustomer', function(q){
    		q.subscribe(function(message, header, deliveryInfo, messageHeader){
    			util.log(util.format( deliveryInfo.routingKey, message));
    			util.log("CreateCustomer Message: "+JSON.stringify(message));
    			util.log("CreateCustomer DeliveryInfo: "+JSON.stringify(deliveryInfo));
    			customer.CreateCustomer(message, function(err,res){
    				console.log("CreateCustomer Response : " + JSON.stringify(res));
    				connection1.publish(messageHeader.replyTo, res, {
    					contentType:'application/json',
    					contentEncoding:'utf-8',
    					correlationId:messageHeader.correlationId
    				});
    			});
    		});
    		console.log("CreateCustomer Queue Created!!! and listening to the Queue!");
    	});
    });
    	
    //Driver Related Queues
    connection2.on('ready', function() {
    	connection2.queue('verifyDriver', function(q){
    		q.subscribe(function(message, header, deliveryInfo, messageHeader){
    			util.log(util.format( deliveryInfo.routingKey, message));
    			util.log("Message: "+JSON.stringify(message));
    			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
    			driver.verifyUser(message, function(err,res){
    				console.log("verifyUser Response : " + JSON.stringify(res));
    				connection2.publish(messageHeader.replyTo, res, {
    					contentType:'application/json',
    					contentEncoding:'utf-8',
    					correlationId:messageHeader.correlationId
    				});
    			});
    		});
    		console.log("verifyDriver Queue Created!!! and listening to the Queue!");
    	});
    	
    	connection2.queue('aboutDriverUser', function(q){
    		q.subscribe(function(message, header, deliveryInfo, messageHeader){
    			util.log(util.format( deliveryInfo.routingKey, message));
    			util.log("Message: "+JSON.stringify(message));
    			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
    			driver.aboutDriver(message, function(err,res){
    				console.log("aboutDriverUser Response : " + JSON.stringify(res));
    				connection2.publish(messageHeader.replyTo, res, {
    					contentType:'application/json',
    					contentEncoding:'utf-8',
    					correlationId:messageHeader.correlationId
    				});
    			});
    		});
    		console.log("aboutDriverUser Queue Created!!! and listening to the Queue!");
    	});
    	
    	connection2.queue('deleteDriver', function(q){
    		q.subscribe(function(message, header, deliveryInfo, messageHeader){
    			util.log(util.format( deliveryInfo.routingKey, message));
    			util.log("Message: "+JSON.stringify(message));
    			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
    			driver.deleteDriver(message, function(err,res){
    				console.log("deleteDriver Response : " + JSON.stringify(res));
    				connection2.publish(messageHeader.replyTo, res, {
    					contentType:'application/json',
    					contentEncoding:'utf-8',
    					correlationId:messageHeader.correlationId
    				});
    			});
    		});
    		console.log("deleteDriver Queue Created!!! and listening to the Queue!");
    	});
    	
    	connection2.queue('updateDriver', function(q){
    		q.subscribe(function(message, header, deliveryInfo, messageHeader){
    			util.log(util.format( deliveryInfo.routingKey, message));
    			util.log("Message: "+JSON.stringify(message));
    			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
    			driver.updateDriver(message, function(err,res){
    				console.log("updateDriver Response : " + JSON.stringify(res));
    				connection2.publish(messageHeader.replyTo, res, {
    					contentType:'application/json',
    					contentEncoding:'utf-8',
    					correlationId:messageHeader.correlationId
    				});
    			});
    		});
    		console.log("updateDriver Queue Created!!! and listening to the Queue!");
    	});
    	
    	connection2.queue('addDriver', function(q){
    		q.subscribe(function(message, header, deliveryInfo, messageHeader){
    			util.log(util.format( deliveryInfo.routingKey, message));
    			util.log("Message: "+JSON.stringify(message));
    			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
    			driver.addDriver(message, function(err,res){
    				console.log("verifyUser Response : " + JSON.stringify(res));
    				connection2.publish(messageHeader.replyTo, res, {
    					contentType:'application/json',
    					contentEncoding:'utf-8',
    					correlationId:messageHeader.correlationId
    				});
    			});
    		});
    		console.log("addDriver Queue Created!!! and listening to the Queue!");
    	});
    	
    	connection2.queue('uploadProfilePicDriver', function(q){
    		q.subscribe(function(message, header, deliveryInfo, messageHeader){
    			util.log(util.format( deliveryInfo.routingKey, message));
    			util.log("uploadProfilePicDriver Message: "+JSON.stringify(message));
    			util.log(" uploadProfilePicDriver DeliveryInfo: "+JSON.stringify(deliveryInfo));
    			driver.uploadProfilePicDriver(message, function(err,res){
    				console.log("uploadProfilePicDriver Response : " + JSON.stringify(res));
    				connection2.publish(messageHeader.replyTo, res, {
    					contentType:'application/json',
    					contentEncoding:'utf-8',
    					correlationId:messageHeader.correlationId
    				});
    			});
    		});
    		console.log("addDriver Queue Created!!! and listening to the Queue!");
    	});
    	
    	connection2.queue('CreateDrivers', function(q){
    		q.subscribe(function(message, header, deliveryInfo, messageHeader){
    			util.log(util.format( deliveryInfo.routingKey, message));
    			util.log("CreateDrivers Message: "+JSON.stringify(message));
    			util.log(" CreateDrivers DeliveryInfo: "+JSON.stringify(deliveryInfo));
    			driver.CreateDrivers(message, function(err,res){
    				console.log("CreateDrivers Response : " + JSON.stringify(res));
    				connection2.publish(messageHeader.replyTo, res, {
    					contentType:'application/json',
    					contentEncoding:'utf-8',
    					correlationId:messageHeader.correlationId
    				});
    			});
    		});
    		console.log("CreateDrivers Queue Created!!! and listening to the Queue!");
    	});
    	
    	connection2.queue('showDriverin10Mile_queue', function(q){
    		q.subscribe(function(message, header, deliveryInfo, messageHeader){
    			util.log(util.format( deliveryInfo.routingKey, message));
    			util.log("Message: "+JSON.stringify(message));
    			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
    			driver.showDriverin10Mile(message, function(err,res){
    				console.log("verifyUser Response : " + JSON.stringify(res));
    				connection2.publish(messageHeader.replyTo, res, {
    					contentType:'application/json',
    					contentEncoding:'utf-8',
    					correlationId:messageHeader.correlationId
    				});
    			});
    		});
    		console.log("showDriverin10Mile Queue Created!!! and listening to the Queue!");
    	});
    	
    });
    	
    //-----------------------------------------RIDES MODULE START -------------------------------------------------------------//
    connection3.on('ready', function() {
    	connection3.queue('uber_createLocation_queue', function(q){
    		q.subscribe(function(message, header, deliveryInfo, messageHeader){
    			util.log(util.format( deliveryInfo.routingKey, message));
    			util.log("Message: "+JSON.stringify(message));
    			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
    			rides.handle_request_createLocation(message, function(err,res){
    				console.log("createRides Response : " + JSON.stringify(res));
    				connection3.publish(messageHeader.replyTo, res, {
    					contentType:'application/json',
    					contentEncoding:'utf-8',
    					correlationId:messageHeader.correlationId
    				});
    			});
    		});
    		console.log("createRides Queue Created!!! and listening to the Queue!");
    	});
    	
    	connection3.queue('uber_createRide_queue', function(q){
    		q.subscribe(function(message, header, deliveryInfo, messageHeader){
    			util.log(util.format( deliveryInfo.routingKey, message));
    			util.log("Message: "+JSON.stringify(message));
    			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
    			rides.handle_request_createRide(message, function(err,res){
    				console.log("createRides2 Response : " + JSON.stringify(res));
    				connection3.publish(messageHeader.replyTo, res, {
    					contentType:'application/json',
    					contentEncoding:'utf-8',
    					correlationId:messageHeader.correlationId
    				});
    			});
    		});
    		console.log("createRides2 Queue Created!!! and listening to the Queue!");
    	});
    	
    	connection3.queue('uber_editRide_queue', function(q){
    		q.subscribe(function(message, header, deliveryInfo, messageHeader){
    			util.log(util.format( deliveryInfo.routingKey, message));
    			util.log("Message: "+JSON.stringify(message));
    			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
    			rides.handle_request_editRide(message, function(err,res){
    				console.log("editRide Response : " + JSON.stringify(res));
    				connection3.publish(messageHeader.replyTo, res, {
    					contentType:'application/json',
    					contentEncoding:'utf-8',
    					correlationId:messageHeader.correlationId
    				});
    			});
    		});
    		console.log("editRide Queue Created!!! and listening to the Queue!");
    	});
    	
    	connection3.queue('uber_deleteRide_queue', function(q){
    		q.subscribe(function(message, header, deliveryInfo, messageHeader){
    			util.log(util.format( deliveryInfo.routingKey, message));
    			util.log("Message: "+JSON.stringify(message));
    			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
    			rides.handle_request_deleteRide(message, function(err,res){
    				console.log("deleteRide Response : " + JSON.stringify(res));
    				connection3.publish(messageHeader.replyTo, res, {
    					contentType:'application/json',
    					contentEncoding:'utf-8',
    					correlationId:messageHeader.correlationId
    				});
    			});
    		});
    		console.log("deleteRide Queue Created!!! and listening to the Queue!");
    	});
    	
    	connection3.queue('uber_startRide_queue', function(q){
    		q.subscribe(function(message, header, deliveryInfo, messageHeader){
    			util.log(util.format( deliveryInfo.routingKey, message));
    			util.log("Message: "+JSON.stringify(message));
    			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
    			rides.handle_request_startRide(message, function(err,res){
    				console.log("startRide Response : " + JSON.stringify(res));
    				connection3.publish(messageHeader.replyTo, res, {
    					contentType:'application/json',
    					contentEncoding:'utf-8',
    					correlationId:messageHeader.correlationId
    				});
    			});
    		});
    		console.log("startRide Queue Created!!! and listening to the Queue!");
    	});
    	
    	connection3.queue('uber_cancelRide_queue', function(q){
    		q.subscribe(function(message, header, deliveryInfo, messageHeader){
    			util.log(util.format( deliveryInfo.routingKey, message));
    			util.log("Message: "+JSON.stringify(message));
    			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
    			rides.handle_request_cancelRide(message, function(err,res){
    				console.log("cancelRide Response : " + JSON.stringify(res));
    				connection3.publish(messageHeader.replyTo, res, {
    					contentType:'application/json',
    					contentEncoding:'utf-8',
    					correlationId:messageHeader.correlationId
    				});
    			});
    		});
    		console.log("cancelRide Queue Created!!! and listening to the Queue!");
    	});
    	
    	connection3.queue('uber_endRide_queue', function(q){
    		q.subscribe(function(message, header, deliveryInfo, messageHeader){
    			util.log(util.format( deliveryInfo.routingKey, message));
    			util.log("Message: "+JSON.stringify(message));
    			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
    			rides.handle_request_endRide(message, function(err,res){
    				console.log("endRide Response : " + JSON.stringify(res));
    				connection3.publish(messageHeader.replyTo, res, {
    					contentType:'application/json',
    					contentEncoding:'utf-8',
    					correlationId:messageHeader.correlationId
    				});
    			});
    		});
    		console.log("endRide Queue Created!!! and listening to the Queue!");
    	});
    	
    	connection3.queue('uber_fetchRideStatus_queue', function(q){
    		q.subscribe(function(message, header, deliveryInfo, messageHeader){
    			util.log(util.format( deliveryInfo.routingKey, message));
    			util.log("Message: "+JSON.stringify(message));
    			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
    			rides.handle_request_fetchRideStatus(message, function(err,res){
    				console.log("fetchRideStatus Response : " + JSON.stringify(res));
    				connection3.publish(messageHeader.replyTo, res, {
    					contentType:'application/json',
    					contentEncoding:'utf-8',
    					correlationId:messageHeader.correlationId
    				});
    			});
    		});
    		console.log("fetchRideStatus Queue Created!!! and listening to the Queue!");
    	});
    	
    	connection3.queue('uber_getRideCreated_queue', function(q){
    		q.subscribe(function(message, header, deliveryInfo, messageHeader){
    			util.log(util.format( deliveryInfo.routingKey, message));
    			util.log("Message: "+JSON.stringify(message));
    			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
    			rides.handle_request_getRideCreated(message, function(err,res){
    				console.log("getRideCreatedQueue Response : " + JSON.stringify(res));
    				connection3.publish(messageHeader.replyTo, res, {
    					contentType:'application/json',
    					contentEncoding:'utf-8',
    					correlationId:messageHeader.correlationId
    				});
    			});
    		});
    		console.log("getRideCreated Queue Created!!! and listening to the Queue!");
    	});
    	
    	connection3.queue('uber_getCustomerTripSummary_queue', function(q){
    		q.subscribe(function(message, header, deliveryInfo, messageHeader){
    			util.log(util.format( deliveryInfo.routingKey, message));
    			util.log("Message: "+JSON.stringify(message));
    			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
    			rides.handle_request_getCustomerTripSummary(message, function(err,res){
    				console.log("getCustomerTripSummary Response : " + JSON.stringify(res));
    				connection3.publish(messageHeader.replyTo, res, {
    					contentType:'application/json',
    					contentEncoding:'utf-8',
    					correlationId:messageHeader.correlationId
    				});
    			});
    		});
    		console.log("getCustomerTripSummary Queue Created!!! and listening to the Queue!");
    	});
    	
    	connection3.queue('uber_getDriverTripSummary_queue', function(q){
    		q.subscribe(function(message, header, deliveryInfo, messageHeader){
    			util.log(util.format( deliveryInfo.routingKey, message));
    			util.log("Message: "+JSON.stringify(message));
    			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
    			rides.handle_request_getDriverTripSummary(message, function(err,res){
    				console.log("getDriverTripSummary Response : " + JSON.stringify(res));
    				connection3.publish(messageHeader.replyTo, res, {
    					contentType:'application/json',
    					contentEncoding:'utf-8',
    					correlationId:messageHeader.correlationId
    				});
    			});
    		});
    		console.log("getDriverTripSummary Queue Created!!! and listening to the Queue!");
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
});

connection1.on('ready', function() {
		
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
	
	connection1.queue('uploadProfilePic', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("uploadProfilePic Message: "+JSON.stringify(message));
			util.log("uploadProfilePic DeliveryInfo: "+JSON.stringify(deliveryInfo));
			customer.uploadProfilePic(message, function(err,res){
				console.log("uploadProfilePic Response : " + JSON.stringify(res));
				connection1.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("uploadProfilePic Queue Created!!! and listening to the Queue!");
	});
	
	connection1.queue('uploadEventRidePic', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("uploadEventRidePic Message: "+JSON.stringify(message));
			util.log("uploadEventRidePic DeliveryInfo: "+JSON.stringify(deliveryInfo));
			customer.uploadEventRidePic(message, function(err,res){
				console.log("uploadEventRidePic Response : " + JSON.stringify(res));
				connection1.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("uploadEventRidePic Queue Created!!! and listening to the Queue!");
	});
	
	connection1.queue('CreateCustomer', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("CreateCustomer Message: "+JSON.stringify(message));
			util.log("CreateCustomer DeliveryInfo: "+JSON.stringify(deliveryInfo));
			customer.CreateCustomer(message, function(err,res){
				console.log("CreateCustomer Response : " + JSON.stringify(res));
				connection1.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("CreateCustomer Queue Created!!! and listening to the Queue!");
	});
});
	
//Driver Related Queues
connection2.on('ready', function() {
	connection2.queue('verifyDriver', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			driver.verifyUser(message, function(err,res){
				console.log("verifyUser Response : " + JSON.stringify(res));
				connection2.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("verifyDriver Queue Created!!! and listening to the Queue!");
	});
	
	connection2.queue('aboutDriverUser', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			driver.aboutDriver(message, function(err,res){
				console.log("aboutDriverUser Response : " + JSON.stringify(res));
				connection2.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("aboutDriverUser Queue Created!!! and listening to the Queue!");
	});
	
	connection2.queue('deleteDriver', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			driver.deleteDriver(message, function(err,res){
				console.log("deleteDriver Response : " + JSON.stringify(res));
				connection2.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("deleteDriver Queue Created!!! and listening to the Queue!");
	});
	
	connection2.queue('updateDriver', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			driver.updateDriver(message, function(err,res){
				console.log("updateDriver Response : " + JSON.stringify(res));
				connection2.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("updateDriver Queue Created!!! and listening to the Queue!");
	});
	
	connection2.queue('addDriver', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			driver.addDriver(message, function(err,res){
				console.log("verifyUser Response : " + JSON.stringify(res));
				connection2.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("addDriver Queue Created!!! and listening to the Queue!");
	});
	
	connection2.queue('uploadProfilePicDriver', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("uploadProfilePicDriver Message: "+JSON.stringify(message));
			util.log(" uploadProfilePicDriver DeliveryInfo: "+JSON.stringify(deliveryInfo));
			driver.uploadProfilePicDriver(message, function(err,res){
				console.log("uploadProfilePicDriver Response : " + JSON.stringify(res));
				connection2.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("addDriver Queue Created!!! and listening to the Queue!");
	});
	
	connection2.queue('CreateDrivers', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("CreateDrivers Message: "+JSON.stringify(message));
			util.log(" CreateDrivers DeliveryInfo: "+JSON.stringify(deliveryInfo));
			driver.CreateDrivers(message, function(err,res){
				console.log("CreateDrivers Response : " + JSON.stringify(res));
				connection2.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("CreateDrivers Queue Created!!! and listening to the Queue!");
	});
	
	connection2.queue('showDriverin10Mile_queue', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			driver.showDriverin10Mile(message, function(err,res){
				console.log("verifyUser Response : " + JSON.stringify(res));
				connection2.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("showDriverin10Mile Queue Created!!! and listening to the Queue!");
	});
	
});
	
//-----------------------------------------RIDES MODULE START-------------------------------------------------------------//
connection3.on('ready', function() {
	connection3.queue('uber_createLocation_queue', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			rides.handle_request_createLocation(message, function(err,res){
				console.log("createRides Response : " + JSON.stringify(res));
				connection3.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("createRides Queue Created!!! and listening to the Queue!");
	});
	
	connection3.queue('uber_createRide_queue', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			rides.handle_request_createRide(message, function(err,res){
				console.log("createRides2 Response : " + JSON.stringify(res));
				connection3.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("createRides2 Queue Created!!! and listening to the Queue!");
	});
	
	connection3.queue('uber_editRide_queue', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			rides.handle_request_editRide(message, function(err,res){
				console.log("editRide Response : " + JSON.stringify(res));
				connection3.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("editRide Queue Created!!! and listening to the Queue!");
	});
	
	connection3.queue('uber_deleteRide_queue', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			rides.handle_request_deleteRide(message, function(err,res){
				console.log("deleteRide Response : " + JSON.stringify(res));
				connection3.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("deleteRide Queue Created!!! and listening to the Queue!");
	});
	
	connection3.queue('uber_startRide_queue', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			rides.handle_request_startRide(message, function(err,res){
				console.log("startRide Response : " + JSON.stringify(res));
				connection3.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("startRide Queue Created!!! and listening to the Queue!");
	});
	
	connection3.queue('uber_cancelRide_queue', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			rides.handle_request_cancelRide(message, function(err,res){
				console.log("cancelRide Response : " + JSON.stringify(res));
				connection3.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("cancelRide Queue Created!!! and listening to the Queue!");
	});
	
	connection3.queue('uber_endRide_queue', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			rides.handle_request_endRide(message, function(err,res){
				console.log("endRide Response : " + JSON.stringify(res));
				connection3.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("endRide Queue Created!!! and listening to the Queue!");
	});
	
	connection3.queue('uber_fetchRideStatus_queue', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			rides.handle_request_fetchRideStatus(message, function(err,res){
				console.log("fetchRideStatus Response : " + JSON.stringify(res));
				connection3.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("fetchRideStatus Queue Created!!! and listening to the Queue!");
	});
	
	connection3.queue('uber_getRideCreated_queue', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			rides.handle_request_getRideCreated(message, function(err,res){
				console.log("getRideCreatedQueue Response : " + JSON.stringify(res));
				connection3.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("getRideCreated Queue Created!!! and listening to the Queue!");
	});
	
	connection3.queue('uber_getCustomerTripSummary_queue', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			rides.handle_request_getCustomerTripSummary(message, function(err,res){
				console.log("getCustomerTripSummary Response : " + JSON.stringify(res));
				connection3.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("getCustomerTripSummary Queue Created!!! and listening to the Queue!");
	});
	
});

//-----------------------------------------RIDES MODULE END-------------------------------------------------------------//


//Call added for generating bill
connection4.on('ready', function() {
	
	connection4.queue('uber_generateBill_queue', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			billing.generateBill(message, function(err,res){
				console.log("generateBill Response : " + JSON.stringify(res));
				connection4.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("uber_generateBill_queue  Created!!! and listening to the Queue!");
	});
	
	connection4.queue('uber_getFareEstimate_queue', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			billing.getFareEstimate(message, function(err,res){
				console.log("getFareEstimate Response : " + JSON.stringify(res));
				connection4.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("uber_getFareEstimate_queue  Created!!! and listening to the Queue!");
	});
	
});


// Rating Calls Start from here by Parteek
connection5.on('ready', function() {
	
	connection5.queue('uber_getCustomerRating_queue', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			rating.getCustomerRating(message, function(err,res){
				console.log("getCustomerRating Response : " + JSON.stringify(res));
				connection5.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("uber_getCustomerRating_queue  Created!!! and listening to the Queue!");
	});
	
	connection5.queue('uber_getDriverRating_queue', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			rating.getDriverRating(message, function(err,res){
				console.log("getDriverRating Response : " + JSON.stringify(res));
				connection5.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("uber_getDriverRating_queue  Created!!! and listening to the Queue!");
	});
	
	connection5.queue('uber_saveCustomerRating_queue', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			rating.saveCustomerRating(message, function(err,res){
				console.log("saveCustomerRating Response : " + JSON.stringify(res));
				connection5.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("uber_saveCustomerRating_queue  Created!!! and listening to the Queue!");
	});
	
	connection5.queue('uber_saveDriverRating_queue', function(q){
		q.subscribe(function(message, header, deliveryInfo, messageHeader){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			rating.saveDriverRating(message, function(err,res){
				console.log("saveDriverRating Response : " + JSON.stringify(res));
				connection5.publish(messageHeader.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:messageHeader.correlationId
				});
			});
		});
		console.log("uber_saveCustomerRating_queue  Created!!! and listening to the Queue!");
	});
	
});
//Rating Calls End here by Parteek

