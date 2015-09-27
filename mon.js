var mongoose = require('mongoose');

var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://philipxjm:Iamgood2@ds051903.mongolab.com:51903/heroku_1kt7zsvx';

mongoose.connect(uristring, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + uristring);
    }
});

var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    id: String
});

var messageSchema = new Schema({
    from: String,
    to: String,
    communication: [{
        time: String,
        data: String
    }]
});

var User = mongoose.model('User', userSchema);
var Message = mongoose.model('Message', messageSchema);

module.exports = {
    'User' : User,
    'Message' : Message,
    'mongoose' : mongoose
};
