const express = require('express');
const router = express.Router();
const axios = require('axios');
const User = require('../models/user');
const moment =  require('moment');
var mid = require('../middleware');


/* GET home page. */
router.get('/', function (req, res, next) {
  function getUsd() {
   let currencyApi = 'http://www.doviz.com/api/v1/currencies/USD/latest'
    return axios.get(currencyApi)
  }
  function getEur() {
    let currencyApi = 'http://www.doviz.com/api/v1/currencies/EUR/latest'
    return axios.get(currencyApi)
  }
  function getGbp() {
    let currencyApi = 'http://www.doviz.com/api/v1/currencies/GBP/latest'
    return axios.get(currencyApi)
  }
  function getAll() {
    let allApi = 'http://www.doviz.com/api/v1/currencies/all/latest'
    return axios.get(allApi)
  }
  axios.all([getUsd(), getEur(), getGbp(), getAll()])
    .then(axios.spread(function (usd, eur, gbp , all) {
      let alls = all.data
      alls.forEach(function(item){
       var newSellig = Math.round(item.selling * 100) / 100
       var newChange = Math.round(item.change_rate * 100) / 100
       item.selling = newSellig
       item.change_rate = newChange
      });
    
      let usds = usd.data
      let eurs = eur.data
      let gbps = gbp.data
      let usdBuy = Math.round(usds.selling * 100) / 100
      let usdChange =  Math.round(usds.change_rate * 100) / 100
      let eurBuy = Math.round(eurs.selling * 100) / 100
      let eurChange =  Math.round(eurs.change_rate * 100) / 100
      let gbpBuy = Math.round(gbps.selling * 100) / 100
      let gbpChange =  Math.round(gbps.change_rate * 100) / 100
      res.render('index', { title: 'Money Tracker', usdBuy: usdBuy, usdChange: usdChange ,eurBuy: eurBuy, eurChange: eurChange, gbpBuy: gbpBuy, gbpChange: gbpChange , alls:alls });
    }))
});

router.get('/crypto', function (req, res, next) {
  function getBtc() {
    let cryptoApi = 'https://www.doviz.com/api/v1/coins/bitcoin/latest'
    return axios.get(cryptoApi)
  }
  function getEth() {
    let cryptoApi = 'https://www.doviz.com/api/v1/coins/ethereum/latest'
    return axios.get(cryptoApi)
  }
  function getXrp() {
    let cryptoApi = 'https://www.doviz.com/api/v1/coins/ripple/latest'
    return axios.get(cryptoApi)
  }
  function getLtc() {
    let cryptoApi = 'https://www.doviz.com/api/v1/coins/litecoin/latest'
    return axios.get(cryptoApi)
  }
  function getAll() {
    let allApi = 'https://www.doviz.com/api/v1/coins/all/latest'
    return axios.get(allApi)
  }
  axios.all([getBtc(), getEth(), getXrp(), getLtc(), getAll()])
    .then(axios.spread(function (btc, eth, xrp, ltc, all) {
      let alls = all.data
      alls.forEach(function (item) {
        var newSellig = Math.round(item.selling * 100) / 100
        var newChange = Math.round(item.change_rate * 100) / 100
        item.selling = newSellig
        item.change_rate = newChange
      });
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      })
      alls.forEach(function(item){
        var newSellig = formatter.format(item.selling)
        var newChange = Math.round(item.change_rate * 100) / 100
        var newVolume = formatter.format(item.market_cap)
        item.selling = newSellig
        item.change_rate = newChange
        item.market_cap = newVolume
       });

      let btcs = btc.data
      let eths = eth.data
      let xrps = xrp.data
      let ltcs = ltc.data
      let btcBuy = formatter.format(btcs.selling)
      let btcChange = Math.round(btcs.change_rate * 100) / 100
      let btcVolume = formatter.format(btcs.volume)
      let ethBuy = formatter.format(eths.selling)
      let ethChange = Math.round(eths.change_rate * 100) / 100
      let ethVolume = formatter.format(eths.volume)
      let xrpBuy = formatter.format(xrps.selling)
      let xrpChange = Math.round(xrps.change_rate * 100) / 100
      let xrpVolume = formatter.format(xrps.volume)
      let ltcBuy = formatter.format(ltcs.selling)
      let ltcChange = Math.round(ltcs.change_rate * 100) / 100
      let ltcVolume = formatter.format(ltcs.volume)
      res.render('crypto', {
        title: 'Money Tracker', btcBuy: btcBuy, btcChange: btcChange, btcVolume: btcVolume,
        ethBuy: ethBuy, ethChange: ethChange, ethVolume: ethVolume, xrpBuy: xrpBuy, xrpChange: xrpChange, xrpVolume: xrpVolume,
        ltcBuy: ltcBuy, ltcChange: ltcChange, ltcVolume: ltcVolume, alls: alls
      });
    }))
})

