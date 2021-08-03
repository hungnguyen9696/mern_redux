const express = require ('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

//const normalize = require('normalize-url');

//route GET api/users
// test route
// access Public
router.post('/', 
    //https://express-validator.github.io/docs/custom-error-messages.html
    body('name', 'name is required').not().isEmpty(),
    body('email', 'valid email please').isEmail(), 
    body('password', 'password need to be atleast 6char').isLength({ min: 6 }), 

    async (req,res)=> {
        const errors = validationResult(req);
        console.log(errors.array());
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
            //https://express-validator.github.io/docs/validation-result-api.html (return array of errors)
            
        }

        const {name, email, password} = req.body;

        try{
            //see if user exist
            let user = await User.findOne({email: email});

            if(user) {
                return res.status(400).json({errors: [{msg: "user already exists"}]});
            }

            //get user gravatar (https://github.com/emerleite/node-gravatar)
            const avatar = 
                gravatar.url(email, {
                  s: '200',
                  r: 'pg',
                  d: 'mm'
                })
                
              ;


            user= new User({
                name: name,
                email: email,
                password: password,
                avatar: avatar
            });

            //encrypt password
            const salt = await bcrypt.genSalt(10);
            user.password= await bcrypt.hash(password, salt);
          

            await user.save()
            //return jsonwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            };
            //id = _id, by mongoose abstract, check db
            

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
        
        // User.create({
        //     name: req.body.name,
        //     email: req.body.email,
        // }).then(user => res.json(user));
    }
);


module.exports = router;