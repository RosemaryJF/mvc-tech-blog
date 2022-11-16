const router = require('express').Router();

// Renders the homepage
router.get('/', async (req, res) => {
  try {
    res.render('homepage');
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
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