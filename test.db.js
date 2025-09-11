const { Sequelize, DataTypes } = require('sequelize')
const { DATABASE_NAME,
    DATABASE_USERNAME,
    DATABASE_PASSWORD } = require('./config')

const sequelize =
    new Sequelize(DATABASE_NAME,
        DATABASE_USERNAME,
        DATABASE_PASSWORD, {
        host: 'localhost',
        dialect: 'mysql'
    })

// Validate and connect to the database
sequelize
    .authenticate()
    .then(() => console.log('Successfully connected to the database!'))
    .catch((error) => console.log('Failed to connect the database:', error))

// define the model for everything in the test table
const Name = sequelize.define('name', {
    first: DataTypes.STRING,
    second: DataTypes.STRING
    },
    {
    tableName: 'test',
  },
)

// insert into
// sequelize.sync() -> automatically creates the table if none exist, does nothing if it does.
// options : force: true -> creates the table dropping any existing ones with matching name
// alter: true -> alters the table if one already present
sequelize.sync()
    .then(async () => {
        await Name.create({
            first: 'DeAndre',
            second: 'Ayton'
        })
        console.log('Ayton Added')
    })
    .catch((e) => console.log('Ayton Not Added:', e))
// find *
sequelize.sync()
    .then(async () => {
        let names;
        names = await Name.findAll({raw:true})
        console.log('all in db table test:', names)
    })
    .catch((e) => console.log('failed to retrieve', e))
        
//find where
sequelize.sync()
    .then(async () => {
        let name;
        await Name.findOne({
            raw:true,
            where: {first: 'dame'}
        })
        console.log('fetched:', name)
    })
    .catch((e) => console.log('failed to fetch:', e))

//delete from
sequelize.sync()
    .then(async () => {
        await Name.destroy({ where: { first: 'DeAndre' } })
        console.log('Deleted DeAndre')
    })
    .catch((e) => console.log('failed to delete', e))
