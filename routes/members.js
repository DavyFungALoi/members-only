const express = require('express');
const router = express.Router();
const user_Controller = require('../controllers/userController')

router.get('/', user_Controller.index)

router.get('/signup', user_Controller.signup_form)

router.post('/signup', user_Controller.signup_form_create);




module.exports = router;