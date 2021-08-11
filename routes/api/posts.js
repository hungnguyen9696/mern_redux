const express = require ('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { body, validationResult } = require('express-validator');
const Post = require('../../models/Post');

//route GET api/post
// test route
// access Public
router.get('/', (req,res)=> {
    res.send('test post')
});

// route POST api/posts/
// desc create a post
// access private
router.post('/', [auth, 
    body('text', 'text is required').not().isEmpty()], 

    async(req, res) =>{
        const errors = validationResult(req);
        //console.log(errors.array());
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
            //https://express-validator.github.io/docs/validation-result-api.html (return array of errors)
        }
        try {
           const user= await User.findById(req.user.id).select('-password');

           const newPost = {
               user: req.user.id,
               text: req.body.text,
               name: user.name,
               avatar: user.avatar
           };
           const post = new Post(newPost);
           //console.log(post)
           await post.save();

            res.json(post);
        } catch (err) {
            console.log(err.message);
            res.status(500).send('server errors')
        }
});

module.exports = router;