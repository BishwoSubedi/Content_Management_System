const { Sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Blog = sequelize.define("blog", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subtitle:{
      type: DataTypes.STRING,
      allowNull: false,
      },
     description:{
      type: DataTypes.STRING,
    }
    });
    return Blog;
  };