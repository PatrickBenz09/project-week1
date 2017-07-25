'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users', [
    {
      username: 'RyuHayabusa',
      password: "password",
      first_name: "Ryu",
      last_name: "Hayaubsa",
      email: "email.com",
      salt: "5iu79u8h",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Ryu',
      password: "password",
      first_name: "Ryu22",
      last_name: "Hayaubsa22",
      email: "email22.com",
      salt: "5iu79u8h",
      role: "member",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Hayabusa',
      password: "password",
      first_name: "Ryu33",
      last_name: "Hayaubsa33",
      email: "email33.com",
      salt: "5iu79u8h",
      role: "member",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
