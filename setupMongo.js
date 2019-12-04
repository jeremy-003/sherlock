// This script set up a mongo instance, or resets it

// Collections and indices
var modelIndex = {
    'mySite': 'siteUrl'
};
// Adding a const to allow db connection on openshift
const dbConnectionUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017';

// include Mongo
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect(dbConnectionUrl, (err, client) => {
    if (err) { throw err; }
    db = client.db('sherlock');

    // Iterate through the various models and indexes
    Object.keys(modelIndex).forEach(key => {
        // Clear out all entries
        db.collection(key).deleteMany({}, (err, result) => {
            if (err) { throw err; }
            console.log(
                "For %s:%s, %d deletes attempted, %d deletes successful...",
                key, modelIndex[key], result.n, result.ok
            );

            // Insert index
            db.collection(key).createIndex(modelIndex[key], {unique: true}, (err,name) => {
                if (err) { throw err; }
                console.log("%s now exists as an index...", name);
            });
        });
    });
});