const express = require('express');
const router = express.Router();
const model = require('../models');


router.get('/', function(req, res) {
  model.Group.findAll({ include: [ model.User ], order: [['createdAt']] })
  .then(result => {
    res.render('group', {datas: result, title: "All Group"});
  })
})

router.get('/myGroup', function (req, res) {
  model.Post.findAll( {include: [ {all:true} ]} )
  .then(result => {
    res.render('myGroup');
  })
})

router.get('/create', function(req, res) {
  res.render('group_create', { title: "Create Group" });
});

router.post('/create', function(req, res) {
  model.Group.create(
  {
    group_name: req.body.group_name,
    UserId: req.session.user.id
  })
  .then(result => {
    res.send(result)
    //res.redirect('/menu')
  })
});

router.get('/delete/:id', function(req,res){
  model.Group.destroy({
    where:{
      id:req.params.id
    }
  })
  .then(function(){
    res.redirect('/menu')
  })
})

// router.get('/group/:id', function(req, res) {
//   res.render('')
// });

// router.get('/group/:id/delete', function(req, res) {
//   model.Post.findAll( {include: [ {all:true} ]} )
//   .then(result => {
//
//   })
// })

module.exports = router;
