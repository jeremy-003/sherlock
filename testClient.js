// Dependencies
var request = require('request');
var rp = require('request-promise');

// Environment-specific settings
const dbConnectionUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017';
const nodePort = (dbConnectionUrl === process.env.MONGODB_URL) ? 8080 : 3000;
const nodeServer = `http://localhost:${nodePort}`;

// Standards are important
let brand         = 'bluehosty';
let userId        = '18018675309';
let cmsType       = 'WordPress';
let siteUrl       = 'http://jennsnumber.com/blog';
let loginUrl      = 'http://jennsnumber.com/blog/wp-admin';
let dataSource    = 'task';
let dataTimestamp = new Date().toString();

// This forms the request
var options = {
	url: `${nodeServer}/mySitesByUser/${brand}/${userId}`,
	method: 'DELETE'
};

// Delete All
rp(options)
.catch(err => { console.log("\ndelete: There was a problem: ", err.statusCode); })
.then(response => {
	if (response) { console.log("\ndelete response:", response); }
})

// Read all
.then( () => {
	options = {
		url: `${nodeServer}/mySitesByUser/${brand}/${userId}`,
		method: 'GET',
		json: true,
		body: {
			'brand': brand,
			'userId': userId
		}
	};
	console.log(options);
	rp(options)
	.catch(err => { console.log("\nreadall: There was a problem: ", err.statusCode); })
	.then(response => {
		if (response)
			{ console.log('readall after delete response:', response);
		} else {
			console.log('readall: no response');
		}
	})
})

// Add bad one
.then( () => {
	options = {
		url: `${nodeServer}/mySites`,
		method: 'POST',
		json: true,
		body: {
			//'siteUrl': siteUrl,
			'loginUrl': loginUrl,
			'cmsType': cmsType,
			'dataSource': dataSource,
			'dataTimestamp': dataTimestamp,
			'brand': brand,
			'userId': userId
		}
	};
	rp(options)
	.catch(err => { console.log("\nbad add: There was a problem: ", err.statusCode); })
	.then(response => {
		if (response) { console.log("\nbad add response:", response); }
	})
})

// Add good one
.then( () => {
	options = {
		url: `${nodeServer}/mySites`,
		method: 'POST',
		json: true,
		body: {
			'siteUrl': siteUrl,
			'loginUrl': loginUrl,
			'cmsType': cmsType,
			'dataSource': dataSource,
			'dataTimestamp': dataTimestamp,
			'brand': brand,
			'userId': userId
		}
	};
	rp(options)
	.catch(err => {
		console.log("\ngood add: There was a problem: ", err.statusCode);
	})
	.then(response => {
		if (response) { console.log("\ngood add response: ", response); }
	})

	// Read all
	.then( () => {
		options = {
			url: `${nodeServer}/mySitesByUser/${brand}/${userId}`,
			method: 'GET',
			json: true,
			body: {
				'brand': brand,
				'userId': userId
			}
		};
		rp(options)
		.catch(err => {
			console.log("\nreadall after good insert: There was a problem: ", err.statusCode);
		})
		.then(response => {
			if (response) { console.log("\nreadall after good insert response:", response); }
		});
	})
});
