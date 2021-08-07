const express = require ('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const { body, validationResult } = require('express-validator');

//route GET api/profile/me
// desc get current profile
// access Private
router.get('/me', auth, async (req,res) => {
    try{
        const profile = await Profile.findOne({user:req.user.id}).populate('user', ['name', 'avatar']);
        if(!profile) {
            return res.status(400).json({msg: "no profile. please create one"})
        }
        res.json(profile);
        
    }catch(err) {
        console.log(err.message);
        res.status(500).send('server errors');
    }
});


//route POST api/profile/
// desc create/update user profile 
// access Private
router.post('/', [auth, [
    body('status', 'status is required').not().isEmpty(),
    body('skills', 'skills are required').not().isEmpty()
    
]],
    //https://express-validator.github.io/docs/custom-error-messages.html
    
     
    async (req,res)=> {
        const errors = validationResult(req);
        //console.log(errors.array());
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
            //https://express-validator.github.io/docs/validation-result-api.html (return array of errors)
            
        }

        //create profile object
        const {company, website, location, status, skills, bio, githubusername, linkedin} = req.body;
        
        const profileFields = {
            ...req.body,
            user: req.user.id
            
          };

        // if(company) profileFields.company= company;
        // if(website) profileFields.website= website;
        // if(location) profileFields.location= location;
        // if(status) profileFields.status= status;
        // if(bio) profileFields.bio= bio;
        // if(githubusername) profileFields.githubusername= githubusername;
        // if(linkedin) profileFields.linkedin= linkedin;

            //convert string to array
        if(skills){
            profileFields.skills = skills.split(',').map(word => word.trim());
        }
        
        try{
            const filter= {user: req.user.id};

            //https://mongoosejs.com/docs/2.7.x/docs/updating-documents.html
            // {mew: true} => return updated profile otherwise find1andupdate return the old document
            //upsert to add new document if it not exist yet
            let profile = await Profile.findOneAndUpdate(filter, {$set: profileFields}, {new: true, upsert: true});
            //https://mongoosejs.com/docs/tutorials/findoneandupdate.html
            return res.json(profile);
          
        }catch(error) {
            console.log(error.message);
            res.status(500).send('server error')
        }
    }
);


//route GET api/profile/all
// desc get all profiles
// access Public

router.get('/all', async (req, res) => {
    try{
        const allProfile = await Profile.find().populate('user', ['name', 'avatar']);
        if(!allProfile) {
            return res.status(400).json({msg: "no profiles"})
        }
        res.json(allProfile);
        
    }catch(err) {
        console.log(err.message);
        res.status(500).send('server errors');
    }
});


//route GET api/profile/user/:userId
// desc get a specific profile
// access Public

router.get('/user/:userId', async (req, res) => {
    try{
        const profile = await Profile.findOne({user: req.params.userId}).populate('user', ['name', 'avatar']);
        if(!profile) {
            return res.status(400).json({msg: "profile not found"})
        }
        res.json(profile);
        
    }catch(err) {
        console.log(err.message);
        //return 'profile not found' even if userId is not in the right form
        if(err.kind == 'ObjectId') {
            return res.status(400).json({msg: "profile not found"})
        }
        res.status(500).send('server errors');
    }
});

module.exports = router;