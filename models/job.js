const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/database');


const Department = sequelize.define('Department',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      salaryRange: {
        type: DataTypes.STRING,
        allowNull: false,
      },
     
})


module.exports = Department;