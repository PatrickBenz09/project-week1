'use strict'

const express = require('express');
const router = express.Router();
const model = require('../models');
const encryptWithCrypto = require('../helpers/encrypt');
const salting = require('../helpers/salting');

router.get('/', function(req, res){
  res.render('index', {title: 'Home'})
})


router.get('/signup', function(req,res){
  res.render('signup', {title: 'Signup', msg:''})
})

router.post('/signup', function(req, res){
  model.User.findOne( { where: {username: req.body.username} } )
  .then(result => {
    if (!result) {
      let salty = salting();
      model.User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: encryptWithCrypto(req.body.password, salty),
        salt: salty,
        email: req.body.email,
        role: 'member'
      })
      .then(function(){
        res.redirect('login')
      })
    } else {
      res.send("Username Already Taken! ")
    }
  })
})


router.get('/login', function(req, res){
  res.render('login', {title: 'login', msg: ''})
})

router.post('/login', function(req,res){
  if(!req.body.username || !req.body.password)
  {
    res.send('password dan username harus di isi!')
  }
  else
  {
    model.User.findOne({
      where: {
        username:req.body.username
      }
    })
    .then(function(row){
      if(encryptWithCrypto(req.body.password, row.salt) == row.password)
      {
        req.session.user = {
          username: row.username,
          role: row.role,
          id: row.id
        }
        res.redirect('/menu')
      }
      else
      {
        res.render('login', {title: 'login', msg: 'password salah'})
      }
    })
    .catch(function(err){
      res.send('user not found')
    })
  }
})

router.get('/logout', function(req,res){
  req.session.destroy(err =>{
    res.redirect('/');
  })
})




module.exports = router
