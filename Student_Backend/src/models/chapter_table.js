const { db } = require('../db/sql');
const { DataTypes } = require('sequelize');

const ChapterTable = db.define('chapter_table', {
  chapter_id: {
    type: DataTypes.INTEGER(255),
    primaryKey: true,
    autoIncrement: true,
  },
  session_id: {
    type: DataTypes.INTEGER(255),
    references: {
      model: 'session_tables',
      key: 'session_id',
    },
  },
  customer_id: {
    type: DataTypes.INTEGER(255),
    references: {
      model: 'customer_tables',
      key: 'customer_id',
    },
  },
  chapter_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  chapter_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  chapter_learnings: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
  },
});

db.sync();
module.exports = { db, ChapterTable };
