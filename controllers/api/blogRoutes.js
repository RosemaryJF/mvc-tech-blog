const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Retrieves all blogs
// Including associated comments
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Comment,
          attributes: [
            'id',
            'text',
            'author_id',
            'blog_id',
            'created_on'
          ],
        }],
    });
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Retrieves a single blog
// And associated comments
router.get('/:id', withAuth, async (req, res) => {
  try {
    const singleBlog = await Blog.findByPk(req.params.id, {
      include: [{
        model: User,
        attributes: ['username']
      },
      {
        model: Comment,
        attributes: [
          'id',
          'text',
          'author_id',
          'blog_id',
          'created_on'
        ],
        include: {
          model: User,
          attributes: ['username']
        }
      }],
    });

    if (!singleBlog) {
      res.status(404).json({ message: 'No blog found with that id!' });
      return;
    }

    res.status(200).json(singleBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Creates a new blog
router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      author_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Updates an existing blog
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedBlog = await Blog.update({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(updatedBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Deletes an existing blog
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
