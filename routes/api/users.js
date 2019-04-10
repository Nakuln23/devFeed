const express = require('express');
const router = express.Router()

router.get('/test', (req,res) => {
    res.send("Users are working")
})

module.exports = router;