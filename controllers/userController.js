const User = require('../models/userModel');
const OtpModel = require('../models/mobileOtp');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const mailer = require('../helpers/mailer');
const otpGenerator = require('otp-generator');
const twilio = require('twilio'); 

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;

// const twilioClient = new twilio(accountSid, authToken);
// const sendOtp = async (req, res) => {
//   try {
//     const {phoneNumber} = req.body;
//     const otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
//     const cDate = new Date();
    
//     await OtpModel.findOneAndUpdate({ phoneNumber },
//       {otp,otpExpiration : new Date(cDate.getTime())},
//       {upsert : true, new : true, setDefaultsOnInsert : true}
//     )

//     await twilioClient.messages.create({
//       body : `Your otp is ${otp}`,
//       to : phoneNumber,
//       from : process.env.TWILIO_PHONE_NUMBER
//     })

//     return res.status(200).json({
//       success : true,
//       msg : 'otp sent successfully!'
//     })
//   } catch (error) {
//     return res.status(400).json({
//       success : false,
//       msg : error.message
//     })
//   }
// }

const userRegister = async (req, res) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const twilioClient = new twilio(accountSid, authToken);

console.log(twilioClient,"twilioCLIENT")

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: 'Errors',
        error: errors.array(),
      });
    }
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    const isExists =
     await User.findOne({ email });
    if (isExists) {
      return res.status(400).json({
        success: false,
        msg: 'Email Already Exists!',
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    var otp = Math.floor(100000 + Math.random()*900000)


    const user = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashPassword,
      sendOtp: otp.toString(),
    });
    const userData = await user.save();
    console.log(userData._id)
    const msg = `your otp is ${otp}`;
    
    mailer.sendMail(email,'Mail verification',msg);

    // const {phoneNumber} = req.body;
    const mobileOtp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
    const cDate = new Date();
    
    await OtpModel.findOneAndUpdate({ phoneNumber },
      {mobileOtp,otpExpiration : new Date(cDate.getTime())},
      {upsert : true, new : true, setDefaultsOnInsert : true}
    )

    await twilioClient.messages.create({
      body : `Your otp is ${mobileOtp}`,
      to : phoneNumber,
      from : process.env.TWILIO_PHONE_NUMBER
    })
 

    return res.status(200).json({
      success: true,
      msg: 'Registered Successfully',
      user: userData,
    });
+9
  } catch (error) {
    return res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password, resendOtp } = req.body; 

    if (!email || (!password && !resendOtp)) {
      return res.status(400).json({
        success: false,
        msg: 'Email and either Password or resendOtp are required',
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: 'User not found',
      });
    }

    if (resendOtp) {
      const otp = Math.floor(100000 + Math.random() * 900000);
      await User.findByIdAndUpdate(user._id, { sendOtp: otp.toString() });

      const msg = `Your verification OTP is: ${otp}`;
      await mailer.sendMail(email, 'Your OTP Code', msg);

      return res.status(200).json({
        success: true,
        msg: 'Login successful',
        user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email  
       },
      msg: 'Login successful and OTP sent to your email address',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        msg: 'Invalid Password',
      });
    }

    return res.status(200).json({
      success: true,
      msg: 'Login successful',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });

   
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: 'Server error',
      error: error.message,
    });
  } 
};
 

 

const verifyOtp = async (req, res) => {
  const { email, password,otp } = req.body;

  if (!email || !password || !otp) {
    return res.status(400).json({ 
      success: false, 
      msg: 'Email,Password and Otp are required' 
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        msg: 'User not found' 
      });
    }

    if (user.sendOtp === otp) {
      await User.findByIdAndUpdate(user._id, { sendOtp: null });

      //Generate jwt token
      const token = jwt.sign({id: user._id,email:user.email}, process.env.JWT_SECRET, 
        {expiresIn : "1h"}
      );

      return res.status(200).json({
        success: true,
        msg: 'OTP verified, email confirmed!',
        token : token
      });
    } else {
      return res.status(400).json({
        success: false,
        msg: 'Invalid OTP',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: 'Server error',
      error: error.message,
    });
  }
};

module.exports = {
  userRegister,
  verifyOtp,
  loginUser,
 
};