const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Retrieves all blogs
router.get('/', withAuth, async (req, res) => {
  try {
    // Get all blogs and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
        },
      ],
    });
    console.log(blogData);

    // Serialize data so the template can read it
    const blogs = blogData.map((blogData) => {
      const blog = blogData.get({ plain: true });
      blog.is_author = blog.author_id === req.session.user_id;
      return blog;
    });

    console.log(blogs);
    // Pass serialized data and session flag into template
    res.render('dashboard', {
      blogs,
      user_id: req.session.user_id,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
});

// Retrieves single blog
router.get('/api/blog/:id', async (req, res) => {
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

// Use withAuth middleware to prevent access to route
router.get('/', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

// Logs user out
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.render('homepage', {
        blog,
        user_id: req.session.user_id,
        logged_in: req.session.logged_in
      });
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
module.exports = router;