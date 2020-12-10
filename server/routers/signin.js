const router = require('koa-router')(); //引入router
const controller = require('../controller/c-signin');

router.post('/api/signin',controller.postSignin);

module.exports = router;