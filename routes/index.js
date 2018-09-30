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
      let usds = usd.data
      let eurs = eur.data
      let gbps = gbp.data
      let usdBuy = Math.round(usds.selling * 100) / 100
      let usdChange =  Math.round(usds.change_rate * 100) / 100
      let eurBuy = Math.round(eurs.selling * 100) / 100
      let eurChange =  Math.round(eurs.change_rate * 100) / 100
      let gbpBuy = Math.round(gbps.selling * 100) / 100
      let gbpChange =  Math.round(gbps.change_rate * 100) / 100
      res.render('index', { title: 'Money Tracker', usdBuy: usdBuy, usdChange: usdChange ,eurBuy: eurBuy, eurChange: eurChange, gbpBuy: gbpBuy, gbpChange: gbpChange });
    }))
});

module.exports = router;
