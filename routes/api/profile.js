const express = require('express');
const router = express.Router()

router.get('/test', (req,res) => {
    res.send("Profiles are working")
})

module.exports = router;