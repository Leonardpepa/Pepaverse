const Mongoose = require("mongoose");


const requestSchema = new Mongoose.Schema({
    fromUserId: {
        type: Mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    fromUserName: {
        type: String,
    },
    toUserId: {
        type: Mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    date: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
});

const Request = Mongoose.model("Request", requestSchema);

module.exports = Request;
