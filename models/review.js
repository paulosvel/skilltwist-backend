const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User"); // Import User for association

const Review = sequelize.define("Review", {
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
            key: "id",
        },
    },
    reviewerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id",
        },
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
    },
});

User.hasMany(Review, { foreignKey: "userId", as: "reviews" });
User.hasMany(Review, { foreignKey: "reviewerId", as: "reviewer" });
Review.belongsTo(User, { foreignKey: "userId" });
Review.belongsTo(User, { foreignKey: "reviewerId" });

module.exports = Review;