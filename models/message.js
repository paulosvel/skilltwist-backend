const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Chat = require("./chat");
const User = require("./User");

const Message = sequelize.define("Message", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    chatId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Chat,
            key: "id",
        },
    },
    senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id",
        },
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
});

module.exports = Message;