const mongoose = require("mongoose");

const ChatroomSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    }
});

const Chatroom = mongoose.model("Chatroom", ChatroomSchema);

module.exports = Chatroom;