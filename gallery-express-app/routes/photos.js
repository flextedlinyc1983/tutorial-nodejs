var express = require('express'),
    Photo = require('../models/Photo'),
    path = require('path'),
    join = path.join,
    fs = require('fs');

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

/* GET upload photo form */
router.get('/upload', function (req, res) {
    res.render('photos/upload', {
        title: 'Photo upload'
    });
});

/* submit photo form */
router.post('/upload', function (dir) {
    return function (req, res, next) {
        var img = req.files.photo.image,
            name = req.body.photo.name || img.name,
            path = join(dir, img.name);

        fs.rename(img.path, path, function (err) {
            if (err) return next(err);

            Photo.create({
                name: name,
                path: path
            }, function (err) {
                if (err) return next(err);
                res.redirect('/');
            });
        });
    };
});

module.exports = router;