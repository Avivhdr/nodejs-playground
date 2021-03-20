const router = require('express').Router();
const Post = require('../../model/post');
const { verifyToken } = require('../verifyToken');
const { validatePost } = require('./validations');

router.use('/', verifyToken);

router.get('/', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

router.post('/', (req, res) => {
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error.message);

  Post.create(req.body);
  return res.status(201).send('Post Added');
});

module.exports = router;
