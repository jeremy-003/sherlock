// Express handles routing and other middleware
const express = require('express');
const app = express();

// Environment-specific values
const dbConnectionUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017';
const nodePort = (dbConnectionUrl === process.env.MONGODB_URL) ? 8080 : 3000;

// body-parser handles parsing of request bodies
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Mongo is a document-based database
var MongoClient = require('mongodb').MongoClient;
var db;

// Connect to the db
MongoClient.connect(dbConnectionUrl, (err, client) => {
    if (err) { throw err; }
    db = client.db('sherlock');
});

///////////////
// Endpoints //
///////////////

// POST - User
app.post('/users', (req, res) => {
    db.collection('user').insertOne(req.body, (err, results) => {
        if (err) {
            res.json(err);
        } else {
            res.json(results);
        }
})});

// GET (list) - User
app.get('/users', (req, res) => {
    db.collection('user').find({}).toArray((err, results) => {
        if (err) {
            res.json(err);
        } else {
            res.json(results);
        }
})});

// GET (detail) - User
app.get('/users/:userId', (req, res) => {
    let filter = {'userId': req.params.userId};
    db.collection('user').findOne(filter, (err, results) => {
        if (err) {
            res.json(err);
        } else {
            res.json(results);
        }
})});

// PUT - User
app.put('/users/:userId', (req, res) => {
    let filter = {'userId': req.params.userId};
    let update = {$set: req.body};
    db.collection('user').updateOne(filter, update, (err, results) => {
        if (err) {
            res.json(err);
        } else {
            res.json(results);
        }
})});

// DELETE - User
app.delete('/users/:userId', (req, res) => {
    let filter = {"userId": req.params.userId};
    db.collection('user').deleteOne(filter, (err, results) => {
        if (err) {
            res.json(err);
        } else {
            res.json(results);
        }
})});

// POST - MySite
app.post('/mySites', (req, res) => {
    db.collection('mySite').insertOne(req.body, (err, results) => {
        if (err) {
            res.json(err);
        } else {
            res.json(results);
        }
})});

// GET (list) - MySite
app.get('/mySites', (req, res) => {
    db.collection('mySite').find({}).toArray((err, results) => {
        if (err) {
            res.json(err);
        } else {
            res.json(results);
        }
})});

// GET (detail) - MySite
app.get('/mySites/:siteUrl', (req, res) => {
    let filter = {'siteUrl': req.params.siteUrl};
    db.collection('mySite').findOne(filter, (err, results) => {
        if (err) {
            res.json(err);
        } else {
            res.json(results);
        }
})});

// PUT - MySite
app.put('/mySites/:siteUrl', (req, res) => {
    let filter = {'siteUrl': req.params.siteUrl};
    let update = {$set: req.body};
    db.collection('mySite').updateOne(filter, update, (err, results) => {
        if (err) {
            res.json(err);
        } else {
            res.json(results);
        }
})});

// DELETE - MySite
app.delete('/mySites/:siteUrl', (req, res) => {
    let filter = {"siteUrl": req.params.siteUrl};
    db.collection('mySite').deleteOne(filter, (err, results) => {
        if (err) {
            res.json(err);
        } else {
            res.json(results);
        }
})});

// Spin up
app.listen(nodePort, () => console.log(`app started on port ${nodePort}`));