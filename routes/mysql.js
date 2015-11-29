var ejs= require('ejs');
var mysql = require('mysql');

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
		database : 'uberdb',
		port : 3306

	});
	return connection;
}


function fetchData(callback,sqlQuery){

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
}	

exports.formatSQLStatment = function(sqlQuery,inserts){
	sqlQuery = mysql.format(sqlQuery, inserts);
	console.log("\nSQL Query after formatiing :: " + sqlQuery);
	return sqlQuery;
};


exports.fetchData=fetchData;