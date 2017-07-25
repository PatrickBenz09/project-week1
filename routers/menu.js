'use strict'

const express = require('express');
const router = express.Router();
const model = require('../models');


router.get('/', function(req,res){
  model.Group.findAll({ include: [ model.User ], order: [['createdAt']] })
  .then(result => {
    res.render('menu', {datas: result, title: "Menu", username: req.session.user.username, group_id: ""});
  })
})


router.get('/edit', function(req, res){
  model.User.findOne({
    where: {
      username: req.session.user.username
    }
  })
  .then(function(row){
    res.render('editProfile', {title: 'Edit Profile', data: row})
  })
})

router.post('/edit', function(req,res){
  model.User.update({
    first_name:req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  },{
    where:{
      id: req.session.user.id
    }
  })
  .then(function(){
    res.redirect('/menu')
  })
})



module.exports = router
