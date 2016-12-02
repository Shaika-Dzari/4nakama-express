var router = require('express').Router();

// split up route handling
router.use('/categories', require('./category/routes.js'));
router.use('/messages', require('./message/routes.js'));
router.use('/sec', require('./account/routes.js'));
router.use('/comments', require('./comment/routes.js'));
router.use('/files', require('./file/routes.js'));
router.use('/statistics', require('./statistics/routes.js'));

module.exports = router;