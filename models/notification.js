const mongoose = require("mongoose");


const notificationSchema = new mongoose.Schema({
    fromUserId: {
        type: String,
        required,
    },
    toUserId: {
        type: String,
        required,
    },
    date: {
        type: date,
        default: Date.now
    },
    type: {
        type: String,
        required,
    },
    status: {
        type: String,
        required,
    },

});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
