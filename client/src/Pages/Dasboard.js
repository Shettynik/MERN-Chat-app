import axios from 'axios';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

const Dasboard = () => {
    const [chatrooms, setChatRooms] = React.useState([]);
    const chatRoomRef = React.useRef();

    const createChatRoom = async () => {
        await axios.post("http://localhost:8000/chatroom", {name: chatRoomRef.current.value}).then(() => {
            console.log("Chatroom created successfully!")
        }).catch(err => {
            console.log(err)
        })
    }

    const getChatooms = async () => {
        await axios.get("http://localhost:8000/chatroom", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("CC_token")
            }
        }).then((response) => {
            console.log(response.data);
            setChatRooms(response.data)
        }).catch((err) => {
            setTimeout(getChatooms, 3000);
        })
    }

    useEffect(() => {
        getChatooms();
        // eslint-disable-next-line
    }, [])

    return (
        <div className="card">
            <div className="cardHeader">ChatRoom Name</div>
            <div className="cardBody">
                <div className="inputGroup">
                    <label htmlFor="chatroomName">Chatroom Name</label>
                    <input type="text" required="true" name="chatroomName" id="chatroomName" ref={chatRoomRef}/>
                </div>
                <button onClick={createChatRoom}>Create Chatroom</button>
                <div className="chatrooms">
                    {chatrooms && chatrooms.map(chatroom => (
                        <div key={chatroom._id} className="chatroom">
                            <div>{chatroom.name}</div>
                            <Link to={`/chatroom/${chatroom._id}`}>
                                <div className="join">Join</div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dasboard
