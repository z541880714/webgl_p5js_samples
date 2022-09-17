var express = require('express');
var router = express.Router();
var path = require('path')

router.get('/', (req, res, next) => {
    let options = {
        root: path.join(__dirname, '/../public'),
    }

    res.sendFile('/user2.html', options, (err) => {
        if (err) {
            next(err)
        } else {
            console.log('send file success!!')
        }
    })
})

module.exports = router