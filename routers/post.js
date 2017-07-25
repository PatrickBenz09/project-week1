'use strict'

const express = require('express');
const router = express.Router();
const model = require('../models');
const list = require('../helpers/listContri')


router.get('/:idg', function(req,res){
  model.Post.findAll({
    attributes: ['id', 'GroupId', 'UserId', 'post', 'createdAt'],
    where: {
      GroupId: req.params.idg
    },
    order: [['createdAt']],
    include:[{all:true}]
  })
  .then(function(rows){
    model.Group.findOne({
      where:{
        id:req.params.idg
      }
    })
    .then(function(grup){
      let contri = list(rows);
      res.render('post', {title: 'Post',username: req.session.user.username, id: req.session.user.id, data: rows, idg: req.params.idg, contr: contri, grupName: grup.group_name})
    })
  })
})

router.post('/:id/:idg', function(req,res){
  model.Post.create({
    UserId: req.params.id,
    GroupId: req.params.idg,
    post: req.body.post
  })
  .then(function(rows){
    // res.redirect(`/post/${req.params.idg}`)
    // model.User.findById(rows.UserId)
    // .then(user => {
    //   res.send(user.username)
    // })
    // res.send();
  })
})

router.get('/delete/:id/:idg', function(req,res){
  model.Post.destroy({
    where:{
      id: req.params.id
    }
  })
  .then(function(){
    res.redirect(`/post/${req.params.idg}`)
  })
})


module.exports = router;
