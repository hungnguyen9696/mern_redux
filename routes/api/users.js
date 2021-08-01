const express = require ('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require ('../../models/User');

//route GET api/users
// test route
// access Public
router.post('/', 
    //https://express-validator.github.io/docs/custom-error-messages.html
    body('name', 'name is required').not().isEmpty(),
    body('email', 'valid email please').isEmail(), 
    body('password', 'password need to be atleast 6char').isLength({ min: 6 }), 

    (req,res)=> {
        const errors = validationResult(req);
        console.log(errors.array());
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
            //https://express-validator.github.io/docs/validation-result-api.html (return array of errors)
            
        }
        res.send("success");
        // User.create({
        //     name: req.body.name,
        //     email: req.body.email,
        // }).then(user => res.json(user));
    }
);


module.exports = router;