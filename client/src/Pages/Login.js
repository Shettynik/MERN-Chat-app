import axios from 'axios';
import React from 'react';
import { withRouter } from 'react-router';

const Login = (props) => {
    const emailRef = React.createRef();
    const passwordRef = React.createRef();

    const loginUser = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        await axios.post("http://localhost:8000/user/login", {email, password})
        .then((data) => {
            console.log(data.data.token)
            localStorage.setItem("CC_token", data.data.token);
            props.history.push("/dashboard");
            props.setUpSocket();
        })
        .catch((error) => {
            console.log(error)
        })
    }
    return (
        <div className="card">
            <div className="cardHeader">Login</div>
            <div className="cardBody">
                <div className="inputGroup">
                    <label htmlFor="email">Email</label>
                    <input type="email" required="true" name="email" id="email" ref={emailRef} />
                </div>
                <div className="inputGroup">
                    <label htmlFor="password">Password</label>
                    <input type="password" required="true" name="password" id="password" ref={passwordRef} />
                </div>
                <button onClick={(e) => {loginUser(e)}}>Login</button>
            </div>
        </div>
    )
}

export default withRouter(Login);
