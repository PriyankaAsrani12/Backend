const { db } = require('../db/sql');
const { DataTypes } = require('sequelize');

const User = db.define('customer_table', {
  customer_id: {
    type: DataTypes.INTEGER(255),
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  customer_first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customer_last_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customer_email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  customer_password: {
    type: DataTypes.STRING,
    // allowNull: false
    allowNull: true,
  },
  customer_phone_number: {
    type: DataTypes.INTEGER(15),
    // allowNull: false
    allowNull: true,
  },
  customer_institute_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customer_subdomain_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customer_career_summary: {
    type: DataTypes.TEXT('long'),
    allowNull: true,
  },
  customer_experience: {
    type: DataTypes.TEXT('long'),
    allowNull: true,
  },
  customer_role: {
    type: DataTypes.STRING,
    defaultValue: 'Admin',
  },
  customer_website_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customer_facebook_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customer_linkedin_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customer_twitter_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customer_occupation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customer_profile_picture: {
    type: DataTypes.STRING,
    defaultValue:
      'https://ga.berkeley.edu/wp-content/uploads/2015/08/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
  },
  customer_about_me: {
    type: DataTypes.TEXT('long'),
    allowNull: true,
  },
  customer_short_introduction: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customer_skills: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customer_subscription: {
    type: DataTypes.STRING,
    defaultValue:"Trial"
  },
  customer_facebook_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customer_facebook_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customer_linkedin_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customer_twitter_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customer_email_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0,
  },
  customer_phone_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0,
  },
  customer_zoom_jwt_token: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customer_zoom_email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customer_payment_full_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customer_payment_bank_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customer_payment_account_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customer_payment_IFSC_code: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customer_payment_bank_address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customer_storage_zone_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customer_pull_zone_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customer_cdn_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  communication_email_signup: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0,
  },
  communication_email_on_purchase: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0,
  },
  communication_message_signup: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0,
  },
  communication_message_purchase: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0,
  },
  customer_blogs: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0,
  },
  customer_affiliate: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0,
  },
  customer_affiliate_did_changes: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0,
  },
  customer_affiliate_monitary_benifits: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0,
  },
  customer_currency_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customer_currency_rate: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  customer_affiliate_type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customer_affiliate_fixed_rate: {
    type: DataTypes.INTEGER,
    defaultValue: null,
  },
  customer_affiliate_range_cost_min: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  customer_affiliate_range_cost_max: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  customer_affiliate_range_rate: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  customer_storage_zone_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customer_pull_zone_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customer_storage_zone_user_key: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customer_storage_zone_password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customer_pull_zone_hostname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customer_url_token_authentication_key: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

db.sync();

module.exports = { db, User };
