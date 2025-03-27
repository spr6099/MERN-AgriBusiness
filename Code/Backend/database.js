const MongoClient = require('mongodb').MongoClient
const client = new MongoClient('mongodb://localhost:27017')

function dbase() {
    return client.connect().then((dbs) => {
        var database = dbs.db('Agri-Business')
console.log("mongoose connected");
        return database
    })
}
module.exports = dbase()

