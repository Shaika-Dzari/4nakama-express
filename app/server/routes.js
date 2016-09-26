var router = require('express').Router();

// split up route handling
router.use('/tags', require('./tag/routes.js'));
router.use('/categories', require('./category/routes.js'));


module.exports = router;