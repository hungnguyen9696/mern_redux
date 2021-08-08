const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports= async function(req,res,next) {
    //get token from header
    const token = req.header('x-auth-token');

    //check if token valid
    if(!token) {
        return res.status(401).json({msg:'token not available. authorization denied'})
    }

    //verify token
    try{
        const decoded = jwt.verify(token, config.get('jwtKey'));

        const user = await User.findById(decoded.user.id);
        if (!user) {
        return res.status(401).json({ msg: 'Token is not valid' });
        }

        req.user= decoded.user;
        next();

    }catch(err) {
        return res.status(401).json({msg: 'token not valid'})
    }
    
};