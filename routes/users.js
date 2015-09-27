var express = require('express');
var router = express.Router();
var mon = require('../mon');

router.get('/', function(req, res, next) {
    res.json({
        name: "users"
    });
});

router.post('/', function(req, res) {
    //console.log(req.body);
    mon.User.find({}).exec(function(err, result) {
        try {
            mon.User.count({
                email: req.body.email
            }, function(err, count) {
                if (count == 0) {
                    user = new mon.User({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password
                    });

                    user.save(function(err) {
                        if (!err) {
                            console.log("user document created");
                            console.log(user);
                            return;
                        } else {
                            console.log("error at Users creation");
                            return console.log(err);
                        }
                    });
                    res.send(user);
                    res.end();
                } else {
                    res.send("user already exists");
                    res.end();
                }
            });
        } catch (err) {
            console.log(err);
        }
    });
});


module.exports = router;
