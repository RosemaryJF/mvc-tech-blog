const router = require('express').Router();
const { Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Retrieves all comments
// Including associated users
router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      attributes: [
        'id',
        'text',
        'created_on',
      ],
      include: [{
        model: User,
        attributes: ['username']
      }],
    });
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Retrieves single comment
// And associated user
router.get('/:id', withAuth, async (req, res) => {
  try {
    const singleComment = await Comment.findOne(req.params.id, {
      include: [{
        model: User,
        attributes: ['username']
      }],
    });

    if (!singleComment) {
      res.status(404).json({ message: 'No blog found with that id!' });
      return;
    }

    res.status(200).json(singleComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Creates a new comment
router.post('/', withAuth, async (req, res) => {
  if (req.session)
    try {
      const newComment = await Comment.create({
        ...req.body,
        author_id: req.session.user_id,
      });

      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
});

// Updates an existing comment
router.put('/:id', withAuth, async (req, res) => {
  if (req.session)
    try {
      const updatedComment = await Comment.update({
        ...req.body,
        user_id: req.session.user_id,
      });

      res.status(200).json(updatedComment);
    } catch (err) {
      res.status(400).json(err);
    }
});

// Deletes an exisiting comment
router.delete('/:id', withAuth, async (req, res) => {
  if (req.session)
    try {
      const commentData = await Comment.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });

      if (!blogData) {
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }

      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;
