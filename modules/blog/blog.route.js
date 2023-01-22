const router = require('express').Router();
const blogController = require('./controller/blog.controller');
const auth = require('../../middleware/auth');

router.post('/',auth(),blogController.addBlog);
router.get('/',blogController.blogs);
router.get('/user',auth(),blogController.userBlogs);

module.exports = router;