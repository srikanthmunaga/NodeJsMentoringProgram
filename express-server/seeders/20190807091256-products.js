"use strict";

import data from "../data/products";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Products", data, {});
  },

  down: (queryInterface, Sequelize) => {
    //return queryInterface.bulkDelete("Products", null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

          */
  }
};
