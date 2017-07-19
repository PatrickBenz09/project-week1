'use strict'

const express = require('express');
const app = express();
const model = require('./models');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const Group = require('./routers/group');

const index = require('./routers/index');
const menu = require('./routers/menu');
const post = require('./routers/post');



app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'hacktiv',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))


app.use('/', index)

app.use((req,res, next)=>{
  if(req.session.user){
    next();
  }else{
    res.render('login', {title:'login', msg: 'anda harus login'});
  }
})

app.use('/menu', menu);
app.use('/post', post);

app.get('/test', function(req, res){
  res.send('ini login')
})



app.use('/group', Group)


app.listen(3002);
