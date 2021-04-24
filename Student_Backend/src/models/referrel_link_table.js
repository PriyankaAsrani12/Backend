const { db } = require('../db/sql');
const { INTEGER, STRING } = require('sequelize');

const ReferalLink = db.define('referal_link', {
  link_id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  session_id: {
    type: INTEGER,
    references: {
      model: 'session_tables',
      key: 'session_id',
    },
  },
  link_whatsapp: {
    type: STRING,
    allowNull: false,
  },
  link_instagram: {
    type: STRING,
    allowNull: false,
  },
  link_linkedIn: {
    type: STRING,
    allowNull: false,
  },
  link_gmail: {
    type: STRING,
    allowNull: false,
  },
});

db.sync();
module.exports = ReferalLink;
