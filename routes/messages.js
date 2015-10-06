var express = require('express');
var router = express.Router();

/* GET users listing. */
var mon = require('../mon');

router.get('/', function(req, res, next) {
    mon.Message.find({}, function(err, result) {
        res.send(result);
    })
});

router.post('/pull', function(req, res) {
    //get all messages of one person to another
    mon.Message.findOne({
        from: req.body.from,
        to: req.body.to
    }, function(err, doc) {
        if (err) return handleError(err);
        if (doc) {
            res.send(doc);
            console.log('found doc :' + doc);
        } else {
            res.json({});
            console.log('nothing found');
        }
    })
});

router.post('/push', function(req, res) {
    mon.Message.find({}).exec(function(err, result) {
        try {
            mon.Message.count({
                from: req.body.from,
                to: req.body.to
            }, function(err, count) {
                if (count == 0) {
                    //if this particular user to user chat doesn't exists, make new
                    message = new mon.Message({
                        from: req.body.from,
                        to: req.body.to,
                        communication: req.body.newCommunication
                    });

                    message.save(function(err) {
                        if (!err) {
                            console.log("message document created");
                            console.log(message);
                            return;
                        } else {
                            console.log("error at message creation");
                            return console.log(err);
                        }
                    });
                    res.send(message);
                    res.end();
                } else {
                    //if this chat already exists, add the newCommunication to existing
                    console.log('document already exists, adding communication anew');
                    mon.Message.findOneAndUpdate({
                        from: req.body.from,
                        to: req.body.to
                    }, {
                        $push: {
                            "communication": req.body.newCommunication
                        }
                    }, {
                        upsert: true
                    }, function(err, doc) {
                        if (err) return res.send(500, {
                            error: err
                        });
                        res.json({
                            'status' : true
                        })
                        res.end();
                    });
                }
            });
        } catch (err) {
            console.log(err);
        }
    });
});


module.exports = router;
