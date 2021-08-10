const express = require ('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
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
            // {new: true} => return updated profile otherwise find1andupdate return the old document
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

// route DELETE api/profile/
// desc delete a user and related(profile, posts)
// access private

router.delete('/', auth, async(req, res) =>{
    try {
        //delete posts


        //delete profile
        await Profile.findOneAndRemove({user: req.user.id});

        //delete user
        await User.findOneAndRemove({_id: req.user.id});

        res.json({msg: 'user deleted successfully'})
    } catch (err) {
        console.log(err.message);
        res.status(500).send('server errors')
    }
});

// route PUT api/profile/experience
// desc add profile experience
// access private
router.put('/experience', [auth, [
    body('title', 'title is required').not().isEmpty(),
    body('company', 'company is required').not().isEmpty(),
    body('from', 'From date is required').not().isEmpty()
    //instead of isDate() because in frontend use a date form, user dont have to type in
]], 
async (req,res)=> {
    const errors = validationResult(req);
    //console.log(errors.array());
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        //https://express-validator.github.io/docs/validation-result-api.html (return array of errors)
        
    }

    const expFields = {
        ...req.body,
    };

    //console.log(expFields)
    
    try{
        const filter= {user: req.user.id};
       
        //const profile = await Profile.findOneAndUpdate(filter, {$set: {experience: expFields }}, {new: true, upsert: true});
        //above meethod replace old exp with new exp -> failed if want to add more exp

        const profile = await Profile.findOne(filter);
        profile.experience.unshift(expFields);
        await profile.save();
        res.json(profile)
      
    }catch(error) {
        console.log(error.message);
        res.status(500).send('server error')
    }


});

// route DELETE api/profile/experience
// desc delete profile experience
// access private

router.delete('/experience/:expId', auth, async(req, res) =>{
    try {
        const profile = await Profile.findOne({user: req.user.id});
        //console.log(profile.experience[0]._id);
        //console.log(profile.experience[0].id); 

        //find the exp element with correct _id
        for(let i=0; i < profile.experience.length; i++) {
            if(profile.experience[i].id === req.params.expId) {
                profile.experience.splice(i,1);
            }
        }
        // profile.experience[i]._id not work while .id works. why???
        
        
        await profile.save();

        res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('server errors')
    }
});

// route PUT api/profile/education
// desc add profile education
// access private
router.put('/education', [auth, [
    body('school', 'school is required').not().isEmpty(),
    body('degree', 'degree is required').not().isEmpty(),
    body('from', 'From date is required').not().isEmpty()
    //instead of isDate() because in frontend use a date form, user dont have to type in
]], 
async (req,res)=> {
    const errors = validationResult(req);
    //console.log(errors.array());
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        //https://express-validator.github.io/docs/validation-result-api.html (return array of errors)
        
    }

    const educationFields = {
        ...req.body,
    };

    //console.log(expFields)
    
    try{
        const filter= {user: req.user.id};

        const profile = await Profile.findOne(filter);
        profile.education.unshift(educationFields);
        await profile.save();
        res.json(profile)
      
    }catch(error) {
        console.log(error.message);
        res.status(500).send('server error')
    }

});

// route DELETE api/profile/education
// desc delete profile education
// access private

router.delete('/education/:eduId', auth, async(req, res) =>{
    try {
        const profile = await Profile.findOne({user: req.user.id});

        //find the edu element with correct _id
        for(let i=0; i < profile.education.length; i++) {
            if(profile.education[i].id === req.params.eduId) {
                profile.education.splice(i,1);
            }
        }
    
        await profile.save();

        res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('server errors')
    }
});

// route GET api/profile/github/:username
// desc get github profile 
// access public
router.get('/github/:username', async(req,res)=> {
    try {
        
    } catch (error) {
        
    }
})

module.exports = router;

