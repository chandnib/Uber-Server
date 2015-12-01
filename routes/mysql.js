var ejs= require('ejs');
var mysql = require('mysql');

//redis 
/*var redis = require('redis');
var client = redis.createClient('6379','127.0.0.1');
if (typeof process.env.REDIS_PASSWORD)
	client.auth('');*/



//Changes
function getConnection(){
	var connection = mysql.createConnection({
		multipleStatements: true,
		connectTimeout: 6000,
		waitForConnections: true,
		pool: false,
		host     : 'localhost',
		user     : 'root',
		password : 'rootpwd1',
		database : 'uberdb'//,
			//  port	 : 8889
	});
	return connection;
}

//Connection Pooling 
var pool  = mysql.createPool({
	multipleStatements: true,
	queueLimit:500,
	waitForConnections: true,
	  connectionLimit : 100,
	  connectTimeout: 6000,
		host     : 'localhost',
		user     : 'root',
		password : 'rootpwd1',
		database : 'uberdb'
});

var test = false;
//fetchData with connection pooling and Redis Caching
function fetchData(callback,sqlQuery){
	try{
	console.log("\nSQL Query::"+sqlQuery);
	var UPCASESQL = sqlQuery.toUpperCase();
	var CRUD = false;
		if(UPCASESQL.indexOf('INSERT') !== -1 || UPCASESQL.indexOf('UPDATE') !== -1 || UPCASESQL.indexOf('DELETE') !== -1 || UPCASESQL.indexOf('DELETE') !== -1)
			CRUD = true;
		client.get(sqlQuery, function (err, result) {
			if (err || !result || test){
				console.log("No Cache Found So executing the SQL for getting data!!!");
				 pool.getConnection(function(err, connection) {
					 connection.query(sqlQuery, function(err, rows, fields) {
						if(err){
							console.log("ERROR: " + err.message);
							callback(err, null);
						}
						else 
						{	// return err or result
							console.log("DB Results:")
							console.log(rows);
							connection.release();
							console.log("\nConnection closed..");
							var test = JSON.stringify(rows);
							console.log("DB Results: JSON String" + test)
							//console.log(test);
							if(CRUD){
								client.flushall();
								console.log("Crud Operation so flush all the DB Queries!!!")
							}
							client.setex(sqlQuery, 200, test);
							callback(err, rows);
						}
					});
				});	
			}
			else{
				console.log("Cache Found!!!!!!!!!!!");
				console.log(JSON.stringify(result));
				callback("", JSON.parse(result));	
			}
			
		});
	}catch(e){
		console.log(e);
	}
		
}
/*
//fetchData with connection pooling
function fetchData(callback,sqlQuery){

	console.log("\nSQL Query::"+sqlQuery);

	pool.getConnection(function(err, connection) {
		 connection.query(sqlQuery, function(err, rows, fields) {
			if(err){
				console.log("ERROR: " + err.message);
			}
			else 
			{	// return err or result
				console.log("DB Results:"+rows.length);
				connection.release();
				console.log("\nConnection closed..");
				callback(err, rows);
			}
		});
	});
}	
*/

//fetchData without Pooling
/*function fetchData(callback,sqlQuery){

	console.log("\nSQL Query::"+sqlQuery);

	var connection = getConnection();

	connection.query(sqlQuery, function(err, rows, fields) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			console.log("DB Results:"+rows);
			connection.end();
			callback(err, rows);
		}
	});
	console.log("\nConnection closed..");
}	*/

exports.formatSQLStatment = function(sqlQuery,inserts){
	sqlQuery = mysql.format(sqlQuery, inserts);
	console.log("\nSQL Query after formatiing :: " + sqlQuery);
	return sqlQuery;
}

exports.fetchData=fetchData;