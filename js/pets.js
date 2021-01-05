const express = require('express');
const router  = express.Router();
const db=require('./sqlite');

router.get('/pets-list', function(req,res,next){

    const sql='Select * From pets';
    db.run(sql, function(err,data,fields){
        if(err) throw err;
        res.render('searchpets',{petsData: data});
    });
});

module.exports=router;