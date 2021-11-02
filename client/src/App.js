import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Chatroom from './Pages/Chatroom';
import Dasboard from './Pages/Dasboard';
import Index from './Pages/Index';
import Login from './Pages/Login';
import Register from './Pages/Register';
import io from 'socket.io-client';

const App = () => {
  const [socket ,setSocket] = React.useState(null);

  const setUpSocket = async () => {
    if(localStorage.getItem("CC_token")){
      const token = localStorage.getItem("CC_token");
      if(token.length > 0 && !socket){
        const newSocket = io("http://localhost:8000", {
          query: {
            token: token
          }
        });
  
        newSocket.on("disconnect", () => {
          setSocket(null);
          setTimeout(setUpSocket, 3000)
        });
  
        newSocket.on("connect", () => {
          console.log("Socket connected")
        });
  
        setSocket(newSocket);
      }

    }
  }

  useEffect(() => {
    setUpSocket();
    // eslint-disable-next-line
  }, [])

  return (
    <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Index} />
      <Route path="/login" exact render={() => <Login setUpSocket={setUpSocket} />} />
      <Route path="/register" exact component={Register} />
      <Route path="/dashboard" exact render={() => <Dasboard socket={socket} />} />
      <Route path="/chatroom/:id" exact render={() => <Chatroom socket={socket} />} />
    </Switch>
    </BrowserRouter>
  )
}

export default App
