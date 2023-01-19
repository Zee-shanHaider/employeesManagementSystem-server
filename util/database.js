//We can create database connection pool with ORM that is Sequelize

const Sequelize = require('sequelize');
const sequelize = new Sequelize('myFirstDatabase','root', 'Admin125!@%',{
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize







//This was all about creating databse connection pool by simple methods

// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node_mysql',
//     password: 'Admin125!@%'
// })

// module.exports = pool.promise()


