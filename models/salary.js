const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/database');


const Salary = sequelize.define('Salary',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bonus: {
        type: DataTypes.INTEGER,
        allowNull: true,
      }
})


module.exports = Salary;