var express = require('express');
var router = express.Router();
var mid = require('../middleware');
const User = require('../models/user');
const axios = require('axios');
const moment =  require('moment');

var config = {
  headers: {'User-Agent' : 'Doviz'}
}
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('welcome api route');
});

router.get('/lastRate/:id', function (req,res,next) {
    var currency = req.params.id
    function lastRate() {
      let lastApi = 'http://www.doviz.com/api/v5/currencies/'+currency+'/latest'
      return axios.get(lastApi, config)
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
      let lastApi = 'http://www.doviz.com/api/v5/coins/'+currency+'/latest'
      return axios.get(lastApi, config)
    }
    axios.all([lastRate()])
      .then(axios.spread(function (coin) {
        let lastCoin = coin.data
        res.json(lastCoin)
      }))
  })

  router.get('/dailyUSD', function (req,res,next) {
    function dailyUsd() {
      var end = moment().subtract(1, 'days').format('YYYY-MM-DD')
      var start = moment().subtract(7, 'days').format('YYYY-MM-DD')
      let dailyApi = ' https://doviz.com/api/v5/currencies/USD/archive?start='+start+'-16&end='+end
       return axios.get(dailyApi, config)
     }
     axios.all([dailyUsd()])
      .then(axios.spread(function(usd){
        let dailyUSD = usd.data
        res.json(dailyUSD)
      })) 
  })
module.exports = router;