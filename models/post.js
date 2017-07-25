'use strict';
module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define('Post', {
    post: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    GroupId: DataTypes.INTEGER
  });

  Post.associate = models => {
    Post.belongsTo(models.User);
    Post.belongsTo(models.Group)
  }

  return Post;
};
