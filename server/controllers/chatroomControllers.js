const Chatroom = require("../models/Chatroom");
const Message = require("../models/Message");

exports.creatChatRoom = async (req, res) => {
    const { name } = req.body;
    const nameRegex = /^[A-Za-z\s]+$/;
    try {
        if (!nameRegex.test(name)) {
            return res.status(403).json({ message: "Chatroom name can only contain alphabets" })
        };

        const checkChatRoom = await Chatroom.findOne({ name });
        if (checkChatRoom) {
            return res.status(403).json({ message: "A chatroom with this name already exists!" });
        };

        const chatroom = new Chatroom({ name });
        await chatroom.save();
        console.log(chatroom)

        res.status(200).json({ message: "Chatroom created successfully!" })

    } catch (error) {
        res.status(500).json({ message: "Something went wrong! Please try again later!" })
    }
}

exports.getChatrooms = async (req, res) => {
    try {
        const chatrooms = await Chatroom.find({});
        res.status(200).json(chatrooms);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong! Please try again later!" });
    }
}

exports.getChatMessages = async (req, res) => {
    const chatroomId = req.params.chatroomId;
    try {
        const chatMessages = await Message.find({chatroom: chatroomId});
        console.log(chatMessages)
        res.status(200).json(chatMessages);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong! Please try again later!" });
    }
}