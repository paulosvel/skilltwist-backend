const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('database', 'email', 'password', {
	host: 'localhost',
	dialect: 'postgres',
});

const Message = sequelize.define('Message', {
	senderId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	receiverId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	message: {
		type: DataTypes.STRING,
		allowNull: false,
	},
}, { timestamps: true });

module.exports = Message;