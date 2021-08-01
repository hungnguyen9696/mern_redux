const express = require ('express');
const router = express.Router();

//route GET api/post
// test route
// access Public
router.get('/', (req,res)=> {
    res.send('test post')
});

module.exports = router;