const express = require('express');
const router = express.Router();
const user_Controller = require('../controllers/userController')
const message_Controller = require('../controllers/messageController')

// Users

router.get('/', user_Controller.index)

router.get('/memberlist', user_Controller.members_list_display)

router.get('/signup', user_Controller.signup_form)

router.post('/signup', user_Controller.signup_form_create);

router.get('/signin', user_Controller.sign_in_display)


router.get('/user/:id', user_Controller.membership_detail_page)

router.post('/user/:id', user_Controller.membership_detail_page_membership_status_request)

router.get('/user/:id/adminrequest', user_Controller.membership_admin_request_page)

router.post('/user/:id/adminrequest', user_Controller.membership_admin_request_page_status)




//Messages

router.get('/message/user/:id', message_Controller.message_form_display)

router.post('/message/user/:id', message_Controller.message_create_post)

//messageOverview
router.get('/message/overview/', user_Controller.message_overview_display)

router.get('/message/messagelist/', message_Controller.index_messages)

router.get('/message/:id/', message_Controller.messages_detail_page)

router.post('/message/:id/', message_Controller.delete_message)


module.exports = router;