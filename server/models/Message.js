const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
    chatroom:{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Chatroom is req"],
        ref: "Chatroom"
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "User is required"],
        ref:"User"
    },
    name:{
        type: String,
        required: [true, "Name is required"],
    },
    message:{
        type: String,
        required:[true, "Message is required"]
    }
});

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;