var express = require('express');
var router = express.Router();
var mon = require('../mon');

router.get('/', function(req, res, next) {
    mon.User.find({}, function(err, result) {
        //res.writeHead(200, {'Content-Type' : 'application/json'});
        var jobj = [];
        result.forEach(function(record) {
            jobj.push({'name' : record.name})
        })
        res.json(jobj);
    });
});

router.post('/login', function(req, res) {
    mon.User.findOne({
        name: req.body.name
    }, function(err, result) {
        try {
            if (result) {
                if (result.password == req.body.password) {
                    res.json({
                        name: req.body.name,
                        permission: true
                    })
                } else {
                    res.json({
                        name: req.body.name,
                        permission: false
                    })
                }
            } else {
                res.json({
                    name: req.body.name,
                    permission: false
                })
            }
        } catch (err) {
            console.log(err);
        }
    });
})

router.post('/register', function(req, res) {
    //console.log(req.body);
    mon.User.find({}).exec(function(err, result) {
        try {
            mon.User.count({
                name: req.body.name
            }, function(err, count) {
                if (count == 0) {
                    user = new mon.User({
                        name: req.body.name,
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
                    res.json({
                        name: req.body.name,
                        registered: false
                    })
                    res.end();
                } else {
                    res.json({
                        name: req.body.name,
                        registered: true
                    })
                    res.end();
                }
            });
        } catch (err) {
            console.log(err);
        }
    });
});


module.exports = router;
