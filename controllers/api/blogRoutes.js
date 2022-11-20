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
          include: [{
            model: Comment,
            attributes: [
              'id',
              'text',
              'author_id',
              'blog_id',
              'created_on'
            ],
          }]
        }],
    });
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [{
        model: User,
        attributes: ['username']
      }],
      include: [{
        model: Comment,
        attributes: [
          'id',
          'text',
          'author_id',
          'blog_id',
          'created_on'
        ],
      }]
    });
    if (!blogData) {
      res.status(404).json({ message: 'No blog with this id!' });
      return;
    }
    const blog = blogData.get({ plain: true });
    res.render('blog', blog);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Creates a new blog
router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      author_id: req.session.user_id,
    });
    res.status(200).json(newBlog);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Updates an existing blog
router.put('/:id', async (req, res) => {
  Blog.update(
    {
      title: req.body.title,
      content: req.body.content,
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(updatedBlogData => {
      if (!updatedBlogData) {
        res.status(404).json({ message: 'No blog with this id!' });
        return;
      }
      res.status(200).json(updatedBlogData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
});

// Deletes an existing blog
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id
      },
    });
    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
});

module.exports = router;
