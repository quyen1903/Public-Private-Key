const express = require('express');
const { asyncHandler} = require('../helper/asyncHandler')
const AccessController = require('../controller/accessController');

const router = express.Router();

router.post('/login', asyncHandler(AccessController.logIn));
router.post('/register', asyncHandler(AccessController.register));

module.exports = router;