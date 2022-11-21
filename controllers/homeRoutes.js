const router = require('express').Router();
const { Blog, User } = require('../models');

// retrieves all blogs
router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
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
    res.render('homepage', {
      blogs,
      user_id: req.session.user_id,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
    console.error(err);
  }
});

// Renders the login page
router.get('/login', async (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Renders the signup page
router.get('/signup', async (req, res) => {
  try {
    res.render('signup');
  } catch (err) {
    res.statusMessage(500).json(err);
  }
});


module.exports = router;