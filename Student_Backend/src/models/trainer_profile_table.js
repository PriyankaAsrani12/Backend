const { db } = require('../db/sql');
const { INTEGER, STRING, TEXT } = require('sequelize');

const Trainer = db.define('trainer_profile', {
  trainer_id: {
    type: INTEGER(255),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  customer_id: {
    type: INTEGER,
    references: {
      model: 'customer_tables',
      key: 'customer_id',
    },
  },
  trainer_image_url: {
    type: STRING,
    allowNull: false,
  },
  trainer_full_name: {
    type: STRING,
    allowNull: false,
  },
  trainer_occupation: {
    type: STRING,
    allowNull: false,
  },
  trainer_phone_number: {
    type: STRING,
    allowNull: false,
  },
  trainer_email: {
    type: STRING,
    allowNull: false,
  },
  trainer_address: {
    type: TEXT('long'),
    allowNull: false,
  },
  trainer_website_url: {
    type: STRING,
    allowNull: true,
  },

  trainer_linkedin_id: {
    type: STRING,
    allowNull: true,
  },
  trainer_twitter_id: {
    type: STRING,
    allowNull: true,
  },
  trainer_facebook_id: {
    type: STRING,
    allowNull: true,
  },
  trainer_instagram_id: {
    type: STRING,
    allowNull: true,
  },
  trainer_career_summary: {
    type: TEXT('long'),
    allowNull: false,
  },
  trainer_experience: {
    type: TEXT('long'),
    allowNull: false,
  },
});

db.sync();

module.exports = { db, Trainer };