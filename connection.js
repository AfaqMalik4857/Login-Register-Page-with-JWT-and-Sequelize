const { Sequelize } = require('sequelize');

// Create a new Sequelize instance
const sequelize = new Sequelize('reg', 'root', 'afaq4857', {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log,
});

// Test the connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Export the Sequelize instance
module.exports = sequelize;
