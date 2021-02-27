'use strict';
const {hashPass} = require('../helpers/bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    try {
      await queryInterface.bulkInsert('Users', [{
        name: 'admin',
        role: 'admin',
        password: hashPass(process.env.ADMINPASSWORD),
        email: 'admin@mail.com',
        profPic: `https://ui-avatars.com/api/?background=random&name=Admin&rounded=true`,
        createdAt: new Date(),
        updatedAt: new Date()
      }])
    } catch (err) {
      console.log(err)
    }

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null)
  }
};
