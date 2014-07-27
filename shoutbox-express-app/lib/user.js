var redis = require('redis'),
    bcrypt = require('bcrypt-nodejs');

var db = redis.createClient();

module.exports = function (req, res, next) {
    if (req.remoteUser) {
        res.locals.user = req.remoteUser;
    }

    var uid = req.session.uid;

    if (!uid) return next();

    User.get(uid, function (err, user) {
        if (err) return next(err);
        req.user = res.locals.user = user;
        next();
    })
};

function User(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) this[key] = obj[key];
    }
}

User.prototype.save = function (fn) {
    if (this.id) {
        this.update(fn);// user already exists.
    } else {
        var user = this;
        db.incr('user:ids', function (err, id) {
            if (err) return fn(err);
            user.id = id;
            user.hashPassword(function (err) {
                if (err) return fn(err);
                user.update(fn);
            });
        });
    }
};

User.prototype.update = function (fn) {
    var user = this;
    var id = user.id;
    db.set('user:id:' + user.name, id, function (err) {
        if (err) return fn(err);
        db.hmset('user:' + id, user, function (err) {
            fn(err);
        });
    });
};

User.prototype.hashPassword = function (fn) {
    var user = this;
    bcrypt.genSalt(12, function (err, salt) {
        if (err) return fn(err);
        user.salt = salt;
        bcrypt.hash(user.pass, salt, null, function (err, hash) {
            if (err) return fn(err);
            user.pass = hash;
            fn();
        });
    });
};

/* Look up user ID by name. */
User.getByName = function (name, fn) {
    User.getId(name, function (err, id) {
        if (err) return fn(err);
        User.get(id, fn);
    });
};

/* Get ID indexed by name */
User.getId = function (name, fn) {
    db.get('user:id:' + name, fn);
};

User.get = function (id, fn) {
    db.hgetall('user:' + id, function (err, fn) {
        if (err) return err;
        fn(null, new User(user));
    });
};

User.authenticate = function (name, pass, fn) {
    User.getByName(name, function (err, fn) {
        if (err) throw fn(err);
        if (!user.id) return fn();
        bcrypt.hash(pass, user.salt, null, function (err, hash) {
            if (err) return fn(err);
            if (hash === user.pass) return fn(null, user);
            fn();
        });
    });
};

User.prototype.toJSON = function () {
    return {
        id: this.id,
        name: this.name
    }
};