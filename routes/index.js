const express = require('express');
const router = express.Router();
const axios = require('axios')



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
   axios.all([getBtc(), getEth(), getXrp(),getLtc(), getAll()])
     .then(axios.spread(function (btc, eth, xrp ,ltc, all) {
       let alls = all.data
       alls.forEach(function(item){
        var newSellig = Math.round(item.selling * 100) / 100
        var newChange = Math.round(item.change_rate * 100) / 100
        item.selling = newSellig
        item.change_rate = newChange
       });
       let btcs = btc.data
       let eths = eth.data
       let xrps = xrp.data
       let ltcs = ltc.data
       let btcBuy = Math.round(btcs.selling * 100) / 100
       let btcChange = Math.round(btcs.change_rate * 100) / 100
       let btcVolume = btcs.volume
       let ethBuy = Math.round(eths.selling * 100) / 100
       let ethChange = Math.round(eths.change_rate * 100) / 100
       let ethVolume = eths.volume
       let xrpBuy = Math.round(xrps.selling * 100) / 100
       let xrpChange = Math.round(xrps.change_rate * 100) / 100
       let xrpVolume = xrps.volume
       let ltcBuy = Math.round(ltcs.selling * 100) / 100
       let ltcChange = Math.round(ltcs.change_rate * 100) / 100
       let ltcVolume = ltcs.volume
       
       res.render('crypto', { title: 'Money Tracker', btcBuy:btcBuy, btcChange:btcChange,btcVolume:btcVolume,
       ethBuy:ethBuy, ethChange:ethChange,ethVolume:ethVolume ,xrpBuy:xrpBuy, xrpChange:xrpChange,xrpVolume:xrpVolume,
       ltcBuy:ltcBuy, ltcChange:ltcChange,ltcVolume:ltcVolume ,alls:alls });
     }))
})

module.exports = router;
