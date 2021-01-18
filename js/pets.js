const express = require('express');
const router = express.Router();
const db = require('./database');
//pet model
const Pet = require('../js/pet');


router.get('/', (req,res) => 
Pet.findAll()
.then(pets => {
    console.log(pets);
    res.sendStatus(200);

})
.catch(err => console.log(err)));

module.exports = router;