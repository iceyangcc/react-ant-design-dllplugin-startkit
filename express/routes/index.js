var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('exprss的路由 === / ');
  res.render('index', { title: 'Express' });
});

//router.get('/login', function(req, res, next) {
//  res.render('login', { title: 'Express', company: '人人信' });
//});

module.exports = router;
