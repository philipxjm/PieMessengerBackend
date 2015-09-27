var express = require('express');
var router = express.Router();

/* GET users listing. */
var mon = require('../mon');

router.get('/', function(req, res, next) {
    res.json({
        name: "messages"
    });
});

router.post('/', function(req, res) {
    //console.log(req.body);
    mon.Message.find({}).exec(function(err, result) {
        try {
            mon.Message.count({
                from: req.body.from,
                to: req.body.to
            }, function(err, count) {
                if (count == 0) {
                    message = new mon.Message({
                        from: req.body.from,
                        to: req.body.to,
                        communication: req.body.communication
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
                    res.send("message already exists");
                    res.end();
                    //
                    //Code here to update document
                    //
                }
            });
        } catch (err) {
            console.log(err);
        }
    });
});


module.exports = router;
