// Some nice unit testing for you

// Dependencies
var request = require('request');
var rp = require('request-promise');

// Environment-specific settings
const dbConnectionUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017';
const nodePort = (dbConnectionUrl === process.env.MONGODB_URL) ? 8080 : 3000;
const nodeServer = `http://localhost:${nodePort}`;

// The data that we want
let siteUrl       = 'http://jennysnumber.com/blog';
let loginUrl      = 'http://jennysnumber.com/blog/wp-admin';
let cmsType       = 'WordPress';
let dataSource    = 'task';
let dataTimestamp = new Date().toString();
let brand         = 'bluehost';
let userId        = '8675309';


// Tests Delete All, Post, Read All
test('Clears, adds, and reads a MySite', () => {
  // Delete All
  let options = {
    url: `${nodeServer}/mySitesByUser/${brand}/${userId}`,
    method: 'DELETE',
    resolveWithFullResponse: true
  };
  rp(options)
  .catch(err => { console.log(err); })
  .then(response => {
  })
  
  // Add one
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
        'userId': userId,
        resolveWithFullResponse: true
      }
    };
    rp(options)
    .catch(err => { console.log(err); })
    .then(response => {
      expect(response.insertedCount).toBe(1);
    })
  
    // Read all
    .then(() => {
      options = {
        url: `${nodeServer}/mySitesByUser/${brand}/${userId}`,
        method: 'GET',
        json: true,
        body: {
          'brand': brand,
          'userId': userId
        },
        resolveWithFullResponse: true
      };
      rp(options)
      .catch(err => { console.log(err); })
      .then(response => {
        expect(response[0].siteUrl).toBe(siteUrl);
      });
    })
  });
});


// Tests validity checkers
test('Bad option should fail', () => {
  // Delete All
  let options = {
    url: `${nodeServer}/mySitesByUser/${brand}/${userId}`,
    method: 'DELETE',
    resolveWithFullResponse: true
  };
  rp(options)
  .catch(err => {})
  .then(response => {})
  
  // Add one
  .then( () => {
    options = {
      url: `${nodeServer}/mySites`,
      method: 'POST',
      json: true,
      body: {
        'siteUrl': siteUrl,
        'loginUrl': loginUrl,
        'cmsType': cmsType, // This is needed
        'dataSource': dataSource,
        'dataTimestamp': dataTimestamp,
        'brand': brand,
        'userId': userId,
        resolveWithFullResponse: true
      }
    };
    rp(options)
    .catch(err => {
      expect(err.statusCode).toBe(400);
    })
    .then(response => {
      expect(response.statusCode).toBe(400);
    })
  });
});

test('Good option should succeed', () => {
  // Delete All
  let options = {
    url: `${nodeServer}/mySitesByUser/${brand}/${userId}`,
    method: 'DELETE',
    resolveWithFullResponse: true
  };
  rp(options)
  .catch(err => {})
  .then(response => {})
  
  // Add one
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
        'userId': userId,
        resolveWithFullResponse: true
      }
    };
    rp(options)
    .catch(err => {})
    .then(response => {
      expect(response.statusCode).toBe(200);
    })
  });
});