const express = require('express');
// const router = express();
// const router = express.Router(); 
const router = express.Router()
const path = require('path');
const multer = require('multer');
const { userRegister, verifyOtp, loginUser } = require('../controllers/userController');
const { registerValidator } = require('../helpers/validation');

router.use(express.json());

router.post('/register',registerValidator, userRegister);
router.post('/verify-otp',verifyOtp);
router.post('/login',loginUser);
module.exports = router;