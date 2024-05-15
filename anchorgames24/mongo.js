const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'mediamedia';

MongoClient.connect(connectionURL, (error, client) => { 
       if (error) {
        return console.log('Unable to connect to database!');
    }
    const db = client.db(databaseName);

    db.collection('movies').insertMany([
    { 
        title: 'Inception',
        year: '2010',
        director: 'Christopher Nolan'
    },
    {
        title: 'The Matrix',
        year: '1999',
        director: 'Lana and Lilly Wachowski'
    }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert user!');
        }
        console.log(result.ops);
    });
});