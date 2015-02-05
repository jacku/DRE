var express = require('express');
var app = module.exports = express();
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var passportLocalMongoose = require('passport-local-mongoose');
// var flash = require('connect-flash');
var record = require('blue-button-record');
// var moment = require('moment');
//TODO clean up connect flash stuff


var databaseServer = process.env.DB || 'localhost:27017';
console.log("login.js DB: ", 'mongodb://' + databaseServer + '/dre');

//var connection = mongoose.connect('mongodb://'+app.get("db_url")+'/'+app.get("db_name"));
var connection = mongoose.createConnection('mongodb://' + databaseServer + '/dre');

var Schema = mongoose.Schema;


//define user schema
function defineUserSchema() {
    userSchema = new Schema({
        username: String,
        password: String,
        email: String,
        firstName: String,
        middleName: String,
        lastName: String,
        dob: String,
        gender: String,
    });
    userSchema.plugin(passportLocalMongoose);
    User = connection.model('User', userSchema);
    configurePassport();

/**
* Virtuals -- add setPassword method to UserSchema
*/
    UserSchema.virtual('password').set(function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    }).get(function() {
        return this._password;
    });

}



// passport config
function configurePassport() {
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
}


defineUserSchema();


// register new users
function newAccount(inputBody, done) {
    var inputUsername = inputBody.username;
    var inputPassword = inputBody.password;
    var account = new User({
        username: inputUsername
    });
    User.register(account, inputPassword, function(err, user) {
        if (err) {
            done(err);
        } else {
            done(null, user);
        }
    });
}

module.exports.newAccount = newAccount;

function changePassword(req, done) {
    var password = req.password;
    var user = req.user;
    user.authenticate(password, function(err) {
        if (err) {
            // incorrect password
        } else {
            user.set(password, function(err) {
                if (err) {
                    done(err)
                } else {
                    user.authenticate();
                }         
            });
        }
    });
}

function checkAuth(req, res, next) {
    //console.log("is Authenticated: ", req.isAuthenticated());
    if (req.isAuthenticated()) {
        return next();
    }
    //console.log("no auth");
    res.status(401).end();
}

module.exports.checkAuth = checkAuth;

function saveRegProfile(inputInfo) {
    // var inputDOB = moment(inputInfo.dob).format();
    var inputFormat = {
        "name": {
            "middle": [inputInfo.middleName],
            "last": inputInfo.lastName,
            "first": inputInfo.firstName
        },
        "dob":
            {
                "date": inputInfo.dob,
                "precision": "day"
            },
        "gender": inputInfo.gender,
        "email": [{
            "email": inputInfo.email,
            "type": "primary"
        }]
    };

    record.saveSection('demographics', inputInfo.username, inputFormat, function(err) {
        if (err) {
            throw err;
        } else {
            console.log(inputFormat.dob);
            // console.log('registration info saved to profile', inputFormat);
        }
    })
}


app.post('/api/v1/register', function(req, res) {
    //console.log("register API:", req.body);
    newAccount(req.body, function(err, account) {
        if (err) {
            res.status(400).send(err);
        }
        else {
            //console.log(account);
            record.saveEvent('initAccount', req.body.username, req.ip, null, function(err) {
                if (err) {
                    res.status(400).send('Event error ' + err);
                } else {
                    // save registration info to profile/demographics section
                    saveRegProfile(req.body);
                    res.status(200).end();

                }
            });

        }
    });



});


// check if username already exists
app.get('/api/v1/users', function(req, res) {
    User.find(function(error, users) {
        if (users) {
            // console.log(users);
            res.send(users);
        } else {
            // res.send(false);
        }
    });
});


app.post('/api/v1/login',
    passport.authenticate('local'),
    function(req, res) {
        record.saveEvent('loggedIn', req.user.username, req.ip, null, function(err) {
            if (err) {
                res.status(400).send('Event error ' + err);
            } else {
                res.status(200).end();
            }
        });
    });

//logout
app.post('/api/v1/logout', checkAuth, function(req, res) {
    record.saveEvent('loggedOut', req.user.username, req.ip, null, function(err) {
        if (err) {
            req.logout();
            res.status(400).send('Event error ' + err);
        } else {
            req.logout();
            res.status(200).end();

        }
    });
});
//logout
app.get('/api/v1/logout', checkAuth, function(req, res) {
    record.saveEvent('loggedOut', req.user.username, req.ip, null, function(err) {
        if (err) {
            req.logout();
            res.status(400).send('Event error ' + err);
        } else {
            req.logout();
            res.status(200).end();
        }
    });
});

// reset password
app.post('/api/v1/reset', function(req, res) {
    changePassword(req, function(err) {
        if (err) {
            res.status(400).send('Could not reset password' + err);
        } else {
            res.status(200).end();
        }
    });
)};