router.get('/stockMarket', function(req,res,next){
  function get100() {
    let stockApi = 'http://www.doviz.com/api/v1/indexes/XU100/latest'
    return axios.get(stockApi)
  }
  function get50() {
    let stockApi = 'http://www.doviz.com/api/v1/indexes/XU050/latest'
    return axios.get(stockApi)
  }
  function get30() {
    let stockApi = 'http://www.doviz.com/api/v1/indexes/XU030/latest'
    return axios.get(stockApi)
  }
  function getGold() {
    let goldApi = 'http://www.doviz.com/api/v1/golds/all/latest'
    return axios.get(goldApi)
  }
  axios.all([get100(), get30(), get50(), getGold()])
    .then(axios.spread(function (x100, x50, x30, gold) {
      let golds = gold.data
      const formatter = new Intl.NumberFormat('en-TR', {
        style: 'currency',
        currency: 'TRY',
        minimumFractionDigits: 2
      })
      golds.forEach(function(item){
        var newSellig = formatter.format(item.selling)
        var newChange = Math.round(item.change_rate * 100) / 100
        item.selling = newSellig
        item.change_rate = newChange
       });

      let x100s = x100.data
      let x50s = x50.data
      let x30s = x30.data
      let x100Change = Math.round(x100s.change_rate * 100) / 100
      let x50Change = Math.round(x50s.change_rate * 100) / 100
      let x30Change = Math.round(x30s.change_rate * 100) / 100

      res.render('stockMarket', {
        title: 'Money Tracker', x100s: x100s, x50s:x50s, x30s:x30s, x100Change:x100Change,x50Change:x50Change,x30Change:x30Change,
        golds:golds
      });
    }))
})
//user register and login routes
router.get('/login', function (req, res, next) {
  res.render('login', {title: 'Money Tracker'})
})

router.post('/login', function (req,res,next) {
  if (req.body.email && req.body.pass) {
    User.authenticate(req.body.email , req.body.pass, function (error,user) {
      if (error || !user) {
        var err = new Error('Hatalı şifre veya kullanıcı adı!');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } else {
    var err = new Error('E-posta ve şifre girişi zorunludur');
    err.status = 401;
    return next(err);
  }
})

router.get('/register', function (req, res, next) {
  res.render('register', {title: 'Money Tracker'})
})

router.post('/register', function (req,res,next) {
  if (req.body.ad && req.body.soyad && req.body.email && req.body.pass) {
    var userData = {
      name: req.body.ad,
      lastName: req.body.soyad,
      email: req.body.email,
      password: req.body.pass
    }
    User.create(userData, function (error,user) {
      if(error){
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile')
      }
    })
  }
  else {
    var err = new Error('Tüm alanlar doldurulmalıdır');
    err.status = 400;
    return next(err)
  }
})

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

router.get('/test', function (req, res, next) {
  function getUsd() {
   let currencyApi = 'http://www.doviz.com/api/v1/currencies/USD/latest'
    return axios.get(currencyApi)
  }
  function getEur() {
    let currencyApi = 'http://www.doviz.com/api/v1/currencies/EUR/latest'
    return axios.get(currencyApi)
  }
  function getGbp() {
    let currencyApi = 'http://www.doviz.com/api/v1/currencies/GBP/latest'
    return axios.get(currencyApi)
  }
  function getAll() {
    let allApi = 'http://www.doviz.com/api/v1/currencies/all/latest'
    return axios.get(allApi)
  }
  axios.all([getUsd(), getEur(), getGbp(), getAll()])
    .then(axios.spread(function (usd, eur, gbp , all) {
      let alls = all.data
      alls.forEach(function(item){
       var newSellig = Math.round(item.selling * 100) / 100
       var newChange = Math.round(item.change_rate * 100) / 100
       item.selling = newSellig
       item.change_rate = newChange
      });


      let usds = usd.data
      let eurs = eur.data
      let gbps = gbp.data
      let usdBuy = Math.round(usds.selling * 100) / 100
      let usdChange =  Math.round(usds.change_rate * 100) / 100
      let eurBuy = Math.round(eurs.selling * 100) / 100
      let eurChange =  Math.round(eurs.change_rate * 100) / 100
      let gbpBuy = Math.round(gbps.selling * 100) / 100
      let gbpChange =  Math.round(gbps.change_rate * 100) / 100
      let gbpUsd = Math.round ((gbpBuy / usdBuy) * 100) / 100
      let eurUsd = Math.round ((eurBuy / usdBuy) * 100) / 100
      res.render('test', { title: 'Money Tracker', usdBuy: usdBuy, usdChange: usdChange ,eurBuy: eurBuy, eurChange: eurChange, gbpBuy: gbpBuy, gbpChange: gbpChange , alls:alls , eurUsd:eurUsd, gbpUsd:gbpUsd});
    }))
});

router.get('/dailyUSD', function (req,res,next) {
  function dailyUsd() {
    var end = moment().subtract(1, 'days').format('YYYY-MM-DD')
    var start = moment().subtract(7, 'days').format('YYYY-MM-DD')
    let dailyApi = ' https://doviz.com/api/v1/currencies/USD/archive?start='+start+'-16&end='+end
     return axios.get(dailyApi)
   }
   axios.all([dailyUsd()])
    .then(axios.spread(function(usd){
      let dailyUSD = usd.data
      res.json(dailyUSD)
    }))
 
})
module.exports = router;
