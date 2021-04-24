const { INTEGER, STRING, BOOLEAN } = require('sequelize');
const { db } = require('../db/sql');

const Affliate = db.define('affiliate_table', {
  affiliate_id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  customer_id: {
    type: INTEGER,
    references: {
      model: 'customer_tables',
      key: 'customer_id',
    },
  },
  student_id: {
    type: INTEGER,
    references: {
      model: 'student_tables',
      key: 'student_id',
    },
  },
  student_name: {
    type: STRING,
  },
  affiliate_name: {
    type: STRING,
    allowNull: false,
  },
  course_name: {
    type: STRING,
  },
  course_id: {
    type: INTEGER,
    references: {
      model: 'session_tables',
      key: 'session_id',
    },
  },
  affiliate_brought_student_name: {
    type: STRING,
    allowNull: false,
  },
  affiliate_brought_student_id: {
    type: INTEGER,
    references: {
      model: 'student_tables',
      key: 'student_id',
    },
  },
  affiliate_purchase_status: {
    type: BOOLEAN,
    defaultValue: 0,
  },
  affiliate_purchaed_amount: {
    type: INTEGER,
    allowNull: true,
  },
  affiliate_rewards_given: {
    type: INTEGER,
    allowNull: true,
  },
});

db.sync();
module.exports = Affliate;
