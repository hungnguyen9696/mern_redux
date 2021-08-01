const express = require ('express');
const router = express.Router();

//route GET api/auth
// test route
// access Public
router.get('/', (req,res)=> {
    res.send('test auth')
});

module.exports = router;