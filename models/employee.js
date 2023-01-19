const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Employee = sequelize.define('employee', {
  // Model attributes are defined here
  id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    // allowNull defaults to true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "Must be a valid email address",
      }
    }
  },
  imageUrl: {
    type: DataTypes.STRING,
    required: true,
    allowNull: false,
  },
  address:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNo: {
    type: DataTypes.BIGINT,
    allowNull: false
  }, // Other model options go here
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true
  } 
});

module.exports = Employee;