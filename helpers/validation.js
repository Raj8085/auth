// const {check} = require('express-validator')

// exports.registerValidator = [
//     check('name','Name is required').not().isEmpty(),
//     check('email','Please include a valid email').isEmail().normalizeEmail({
//         gmail_remove_dots:true
//     }),
//     check('mobile','it should be contains 10 digits').isLength({
//         min:10,
//         max:10
//     }),
//     check('password','it should be contains more than 6 characters,one uppercase,lowercase,number and special characters').isStrongPassword({
//         minLength:6,
//         minUppercase:1,
//         minLowercase:1,
//         minNumbers:1
//     }),
//     check('image').custom( (value,{req})=>{
//         if(req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png'){
//             return true;
//         }
//         else{
//             return false
//         }
//     }).withMessage("Please upload image with jpeg or png")
// ];


const { check } = require('express-validator');

exports.registerValidator = [
  check('firstName', 'firstName is required').not().isEmpty(),
  check('lastName', 'lastName is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail().normalizeEmail({
    gmail_remove_dots: true,
  }),
  check('phoneNumber', 'It should contain 10 digits').isLength({ min: 10, max: 10 }),
  check('password', 'It should contain more than 6 characters, one uppercase, lowercase, number, and special character').isStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
  }),
  
];  