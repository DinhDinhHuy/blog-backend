const User = require("./user.model")
const Post = require("./post.model")
const Comment = require("./comment.model")

//User-Post
User.hasMany(Post, {foreignKey:'user_id'})
Post.belongsTo(User)

//User-Comment
User.hasMany(Comment,{foreignKey:'user_id'})
Comment.belongsTo(User)

//Post-Comment
Post.hasMany(Comment,{foreignKey:'post_id'})
Comment.belongsTo(Post)

module.exports = {User, Post, Comment}