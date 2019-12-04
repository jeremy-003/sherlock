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
.catch(err => { console.log('delete: There was a problem: %s', err.statusCode); })
.then(response => {
	if (response) { console.log('delete response:', response); }
})

// Read all
.then( () => {
	console.log('wha?');
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
	.catch(err => { console.log('readall: There was a problem: %s', err.statusCode); })
	.then(response => {
		if (response)
			{ console.log('readall response:', response);
		} else {
			console.log('readall: no response');
		}
	})
	.finally(() => {
		console.log('finally it happened to me');
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
	.catch(err => { console.log('badadd: There was a problem: %s', err.statusCode); })
	.then(response => {
		if (response) { console.log('badadd response:', response); }
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
		console.log('good add: There was a problem: %s', err.statusCode);
		//console.log(err);
	})
	.then(response => {
		if (response) { console.log('good add response:', response); }
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
		.catch(err => { console.log('readall: There was a problem: %s', err.statusCode); })
		.then(response => {
			if (response) { console.log('readall response:', response); }
		});
	})
});
