import axios from 'axios';
import React, { useEffect } from 'react';
import { withRouter } from 'react-router';

const Chatroom = ({ match, socket }) => {
    const chatroomId = match.params.id;
    const [messages, setMessages] = React.useState([]);
    const messageRef = React.useRef();

    const sendMessage = (e) => {
        // e.preventDefault();
        if (socket) {
            socket.emit("chatroomMessage", {
                chatroomId,
                message: messageRef.current.value
            });
        }
    }

    const getChatMessages = async () => {
        await axios.get(`http://localhost:8000/chatroom/messages/${chatroomId}`, {
            headers:{
                Authorization: "Bearer "+ localStorage.getItem("CC_token")
            }
        }).then(response => {
            console.log(response)
            setMessages(response.data);
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getChatMessages();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (socket) {
            socket.emit("joinRoom", { chatroomId });

            socket.on("newMessage", (message) => {
                setMessages([...messages, message]);
            })
        }

        return () => {
            if (socket) {
                socket.emit("leaveRoom", { chatroomId });
            }
        }

        // eslint-disable-next-line
    }, [])

    return (
        <div className="chatroomPage">
            <div className="chatroomSection">
                <div className="cardHeader">Chatroom Name</div>
                <div className="chatroomContent">
                    <div className="message">
                        <span className="otherMessage">Kit: </span>Helloo Guys
                    </div>
                    {
                        messages && messages.map((message) => (
                            <div className="message">
                                <span className="ownMessage">{message.name} : </span>{message.message}
                            </div>
                        ))
                    }
                </div>
                <div className="chatroomActions">
                    <div>
                        <input type="text" placeholder="Say Something!" name="message" ref={messageRef} />
                    </div>
                    <div>
                        <button className="join" onClick={(e) => sendMessage(e)}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Chatroom);