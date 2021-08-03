const config = require('config');
const jwt = require('jsonwebtoken');

module.exports= function(req,res,next) {
    //get token from header
    const token = req.header('x-auth-token');

    //check if token valid
    if(!token) {
        return res.status(401).json({msg:'token not available. authorization denied'})
    }

    //verify token
    try{
        const decoded = jwt.verify(token, config.get('jwtKey'));
        req.user= decoded.user;
        next();

    }catch(err) {
        return res.status(401).json({msg: 'token not valid'})
    }
    
};