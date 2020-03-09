const Post = require('../models/post');
const Comment = require('../models/comment');

exports.getPosts = (req, res, next) => {
    const page = req.query.page || 1;
    const postSearchTitle = req.query.title;
    //http://localhost:8080/posts?page=1
    //http://localhost:8080/posts?page=2
    //http://localhost:8080/posts?title=z

    Post.fetchPosts((+page - 1), postSearchTitle)
      .then(posts => {
        //console.log(post);
        res.status(200).json({ message: "All the Posts", posts: posts });
      })
      .catch(err => {
        if (err.statusCode !== 500) {
          err.statusCode = 500;
        }
        next(err);
      })
  }
  /************************************************************************************************* */
exports.getPost = (req, res, next) => {
    const postId = req.params.postId;

    Post.fetchPost(postId)
      .then(post => {
        //console.log(post);
        res.status(200).json({ message: "Requested Post", post: post });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  }
  /************************************************************************************************* */
exports.updatePost = (req, res, next) => {
    const postId = req.params.postId;
    const postTitle = req.body.title;
    const content = req.body.content;

    Post.updatePost(postId, postTitle, content)
      .then(response => {
        res.status(200).json({ message: "Post Updated" });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  }
  /************************************************************************************************* */
exports.updateComment = (req, res, next) => {
    const postId = req.params.postId;
    const commentId = +req.params.commentId;
    const content = req.body.content;

    Post.updateComment(postId, commentId, content)
      .then(response => {
        res.status(200).json({ message: "Comment Updated" });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  }
  /************************************************************************************************* */
exports.addPost = (req, res, next) => {
    console.log(req.body);
    const title = req.body.title;
    const content = req.body.content;
    const userId = req.userId;
    const userName = req.userName;

    const post = new Post(title, content, userId, userName);

    post.save()
      .then(response => {
        res.status(201).json({ message: "Post Created", post: response.ops[0] });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  }
  /************************************************************************************************* */
exports.addComment = (req, res, next) => {
    const postId = req.params.postId;
    const commentCreator = req.userName;
    const commentContent = req.body.content;

    const comment = new Comment(commentContent, commentCreator);

    comment.addComment(postId)
      .then(response => {
        //console.log(response);
        res.status(201).json({ message: "Comment Added", comment: comment });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  }
  /************************************************************************************************* */
exports.addReaction = (req, res, next) => {
    const postId = req.params.postId;
    const reactionId = req.params.reactionId;

    Post.addReaction(postId, +reactionId)
      .then(post => {
        res.status(200).json({ message: "Reaction Added" });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  }
  /************************************************************************************************* */
exports.removeReaction = (req, res, next) => {
    const postId = req.params.postId;
    const reactionId = req.params.reactionId;

    Post.removeReaction(postId, +reactionId)
      .then(post => {
        res.status(200).json({ message: "Reaction Removed" });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  }
  /************************************************************************************************* */
exports.removePost = (req, res, next) => {
    const postId = req.params.postId;

    Post.removePost(postId)
      .then(response => {
        res.status(200).json({ message: "Post Removed" });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  }
  /************************************************************************************************* */
exports.removeComment = (req, res, next) => {
  const postId = req.params.postId;
  const commentId = +req.params.commentId;

  Post.removeComment(postId, commentId)
    .then(response => {
      res.status(200).json({ message: "Comment Removed" });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}