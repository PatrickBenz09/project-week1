'use strict';
module.exports = function(sequelize, DataTypes) {
  var Group = sequelize.define('Group', {
    group_name: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  });

  Group.associate = models => {
    Group.belongsTo(models.User);
    Group.belongsToMany(models.User, {through: 'Post'});
  }

  return Group;
};
