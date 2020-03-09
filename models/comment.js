const getDb = require('../utilities/database').getDb;
const mongoDb = require('mongodb');

class comment {
    constructor(content, commentCreatorName) {
        this.content = content;
        this.commentCreator = commentCreatorName;
        this.commentLikes = 0;
        this.id = Math.floor((Math.random()) * 10000)
    }

    addComment(postId) {
        const db = getDb();
        return db.collection('Posts').updateOne({ _id: new mongoDb.ObjectID(postId) }, { $push: { "comments": this }, $inc: { numberOfComments: 1 } })
    }

}

module.exports = comment;