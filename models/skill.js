const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User"); // Import User for association

const Skill = sequelize.define("Skill", {
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
  skillType: {
    type: DataTypes.ENUM("offered", "needed"),
    allowNull: false,
  },
  skillName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Skill, { foreignKey: "userId" });
Skill.belongsTo(User, { foreignKey: "userId" });

module.exports = Skill;
