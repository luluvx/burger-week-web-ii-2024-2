const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const session = require('express-session');
const fileUpload = require('express-fileupload');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));

const db = require("./models");
db.sequelize.sync({
    //force: true // drop tables and recreate
}).then(() => {
    console.log("db resync");
});

//sesiones
app.use(session({
  secret: 'majadito'
}))
//middleware
app.use(function(req,res, next){
  res.locals.user = req.session.user;
  /*if(req.session.user){
    res.locals.user = req.session.user;
  }*/
  next();
})

require('./routes')(app);

app.listen(3000, function () {
  console.log('Ingrese a http://localhost:3000')
})