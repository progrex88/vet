const Sequelize = require('sequelize');
const db = require('./database');

const pet = db.define('pet', {

     petid : {
        type: Sequelize.INTEGER
     },
     petname: {
        type: Sequelize.STRING
     },
     petspecies: {
        type: Sequelize.STRING
     },
     petbreed: {
        type: Sequelize.STRING
     },
     petweight: {
        type: Sequelize.STRING
     },
     petdate: {
        type: Sequelize.STRING
     },
     pethcolor: {
        type: Sequelize.STRING
     },
     pethtype: {
        type: Sequelize.STRING
     },
     petcomment: {
        type: Sequelize.STRING
     },
     perid : {
        type: Sequelize.INTEGER
     }

});

module.exports = pet;