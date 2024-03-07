const express = require('express');
const Views = require('../controller/viewController');

const router = express.Router();

router.get('/', Views.home);
router.get('/edit', Views.edit);
router.get('/login', Views.login);
router.get('/register', Views.register);
router.get('/secrets', Views.secrets);
router.get('/submit', Views.submit);


module.exports = router;