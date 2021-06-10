'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.movie.belongsToMany(models.user, { through: "user_list" })
    }
  };
  movie.init({
    title: DataTypes.STRING,
    year: DataTypes.INTEGER,
    genre: DataTypes.STRING,
    poster: DataTypes.STRING,
    plot: DataTypes.STRING,
    production: DataTypes.STRING,
    recommend: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'movie',
  });
  return movie;
};