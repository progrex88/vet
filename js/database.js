const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('storage','username','password',{
    dialect: 'sqlite',
    storage: './database/vetDB.db',
    operatorsAliases: false,
  
    pool:{
      max:5,
      min:0,
      acquire:30000,
      idle:10000
    }
  });

  module.exports=sequelize;