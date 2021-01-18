const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const path = require('path');
const multer = require('multer');
const { render } = require('pug');
const { response } = require('express');
const upload = multer();
const { v4: uuid4 } = require('uuid');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./database');



db.authenticate()
  .then(() => console.log('vetDB connected'))
  .catch(err => console.log('Error' + err))




app.set('view engine', 'pug');
app.set('views', './views');
// app.use(express.static('img'));
// app.use(express.static('css'));
//app.use(express.static('html'));
// app.use(express.static('js'));
// app.use(express.static('routes'));
// app.use(express.static('public'));



//- ------------------------GETS method ------------------------- -//

app.get('/client', function (req, res) {
  res.render('person');
});

app.get('/calendar', function (req, res) {
  res.send("calendar not done yet")
});


app.get('/pets', function (req, res) {
  res.render('pets');
});






app.get('/', (req, res) => {
  res.send('INDEX!')
});

app.get('/form', function (req, res) {
  res.render('form');
});

app.get('/vetmanager', function (req, res) {
  res.render('vetmanager');
})



app.get('/allpets', async function (req, res) {


  //----------------SQL-----------------//
  const sql = db.query("SELECT * FROM pets", function (err, result, fields) {
    if (err) throw err;
    //console.log(result)
    res.json(result);
  });

});


app.get('/allclients', async function (req, res) {


  //----------------SQL-----------------//
  const sql = db.query("SELECT * FROM person", function (err, result, fields) {
    if (err) throw err;
    //console.log(result)
    res.json(result);
  });

});


app.get('/search', async function (req, res) {

  let perids;

  const sql = db.query("SELECT * FROM person", function (err, result, fields) {
    if (err) throw err;
    res.render('searchclient', { userData: result });
  });



})








//- ------------------ PARSING metgods --------------------- -//

app.use('/', require('./pets'));

app.use('/static',
  //express.static('js'), express.static('img'), express.static('html'), express.static('css')
  express.static('public')
);
//for parsing application/json
app.use(bodyParser.json());

//for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

//for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));








//- --------------------POSTs methods --------------------- -//

app.post('/form', function (req, res) {
  console.log(req.body);
  res.send('recived your request!');
});


app.post('/pets', async function (req, res) {
  //res.render('pets')
  const petinfo = req.body; //Get the parsed information

  if (!petinfo.name || !petinfo.species || !petinfo.breed
    || !petinfo.weight || !petinfo.date
    || !petinfo.hcolor || !petinfo.htype || !petinfo.comment) {
    res.render('show_message', {
      message: "Sorry, you provided worng info", type: "error"
    });
  }
  else {

    const newpet = {
      id: uuid4(),
      name: petinfo.name,
      species: petinfo.species,
      breed: petinfo.breed,
      weight: petinfo.weight,
      date: petinfo.date,
      hcolor: petinfo.hcolor,
      htype: petinfo.htype,
      comment: petinfo.comment
    };


    {

      res.render('pet_message', { newpet, type: "OK" });
      console.log(newpet);
    }

    //-----------------MYSQL----------------//
    db.query('INSERT INTO pets SET ?', newpet, function (err, result) {
      if (err) throw err
    });
    console.log('saved to mysql');

  };

});



app.post('/client', async function (req, res) {
  const personInfo = req.body; //Get the parsed information

  if (!personInfo.name || !personInfo.surname || !personInfo.address
    || !personInfo.city || !personInfo.zipCode
    || !personInfo.phone || !personInfo.email) {
    res.render('show_message', {
      message: "Sorry, you provided worng info", type: "error"
    });

  }
  else {

    const newPerson = {
      perid: uuid4(),
      pername: personInfo.name,
      persurname: personInfo.surname,
      peraddress: personInfo.address,
      percity: personInfo.city,
      perzipcode: personInfo.zipCode,
      perphone: personInfo.phone,
      peremail: personInfo.email
    };


    {
      res.render('show_message', { newPerson, type: "OK" });
    }

    //-----------------MYSQL----------------//
    db.query('INSERT INTO person SET ?', newPerson, function (err, result) {
      if (err) throw err
    },
      console.log(newPerson.perid.length)
    );

    db.query('INSERT INTO pets(perid) value (\'' + newPerson.perid + '\')', function (err, result) {
      if (err) throw err
    },
      console.log(newPerson.perid),
    );



    console.log('saved to mysql');



    


  };

});


















//- --------------Express listener----------------------------//

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})

















//-------------OLD----------------------------------------------//

// app.get('/dashboard', function (req, res) {
//   res.render('dashboard');
// });

// app.get('/dynamic_view', function (req, res) {
//   res.render('dynamic', {
//     name: 'tutpoints',
//     url: "https://www.tutorialspoint.com/"
//   });
// });





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




// const { CommandCursor } = require('mongodb');
// const MongoClient = require('mongodb').MongoClient;

// const mysql = require('mysql');
// const db = require('./sqldb');

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

//----------mysql test------------------//
// app.get('/dbsave', function(req,res){
//   const post = {name:"rad", surname:"pac", address:"jajajaja",phone:'kjbklk',email:'sasd@as.as'};
//   db.query('INSERT INTO person SET ?', post, function(err, result) {
//   if (err) throw err});
//   console.log('saved to mysql');
//   res.render('dbsave')
// });
//--------------------------------//
