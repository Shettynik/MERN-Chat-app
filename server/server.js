require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jwt-then");
const app = express();

app.use(express.json());
app.use(cors());

const mongoose = require("mongoose");
const User = require("./models/User");
const Message = require("./models/Message");
mongoose.connect(process.env.DATABASE);

mongoose.connection.on("error", (err) => {
    console.log(`Mongoose connection error ${err.message}`)
});

mongoose.connection.once("open", () => {
    console.log("Mongoose connection successful")
});

require("./models/Chatroom");
require("./models/Message");
require("./models/User");

app.use("/user", require("./routes/user"));
app.use("/chatroom", require("./routes/chatroom"));

const server = app.listen(8000, () => {
    console.log("Server is up and running on port 8000")
});

const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

io.use(async (socket, next) => {
    try {
        const token = socket.handshake.query.token;
        const payload = await jwt.verify(token, process.env.SECRET);
        socket.userId = payload.id;
        next()
    } catch (error) {
        console.log(error)
    }
});

io.on("connection", (socket) => {
    console.log(socket.userId);

    socket.on("disconnect", () => {
        console.log("Disconnected")
    });

    socket.on("joinRoom", ({ chatroomId }) => {
        socket.join(chatroomId);
        console.log(`a user joined ${chatroomId}`);
    });

    socket.on("leaveRoom", ({ chatroomId }) => {
        socket.leave(chatroomId);
        console.log(`a user left the ${chatroomId}`)
    });

    socket.on("chatroomMessage", async ({ chatroomId, message }) => {
        const user = await User.findOne({_id: socket.userId});

        const addMessage = new Message({
            user: socket.userId,
            name: user.name,
            chatroom: chatroomId,
            message
        });

        console.log(addMessage)


        if (message.trim().length > 0) {
            io.to(chatroomId).emit("newMessage", {
                message,
                name: user.name,
                userId: socket.userId,
                chatroom: chatroomId
            })
        }

        await addMessage.save();

        
    });
})