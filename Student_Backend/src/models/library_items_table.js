const { db } = require('../db/sql');
const { DataTypes } = require('sequelize');

const LibraryItem = db.define('library_items', {
  item_id: {
    type: DataTypes.INTEGER(255),
    primaryKey: true,
    autoIncrement: true,
  },

  customer_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'customer_tables',
      key: 'customer_id',
    },
  },
  session_id: {
    type: DataTypes.INTEGER(255),
    allowNull: false,
    references: {
      model: 'session_tables',
      key: 'session_id',
    },
  },
  session_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  item_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  item_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  item_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  item_size: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

db.sync();

module.exports = { db, LibraryItem };
