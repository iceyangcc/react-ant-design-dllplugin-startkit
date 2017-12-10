/**
 * Created by yangbin on 2017/2/23.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Express' ,company: '人人信用管理有限公司'});
});

module.exports = router;