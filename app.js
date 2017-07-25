'use strict'

const express = require('express');
const app = express();
const model = require('./models');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const Index = require('./routers/index');
const Menu = require('./routers/menu');
const Post = require('./routers/post');
const Group = require('./routers/group');

const server = require('http').Server(app);
const io = require('socket.io')(server);
var connections = [];

io.on('connection', function(socket){
  // console.log('a user connected', socket.handshake.headers['user-agent']);

  connections.push(socket);
  console.log(`Connected: ${connections.length} sockets connected`);
  io.sockets.emit('connected', { connected: connections.length })

  socket.on('post message', function(msg, org){
    io.sockets.emit('new message', { msg: msg, username:org })
  });

  socket.on('create group', function(groupName, groupId, userName){
    io.sockets.emit('new group', { groupName: groupName, groupId: groupId, userName: userName })
  });

  socket.on('disconnect', function(data) {
    connections.splice(connections.indexOf(socket), 1)
    console.log(`A user disconnected: ${connections.length} sockets connected`);
    io.sockets.emit('connected', { connected: connections.length })
  })
});

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


app.use('/', Index)

app.use((req,res, next)=>{
  if(req.session.user){
    next();
  }else{
    res.render('login', {title:'login', msg: 'anda harus login'});
  }
})

app.use('/menu', Menu);
app.use('/post', Post);
app.use('/group', Group)

app.get('/test', function(req, res){
  res.send('ini test')
})


server.listen(process.env.PORT || 3000);
