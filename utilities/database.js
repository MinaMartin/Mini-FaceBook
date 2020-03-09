const MongoClient = require('mongodb').MongoClient;

const url = "mongodb+srv://Mina:gaa@@UxWiTw5hVg@minacluster-ykcse.mongodb.net/miniFaceBook?retryWrites=true&w=majority";
let _db;

const mongoConnect = (cb) => {
    MongoClient.connect(url)
        .then(client => {
            console.log("Connected");
            _db = client.db();
            cb();
        })
        .catch(error => {
            console.log(error);
            throw error;
        })
}

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw "No Database found";
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;