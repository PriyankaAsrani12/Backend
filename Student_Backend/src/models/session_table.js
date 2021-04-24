const { db } = require('../db/sql');
const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');
const Session = db.define('session_table', {
  session_id: {
    type: DataTypes.INTEGER(255),
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  customer_id: {
    type: DataTypes.INTEGER(255),
    allowNull: true,
    references: {
      model: 'customer_tables',
      key: 'customer_id',
    },
  },
  session_type: {
    type: DataTypes.STRING,
    allowNull: true,
    // defaultValue: Null
  },
  session_name: {
    type: DataTypes.STRING,
    allowNull: true,
    // defaultValue: Null
  },
  session_description: {
    type: DataTypes.TEXT('long'),
    allowNull: true,
    // defaultValue: Null/
  },
  session_trainer_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  session_tags: {
    type: DataTypes.STRING,
    allowNull: true,
    // defaultValue: Null
  },
  session_tagline: {
    type: DataTypes.STRING,
    allowNull: true,
    // defaultValue: Null
  },
  session_trainer_id: {
    type: DataTypes.STRING,
    allowNull: true,
    // defaultValue: Null
  },
  session_duration: {
    type: DataTypes.INTEGER(50),
    allowNull: true,
    // defaultValue: Null
  },
  session_fee: {
    type: DataTypes.STRING,
    allowNull: true,
    // defaultValue: Null
  },
  session_fee_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  session_link: {
    type: DataTypes.STRING,
    allowNull: true,
    // defaultValue: Null
  },
  session_uploaded_on: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  session_start_time: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  },
  session_end_time: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  },
  session_occurance: {
    type: DataTypes.STRING,
    allowNull: true,
    // defaultValue: Null
  },
  session_enable_registration: {
    type: DataTypes.BOOLEAN,
    default: 0,
  },
  session_start_date: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW,
    allowNull: true,
  },

  session_registration: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  session_associated_course_id: {
    type: DataTypes.INTEGER(255),
    allowNull: true,
    // defaultValue: Null
  },
  session_associated_course_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  session_zoom_code: {
    type: DataTypes.STRING,
    allowNull: true,
    // defaultValue: Null
  },
  session_zoom_password: {
    type: DataTypes.STRING,
    allowNull: true,
    // defaultValue: Null
  },
  session_thumbnail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  modified_by: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

db.sync();

module.exports = { db, Session };