'use strict';

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
    await queryInterface.bulkInsert('Products', [
      {
        name: 'MILEY - Tas Selempang Wanita Slingbag',
        image_url: 'https://cf.shopee.co.id/file/3b65dee7cf3dd7a2002d8f1173f9eeee',
        category: 'Slingbag',
        stock: 1000,
        price: 325000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'LENA - Dompet Wanita Kulit - Pink',
        image_url: 'https://cf.shopee.co.id/file/b050c4a77ecbfe031a35bcf222f6fe20',
        category: 'Wallet',
        stock: 2228,
        price: 154778,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'SCARLETT - Tas Ransel Wanita Fashion Backpack',
        image_url: 'https://cf.shopee.co.id/file/6eaf92024682270e8b8cda54e579d12d',
        category: 'Backpack',
        stock: 9992,
        price: 364510,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'WEIRS - Tas Pinggang Kulit Unisex',
        image_url: 'https://i.imgur.com/fgif7H5.jpg',
        category: 'Waist Bag',
        stock: 999,
        price: 123456,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'MIMA - Tas Bucket Bag ',
        image_url: 'https://i.imgur.com/DWaKBJ8.jpg',
        category: 'Slingbag',
        stock: 567,
        price: 234567,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'CLAUDIA - Tas Selempang Wanita',
        image_url: 'https://i.imgur.com/aMjMn39.jpg',
        category: 'Slingbag',
        stock: 999,
        price: 696969,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'PAULINE - Tas Selempang Wanita Sling Bag Kulit Premium - Coklat',
        image_url: 'https://i.imgur.com/rWzF8zE.jpg',
        category: 'Slingbag',
        stock: 999,
        price: 367505,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'LAURA - Tas Selempang Kulit Hijau',
        image_url: 'https://i.imgur.com/wyJnq1D.jpg',
        category: 'Slingbag',
        stock: 999,
        price: 420420,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Products', null)

  }
};
