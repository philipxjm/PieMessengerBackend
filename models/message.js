var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    from: String,
    to: String,
    communication: [{
        time: String,
        data: String
    }]
});

module.exports = mongoose.model('Message', messageSchema);
