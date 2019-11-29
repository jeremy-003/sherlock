// Some nice unit testing for you

// Dependencies
var request = require('request');
var rp = require('request-promise');

// Environment-specific settings
const dbConnectionUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017';
const nodePort = (dbConnectionUrl === process.env.MONGODB_URL) ? 8080 : 3000;
const nodeServer = `http://localhost:${nodePort}`;

// The data that we want
const userId = '8018675309@bluehost';
const brand = 'jennysnumber.com';

// Tests POST->GET->DELETE
test('Inserts, Gets, Deletes successfully', () => {
  // promisey
  var options = {
    url: `${nodeServer}/users`,
    method: 'POST',
    json: true,
    body: {
      'userId': '8018675309@bluehost',
      'brand': 'jennysnumber.com'
    }
  };

  rp(options)
  .catch(err => { console.log(err); })
  .then(parsedBody => {
    //console.log('parsedBody:', parsedBody);
    expect(parsedBody.result.ok).toBe(1);
    options = {
      url: `${nodeServer}/users/8018675309@bluehost`,
      method: 'GET'
    };
    rp(options)
    .catch(err => { console.log(err); })
    .then(response => {
      //console.log('response: ', response)
      expect(response.userId).toBe(userId);
      options = {
        url: `${nodeServer}/users/8018675309@bluehost`,
        method: 'DELETE'
      };
      rp(options)
      .catch(err => { console.log(err);})
      .then(response => {
        //console.log('response: ', response);
        expect(parsedBody.result.ok).toBe(1);
      });
    });
  });
});