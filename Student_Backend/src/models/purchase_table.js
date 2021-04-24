const { db } = require('../db/sql');
const { DataTypes, INTEGER, STRING, BOOLEAN } = require('sequelize');

const Course = db.define('purchase_table', {
  purchase_id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  student_id: {
    type: INTEGER,
    references: {
      model: 'student_tables',
      key: 'student_id',
    },
  },
  customer_id: {
    type: INTEGER,
    references: {
      model: 'customer_tables',
      key: 'customer_id',
    },
  },
  session_id: {
    type: STRING,
  },
  purchase_type: {
    type: STRING,
    allowNull: false,
  },
  purchase_cupon_code_applied: {
    type: STRING,
    allowNull: false,
  },
  purchase_units_taken: {
    type: STRING,
  },
  purchased_for_email: {
    type: STRING,
    allowNull: false,
  },
  purchased_GSTIN_number: {
    type: STRING,
    allowNull: false,
  },
  purchase_amount: {
    type: STRING,
    allowNull: false,
  },
});

db.sync();
module.exports = Course;
