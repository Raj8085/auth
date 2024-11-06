const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken =(req,res,next)=>{
    const Token = req.headers.authoriztion?.split(" ")[1];
     if(!Token){
        return res.status(401).json({
            success : false,
            msg : "Access denied: No Token Provided"
        })
     }
     try {
        const decoded = jwt.verify(Token,JWT_SECRET);
        req.user = decoded;
        next();
     } catch (error) {
        return res.status(401).json({
            success: false,
            msg: 'Invalid Token',
          });
     }
}

module.exports = verifyToken;