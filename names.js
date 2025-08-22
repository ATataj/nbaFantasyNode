const { Sequelize, DataTypes } = require('sequelize')
const { DATABASE_NAME,
    DATABASE_USERNAME,
    DATABASE_PASSWORD } = require('./config')

// Create an instance of sequelize
const sequelize =
    new Sequelize('nbaFantasy',
        DATABASE_USERNAME,
        DATABASE_PASSWORD, {
        host: 'localhost',
        dialect: 'mysql'
    })

// Validate and connect to the database
sequelize.authenticate()
    .then(() => console.log('Successfully connected to `nbaFantasy`!'))
    .catch((error) => console.log('Failed to connect `nbaFantasy`:', error))

// Define the student model that creates a table in the `student_database`
const name = sequelize.define('name', {
    first: DataTypes.STRING,
    second: DataTypes.STRING,
    tableName: 'test'
})