'use strict';
const { DataTypes, INTEGER, STRING } = require('sequelize');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("student_table",{
      student_id: {
        type: DataTypes.INTEGER(255),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      customer_id: {
        type: INTEGER,
        defaultValue: 1,
        references: {
            model: 'customer_tables',
            key:'customer_id'
        },
      },
      ref_id: {
        type: INTEGER,
        defaultValue: 0,
      },
      student_first_purchase: {
        type: INTEGER,
        defaultValue: 0,
      },
      student_first_name: {
        type: STRING,
        allowNull: false,
      },
      student_last_name: {
        type: STRING,
        allowNull: true,
      },
      student_phone_number: {
        type: STRING(255),
        allowNull: true,
      },
      student_email: {
        type: STRING,
        allowNull: false,
      },
      student_password: {
        type: STRING(255),
        allowNull: true,
      },
      student_profile_picture: {
        type: STRING,
        allowNull: true,
      },
      student_bio: {
        type: STRING,
        allowNull: true,
      },
      student_website_url: {
        type: STRING,
        allowNull: true,
      },
      student_linkedin_url: {
        type: STRING,
        allowNull: true,
      },
      student_facebook_url: {
        type: STRING,
        allowNull: true,
      },
      student_twitter_url: {
        type: STRING,
        allowNull: true,
      },
      student_github_url: {
        type: STRING,
        allowNull: true,
      },
      student_youtube_url: {
        type: STRING,
        allowNull: true,
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("student_table");
  }
};
