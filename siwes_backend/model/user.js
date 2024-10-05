'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ob_scores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ob_scores.belongsTo(models.ob_records,{foreignKey:"ob_record_id"})
      ob_scores.belongsTo(models.supervisors,{foreignKey:"ob_supervisor_id"})
    }
  }
  ob_scores.init({
    ob_record_id: DataTypes.INTEGER,
    ob_supervisor_id: DataTypes.INTEGER,
    value: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ob_scores',
  });
  return ob_scores;
};