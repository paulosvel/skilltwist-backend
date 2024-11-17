const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../config/db");
const User = require("./User"); // Import the User model

const Listing = sequelize.define("Listing", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    skillOffered: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    skillNeeded: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    timestamps: true,
});

User.hasMany(Listing, { foreignKey: 'userId' });
Listing.belongsTo(User, { foreignKey: 'userId' });

module.exports = Listing;
