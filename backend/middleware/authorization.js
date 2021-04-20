const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req,res,next) => {
    try {

        const jwtToken = req.header('token');
        console.log(jwtToken);
        
        if(!jwtToken){
            res.status(403).json("Not Authorized");
        }

        const payload = jwt.verify(jwtToken,process.env.jwtSecretKey);

        req.user = payload.user;
        next();
    }catch(err){
        console.error(err.message);
        res.status(403).json("Not Authorized");
    }
}