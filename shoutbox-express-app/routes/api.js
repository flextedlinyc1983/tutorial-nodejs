var auth = require('basic-auth');

var User = require('../lib/user'),
    Entry = require('../lib/entry');

exports.aut = auth(User.authenticate());

exports.user = function (req, res, next) {
    User.get(req.params.id, function (err, user) {
        if (err) return next(err);
        if (!user.id) return res.send(404);
        res.json.(user);
    });
};

exports.entries = function (req, res, next) {
    var page = req.page;
    Entry.getRange(page.form, page.to, function (err, entries) {
        if (err) return next(err);
        res.json(entries);
    })
};
