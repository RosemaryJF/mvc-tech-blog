const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

User.hasMany(Blog, {
  foreignKey: 'author_id',
  onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Blog, {
  foreignKey: 'author_id',
  foreignKey: 'blog_id'
});

module.exports = { User, Blog, Comment };
