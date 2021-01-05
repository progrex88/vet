const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const { render } = require('pug');
const { response } = require('express');
const upload = multer();
const {v4: uuid4} = require('uuid');
const app = express();
const port = 3000;
const petslist = require('./pets');


// const { CommandCursor } = require('mongodb');
//const MongoClient = require('mongodb').MongoClient;

// const mysql = require('mysql');
//const db = require('./sqldb');



const sqlitedb = require('./sqlite');
// const con = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   port: '3306'
// });

// con.connect(function(err){
//   if(err) throw err;
//   console.log("Mysql db connected")
// });





// const dburl = 'mongodb://localhost:27017/';

// const client = MongoClient(dburl);
// const dbName = 'vetDB';


// async function run() {
//   try {
//     await client.connect();

//     const database = client.db(dbName);
    
//   } 
//   catch(error){
//     console.log(error);

//   }
//   finally {
//     // Ensures that the client will close when you finish/error
//   // await client.close();
//   }
// }
// run().catch(console.dir);
  



app.set('view engine', 'pug');
app.set('views','./views');
app.use(express.static('img'));
app.use(express.static('css'));
//app.use(express.static('html'));
app.use(express.static('js'));
app.use(express.static('public'));
app.use('/pets',petslist);



//- ------------------------GETS method ------------------------- -//

app.get('/client', function(req,res){
  res.render('person');
});

app.get('/calendar', function(req,res){
  res.send("calendar not done yet")
});


app.get('/pets', function(req,res){
  res.render('pets');
});

app.get('/searchpets', function(req,res){
  res.render('searchpets');
})


app.get('/dashboard', function(req,res){
  res.render('dashboard');
});


app.get('/', (req, res) => {
  res.send('Hello as!')
});

app.get('/form', function(req, res){
  res.render('form');
});

app.get('/vetmanager', function(req,res){
  res.render('vetmanager');
})



app.get('/allpets', async function(req, res){

    
  //----------------SQL-----------------//
  // const sql = db.query("SELECT * FROM pets", function(err, result,fields) {
  //   if (err) throw err;
  //   //console.log(result)
  //   res.json(result);
  // });

  //---------------SQLITE---------------//




});


app.get('/allclients', async function(req, res){

    
      //----------------MYSQL-----------------//
      // const sql = db.query("SELECT * FROM person", function(err, result,fields) {
      //   if (err) throw err;
      //   //console.log(result)
      //   res.json(result);
      // });

      //-----------------SQLITE-------------//








    //---------------Mongodb----------------//
  //   await client.connect();
  //   const database = client.db(dbName);
  //   const collection = database.collection('personCollection');
  //   const findAllClients = collection.find({}).toArray((error, result) =>{
  //   //console.log(resault);
  //  // res.json(result);
  //   client.close(); 
 // });

  //-------------------------------------//
   

  });

  

// ...
// var birds = require('./birds')
// app.use('/birds', birds)
 

//   app.get('/search', async function(req,res){

//     let perids ;

//     const sql = db.query("SELECT * FROM person", function(err, result,fields) {
//       if (err) throw err;
//       res.render('searchclient', {userData:result});
//     });

         
         
//   })
  
  






//- ------------------ PARSING metgods --------------------- -//

app.use('/static', 
//express.static('js'), express.static('img'), express.static('html'), express.static('css')
express.static('public')
);
//for parsing application/json
app.use(bodyParser.json());

//for parsing application/xwww-
app.use(bodyParser.urlencoded({extended: true}));
//form-urlencoded

//for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));








//- --------------------POSTs methods --------------------- -//

app.post('/form', function(req, res){
  console.log(req.body);
  res.send('recived your request!');
});


app.post('/pets', async function(req,res){
  //res.render('pets')
  const petinfo = req.body; //Get the parsed information

 const newpet = {
        petid : uuid4(),
        petname:    petinfo.name,
        petspecies: petinfo.species,
        petbreed: petinfo.breed,
        petweight:    petinfo.weight,
        petdate: petinfo.date,
        pethcolor:   petinfo.hcolor,
        pethtype:   petinfo.htype,
        petcomment: petinfo.comment
 };

  
  if(!petinfo.name || !petinfo.species || !petinfo.breed 
    || !petinfo.weight || !petinfo.date 
    || !petinfo.hcolor || !petinfo.htype || !petinfo.comment)
    {
     res.render('show_message', {
        message: "Sorry, you provided worng info", type: "error"});
      } 
  else {
    newpet;

        {
        
         res.render('pet_message',{newpet, type: "OK"});
         console.log(newpet);
       }

        //-----------------MYSQL----------------//
        // db.query('INSERT INTO pets SET ?', newpet, function(err, result) {
        // if (err) throw err});
        // console.log('saved to mysql');


        //----------------SQLITE---------------//
       const sql_insert = `INSERT INTO pets(petid,petname,petspecies,petbreed,petweight,petdate,pethcolor,pethtype,petcomment) VALUES ("${newpet.petid}","${newpet.petname}","${newpet.petspecies}",
        "${newpet.petbreed}","${newpet.petweight}","${newpet.petdate}","${newpet.pethcolor}","${newpet.pethtype}","${newpet.petcomment}")`;


       sqlitedb.run(sql_insert,err => {
         if(err){
           console.log(sql_insert);
           return console.error(err.message);
         }
         console.log('created pet')
       });

        // sqlitedb.close( (err) => {
        //   if (err) {
        //     console.error(err.message);
        //   }
        //   console.log('db conn closed');
        // });

  };

});



app.post('/client', async function(req, res){
  const personInfo = req.body; //Get the parsed information
  
  if(!personInfo.name || !personInfo.surname || !personInfo.address 
    || !personInfo.city || !personInfo.zipCode 
    || !personInfo.phone || !personInfo.email)
    {
     res.render('show_message', {
        message: "Sorry, you provided worng info", type: "error"});

  } 
  else {

     const newPerson = {
        perid : uuid4(),
        pername:    personInfo.name,
        persurname: personInfo.surname,
        peraddress: personInfo.address,
        percity:    personInfo.city,
        perzipcode: personInfo.zipCode,
        perphone:   personInfo.phone,
        peremail:   personInfo.email
     };


        {
          res.render('show_message',{newPerson, type: "OK"});
       }

       //----------------SQLITE-----------------//





        //-----------------MYSQL----------------//
        // db.query('INSERT INTO person SET ?', newPerson, function(err, result) {
        // if (err) throw err},
        // console.log(newPerson.perid.length)
        // );

        // db.query('INSERT INTO pets(perid) value (\''+newPerson.perid+'\')',function(err,result){
        //   if(err) throw err},
        //   console.log(newPerson.perid), 
        // );        
        // console.log('saved to mysql');



      //------------------Mongodb--------------//
      //  await client.connect();
      //  const database = client.db(dbName);

      //  database.collection('personCollection').insertOne(newPerson, 
      // (error, result) => {
      //   if(error)
      //       console.log("database error", error);
  
      //   
      //   client.close();
      // });


      //--------------------------------------//

      

  };

});


//-----------Functions---------------------//

























//- --------------Express listener----------------------------//

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})