const express = require('express');
const router = express.Router();
const Axios = require('axios');

router.get('/getCountries', function(req, res, next) {
  Axios({
    method:'get',
    url:'https://api.remitradar.com/GetCountries',
    headers: {
      'x-api-key': 'a975Glt6595PDYyYpgoaA6mjj8mr0ZLF1yVyVZHt',
      'accept': 'application/json'
    }
  })
  .then((response) => {
    res.json(response.data.Data);
  });
});

router.get('/getCurrencies', function(req, res, next) {
  Axios({
    method:'get',
    url:'https://api.remitradar.com/GetCurrencies',
    headers: {
      'x-api-key': 'a975Glt6595PDYyYpgoaA6mjj8mr0ZLF1yVyVZHt',
      'accept': 'application/json'
    }
  })
  .then((response) => {
    res.json(response.data.Data);
  });
});

router.get('/getDeliveryTypes', function(req, res, next) {
  Axios({
    method:'get',
    url:'https://api.remitradar.com/GetDeliveryTypes',
    headers: {
      'x-api-key': 'a975Glt6595PDYyYpgoaA6mjj8mr0ZLF1yVyVZHt',
      'accept': 'application/json'
    }
  })
  .then((response) => {
    res.json(response.data.Data);
  });
});

router.get('/getCompanies', function(req, res, next) {
  Axios({
    method:'get',
    url:'https://api.remitradar.com/GetCompanies',
    headers: {
      'x-api-key': 'a975Glt6595PDYyYpgoaA6mjj8mr0ZLF1yVyVZHt',
      'accept': 'application/json'
    }
  })
  .then((response) => {
    res.json(response.data.Data);
  });
});

router.get('/getCorridorDetails/:from/:to', function(req, res, next) {
  Axios({
    method:'get',
    url:'https://api.remitradar.com/GetCorridorDetails?CountryFrom=' + req.params.from + '&CountryTo=' + req.params.to,
    headers: {
      'x-api-key': 'a975Glt6595PDYyYpgoaA6mjj8mr0ZLF1yVyVZHt',
      'accept': 'application/json'
    }
  })
  .then((response) => {
    res.json(response.data.Data);
  });
});

router.get('/getQuotes/:from/:to/:cto/:cfrom/:amt', function(req, res, next) {
  Axios({
    method:'get',
    url:'https://api.remitradar.com/GetQuotes?CountryFrom=' + req.params.from + '&CountryTo=' + req.params.to + '&CurrencyTo=' + req.params.cto + '&CurrencyFrom=' + req.params.cfrom + '&AmountFrom=' + req.params.amt,
    headers: {
      'x-api-key': 'a975Glt6595PDYyYpgoaA6mjj8mr0ZLF1yVyVZHt',
      'accept': 'application/json'
    }
  })
  .then((response) => {
    res.json(response.data.Data);
  });
});

module.exports = router;
