const { Sequelize } = require('sequelize');
var DataTypes = require('sequelize/lib/data-types');

const sequelize = new Sequelize('calentodo', 'root', 'root', {
  host: 'localhost',
  dialect: 'postgres'
});



sequelize.authenticate()
.then(() => console.log('Connection has been established successfully.'))
.catch((error) => console.error('Unable to connect to the database:', error))


const User = sequelize.define('User', {
  // Model attributes are defined here

  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true // Automatically gets converted to SERIAL for postgres
  },

  user_email: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },

  token: {
    type: DataTypes.STRING,
    allowNull: false
  },

});

User.sync();

module.exports = User;



