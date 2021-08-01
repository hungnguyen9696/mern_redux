const express = require ('express');
const router = express.Router();

//route GET api/users
// test route
// access Public
router.get('/', (req,res)=> {
    res.send('test')
});

exports.module = router;