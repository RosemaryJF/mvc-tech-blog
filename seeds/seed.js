const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userData = require('./userData.js');
const blogData = require('./blogData.js');
const commentData = require('./commentData.js');

// Seeds the database from the seed files
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const blog of blogData) {
    await Blog.create(blog);
  }

  for (const comment of commentData) {
    await Comment.create(comment);
  }

  process.exit(0);
};

seedDatabase();
