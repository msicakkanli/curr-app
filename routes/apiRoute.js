var express = require('express');
var router = express.Router();
var mid = require('../middleware');
const User = require('../models/user');
const axios = require('axios');
const moment =  require('moment');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('welcome api route');
});

router.get('/lastRate/:id', function (req,res,next) {
    var currency = req.params.id
    function lastRate() {
      let lastApi = 'http://www.doviz.com/api/v1/currencies/'+currency+'/latest'
      return axios.get(lastApi)
    }
    axios.all([lastRate()])
      .then(axios.spread(function (usd) {
        let lastUsd = usd.data
        res.json(lastUsd)
      }))
  })
  
  router.get('/lastCoin/:id', function (req,res,next) {
    var currency = req.params.id
    function lastRate() {
      let lastApi = 'http://www.doviz.com/api/v1/coins/'+currency+'/latest'
      return axios.get(lastApi)
    }
    axios.all([lastRate()])
      .then(axios.spread(function (coin) {
        let lastCoin = coin.data
        res.json(lastCoin)
      }))
  })
module.exports = router;