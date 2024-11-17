const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('database', 'email', 'password', {
	host: 'localhost',
	dialect: 'postgres',
});

const Conversation = sequelize.define('Conversation', {
	participants: {
		type: DataTypes.ARRAY(DataTypes.INTEGER),
	},
	messages: {
		type: DataTypes.ARRAY(DataTypes.INTEGER),
		defaultValue: [],
	},
}, { timestamps: true });

module.exports = Conversation;