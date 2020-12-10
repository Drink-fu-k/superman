const router = require('koa-router')(); //引入router
const controller = require('../controller/c-register');

router.post('/api/register',controller.postRegister);

module.exports = router;