const getDb = require('../utilities/database').getDb;
const mongoDb = require('mongodb');

class Post {
    constructor(title, content, userId, userName) {
        this.title = title;
        this.content = content;
        this.postCreatorName = userName;
        this.userId = userId;
        this.numberOfReactions = [{ id: 1, name: "like", number: 0 }, { id: 2, name: "dislike", number: 0 }, { id: 3, name: "love", number: 0 }];
        this.numberOfComments = 0;
        this.comments = [];
        this.createdAt = new Date();
    }

    save() {
        const db = getDb();
        return db.collection('Posts').insertOne(this)
    }

    static fetchPosts(page, searchTitle) {
        const postPerPages = 4;
        //console.log(page, typeof postPerPages);
        const db = getDb();

        if (searchTitle) {
            return db.collection('Posts').find({ title: { $regex: searchTitle, $options: "i" } }).skip(page * postPerPages).limit(postPerPages).toArray()
        }
        return db.collection('Posts').find({}).skip(page * postPerPages).limit(postPerPages).toArray()
    }

    static fetchPost(id) {
        const db = getDb();
        return db.collection('Posts').findOne({ _id: new mongoDb.ObjectID(id) });
    }

    static addReaction(id, reactionId) {
        const db = getDb();
        return db.collection('Posts').updateOne({ _id: new mongoDb.ObjectID(id), "numberOfReactions.id": reactionId }, { $inc: { "numberOfReactions.$.number": 1 } })
    }

    static removeReaction(id, reactionId) {
        const db = getDb();
        return db.collection('Posts').updateOne({ _id: new mongoDb.ObjectID(id), "numberOfReactions.id": reactionId }, { $inc: { "numberOfReactions.$.number": -1 } })
    }

    static updatePost(postId, title, content) {
        const db = getDb();
        return db.collection('Posts').updateOne({ _id: new mongoDb.ObjectID(postId) }, {
            $set: { title: title, content: content }
        })
    }

    static updateComment(postId, commentId, content) { /******************************************* */
        const db = getDb();
        return db.collection('Posts').updateOne({ _id: new mongoDb.ObjectID(postId), "comments.id": commentId }, {
            $set: { "comments.$.content": content }
        })
    }

    static removePost(id) {
        const db = getDb();
        return db.collection('Posts').deleteOne({ _id: new mongoDb.ObjectID(id) })
    }

    static removeComment(postId, commentId) { /******************************************* */
        const db = getDb();
        return db.collection('Posts').updateOne({ _id: new mongoDb.ObjectID(postId) }, { $pull: { comments: { id: commentId } }, $inc: { numberOfComments: -1 } })
    }
}

module.exports = Post;