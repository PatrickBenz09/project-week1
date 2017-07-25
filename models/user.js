'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    salt: DataTypes.STRING,
    role: DataTypes.STRING
  });

  User.associate = models => {
    User.hasMany(models.Group);
    User.belongsToMany(models.Group, {through: 'Post'})
  }

  return User;
};
