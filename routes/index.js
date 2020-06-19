var express = require('express');
var router = express.Router();
const user_Controller = require('../controllers/userController')
const message_Controller = require('../controllers/messageController')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
