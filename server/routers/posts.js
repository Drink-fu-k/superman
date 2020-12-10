const router = require('koa-router')(); //引入router
const controller = require('../controller/c-posts');

router.post('/api/getPosts',controller.getPosts);
router.post('/api/postContent',controller.postContent);

module.exports = router;