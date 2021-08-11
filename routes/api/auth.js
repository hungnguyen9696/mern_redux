const express = require ('express');
const router = express.Router();
const auth= require('../../middleware/auth');
const User = require('../../models/User');
const config = require('config');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

//route GET api/auth
// test route
// access Public
router.get('/', auth, async (req,res)=> {
    try{
        const user= await User.findById(req.user.id).select('-password');
        return res.json(user);
    }catch (err) {
        console.log(err.message);
        res.status(500).json('Server errors')
    } 
});


//route POST api/auth
// desc  authenticate user and get token
// access Public
router.post('/', 
    //https://express-validator.github.io/docs/custom-error-messages.html
    
    body('email', 'valid email please').isEmail(), 
    body('password', 'password is required').exists(), 

    async (req,res)=> {
        const errors = validationResult(req);
        console.log(errors.array());
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
            //https://express-validator.github.io/docs/validation-result-api.html (return array of errors)
            
        }

        const { email, password} = req.body;

        try{
            //see if user exist
            let user = await User.findOne({email: email});

            if(!user) {
                return res.status(400).json({errors: [{msg: "Please provide a valid email and password"}]});
            }

            //check password
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) {
                return res.status(400).json({errors: [{msg: "Please provide a valid email and password"}]});
            }    

            //return jsonwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            };
            //2nd id = _id, by mongoose abstract, check db
            

            jwt.sign(payload, config.get("jwtKey"), {expiresIn: 360000}, (err, token)=> {
                //if (err) throw err;
                if(err) {
                    console.log(err.message)
                };
                res.json({token: token})
            });

          
        }catch(error) {
            console.log(error.message);
            res.status(500).send('server error')
        }
    }
);

module.exports = router;