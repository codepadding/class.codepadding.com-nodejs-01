'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init({
    name: {
      type: DataTypes.STRING,
      allowNull:false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate:{
        isEmail:true
      }
    
      
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      comment: "1=acitve,2=deActive"
    },
    age: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'users',
    paranoid:true
  });
  return users;
};