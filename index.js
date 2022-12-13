const http = require('http');
const mysql = require('mysql');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

	// Get Environment Variables
	const databaseHost = process.env.DATABASE_HOST;
	const databasePassword = process.env.DATABASE_PASSWORD;
	const databaseUser = process.env.DATABASE_USER;
	const databaseName = process.env.DATABASE_NAME;

	// Connect to Database
	const connection = mysql.createConnection({
		host: databaseHost,
		user: databaseUser,
		password: databasePassword,
		database: databaseName
	});

	connection.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
	});

	// Find Dealer Number
	connection.query("SELECT * FROM dealers WHERE dealer_number = '123456'", function (err, result, fields) {
		if (err) throw err;
		if (result.length > 0) {
			res.statusCode(200)
			res.end(true);
		} else {
			res.statusCode(401)
			res.end(false);
		}
	});
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});