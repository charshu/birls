var express = require('express');
var router = express.Router();
var request = require('request');

/* GET api listing. */
router.get('/', function(req, res, next) {
  res.send('krist a birls /api');
});

router.get('/subscriber/lists', async function(req, res, next) {
  request({
    url: 'http://us16.api.mailchimp.com/3.0/lists/a613a7594c/members',
    headers: {
        'Authorization':'Basic ' + new Buffer('vachirakorn:e000c8fe9cf635c2f4509fce8b333284-us16').toString("base64"),
        'Content-Type': 'application/json'
    }
  },(err,response) => {
    if(err)res.send(err);
    res.send(response.body);
  });
});

router.post('/subscriber/lists', async function(req, res, next) {
  let email = req.body.email;
  request({
    method:"POST",
    url: 'http://us16.api.mailchimp.com/3.0/lists/a613a7594c/members',
    headers: {
        'Authorization':'Basic ' + new Buffer('vachirakorn:e000c8fe9cf635c2f4509fce8b333284-us16').toString("base64"),
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email_address: email,
      status: "subscribed"
    })
  },(err,response) => {
    if(err)res.send(err);
    res.send(response.body);
  });
});

module.exports = router;
