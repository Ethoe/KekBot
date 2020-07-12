const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
});

const ServerAdvice = sequelize.define('tags', {
    ServerID: Sequelize.STRING,
    Advice: {
        type: Sequelize.STRING,
        unique: true,
    },
    Author: Sequelize.STRING,
});

const Riddles = sequelize.define('riddles', {
    ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ServerID: Sequelize.STRING,
    Riddle: Sequelize.STRING,
    Answer: Sequelize.STRING,
    Author: Sequelize.STRING,
})

module.exports = { sequelize, ServerAdvice, Riddles }