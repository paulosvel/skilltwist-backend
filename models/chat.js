const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User"); // Import User for association

const Chat = sequelize.define("Chat", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    participants: {
        type: DataTypes.ARRAY(DataTypes.INTEGER), // Array of user IDs
        allowNull: false,
    },
});

module.exports = Chat;