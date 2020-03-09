const express = require('express');
const postController = require('../controllers/posts');
const isAuth = require('../middlewares/is-auth');

const router = express.Router();

router.get('/', postController.getPosts);

router.get('/:postId', postController.getPost);

router.post('/add-post', isAuth, postController.addPost);

router.patch('/edit-post/:postId', postController.updatePost);

router.patch('/:postId/edit-comment/:commentId', postController.updateComment);

router.post('/:postId/add-reaction/:reactionId', postController.addReaction);

router.post('/:postId/remove-reaction/:reactionId', postController.removeReaction);

router.post('/add-comment/:postId', isAuth, postController.addComment);

router.delete('/:postId', postController.removePost);

router.delete('/:postId/remove-comment/:commentId', postController.removeComment);

module.exports = router;