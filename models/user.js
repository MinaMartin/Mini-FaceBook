const getDb = require('../utilities/database').getDb;


class user {
    constructor(email, password, name) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.posts = [];
        this.createdAt = new Date();
    }

    signUp() {
        const db = getDb()
        return db.collection('Users').insertOne(this)
    }

    static findUserByEmail(email) {
        const db = getDb();
        return db.collection('Users').findOne({ email: email })
    }
}

module.exports = user;