var express = require('express');
var router = express.Router();
var mid = require('../middleware');
const User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('welcome users route');
});

router.get('/profile', mid.requiresLogin, function(req, res, next) {
  User.findById(req.session.userId)
      .exec(function (error, user) {
        if (error) {
          return next(error);
        } else {
          var name = user.name;
          var firstLetterName = name.charAt(0)
          var lastName = user.lastName;
          var firstLetterLastname = lastName.charAt(0)
          return res.render('profile', { title: 'Profile', name: user.name, lastName: user.lastName, firstLetterName:firstLetterName, firstLetterLastname:firstLetterLastname });
        }
      });
});

router.get('/newTrans', mid.requiresLogin, function(req, res, next) {
  User.findById(req.session.userId)
      .exec(function (error, user) {
        if (error) {
          return next(error);
        } else {
          var name = user.name;
          var firstLetterName = name.charAt(0)
          var lastName = user.lastName;
          var firstLetterLastname = lastName.charAt(0)
          return res.render('newTrans', { title: 'Profile', name: user.name, lastName: user.lastName, firstLetterName:firstLetterName, firstLetterLastname:firstLetterLastname });
        }
      });
});

//user logout
router.get('/logout', function (req,res,next) {
  if(req.session) {
    req.session.destroy(function(err){
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    })
  }
})


module.exports = router;
