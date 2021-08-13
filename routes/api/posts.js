const express = require ('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const { body, validationResult } = require('express-validator');
const Post = require('../../models/Post');



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

//route GET api/posts
// desc get all posts
// access private
router.get('/', auth, async (req,res)=> {
    try {
        const allPosts= await Post.find().sort({date: -1});
        res.json(allPosts);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('server errors')
    }
    
});

//route GET api/posts/:postId
// desc get post by id
// access private
router.get('/:postId', auth, async (req,res)=> {
    try {
        const post= await Post.findById(req.params.postId);
        //console.log(typeof post._id)
       if(!post) {
           return res.status(404).json({msg: "post not found"});
       }
        
        res.json(post);
    } catch (err) {
        console.log(err.message);
        if(err.kind === 'ObjectId') {
            //check type of err if its objectid
            //make sure we get post not found even with invalid objectId
            return res.status(404).json({msg: "post not found"});
        }
        res.status(500).send('server errors')
    }
    
});

//route DELETE api/posts/:postId
// desc delete post by id
// access private
router.delete('/:postId', auth, async (req,res)=> {
    //make sure the user that want to delete the post is the post's owner
    try {
        const post= await Post.findById(req.params.postId);
        //console.log(typeof post.user); //objectId
        //console.log(typeof req.user.id); //string
        if(!post) {
            return res.status(404).json({msg: "post not found"});
        }

        //check user
        if(post.user.toString() !== req.user.id) {
            return res.status(401).json({msg: "you are not authorized to delete the post"});
        }
        
        await post.remove();
        
        res.json({msg: "post deleted"});

    } catch (err) {
        console.log(err.message);
        if(err.kind === 'ObjectId') {
            //check type of err if its objectid
            //make sure we get post not found even with invalid objectId
        return res.status(404).json({msg: "post not found"});
        }
        res.status(500).send('server errors')
    }
    
});

// route PUT api/posts/like/:postId
// desc add like
// access private

//current diff
router.put('/like/:postId', auth, async (req,res)=> {
    try {
        const userLikeId = req.user.id;
        const likedPost = await Post.findById(req.params.postId);
        if(!likedPost) {
            return res.status(404).json({msg: "post not found"});
        }
      
        const arrId= likedPost.likes.map(item => item.user);

        //check if user already liked post
        if(arrId.includes(userLikeId) === false){
            likedPost.likes.push({user: userLikeId});
        } else{
            for(let i=0; i < likedPost.likes.length; i++) {
                if(likedPost.likes[i].user.toString() === req.user.id) {
                    likedPost.likes.splice(i,1);
                }
            }
        }
        await likedPost.save();
        res.json(likedPost.likes);
        //res.json(likedPost.likes.length)
      
    }catch(err) {
        console.log(err.message);
        if(err.kind === 'ObjectId') {
            //check type of err if its objectid
            //make sure we get post not found even with invalid objectId
        return res.status(404).json({msg: "post not found"});
        }
        res.status(500).send('server error')
    }
});

module.exports = router;