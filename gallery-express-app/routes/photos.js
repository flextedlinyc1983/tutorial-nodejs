var express = require('express');
var router = express.Router();

var photos = [];

photos.push({
    name: 'Node.js Logo',
    path: 'http://nodejs.org/images/logos/nodejs-green.png'
}, {
    name: 'Ryan Speaking',
    path: 'http://nodejs.org/images/ryan-speaker.jpg'
});

/* GET photos listing. */
router.get('/', function (req, res) {
    res.render('photos', {
        photos: photos
    })
});

module.exports = router;