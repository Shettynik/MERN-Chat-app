import axios from 'axios';
import React from 'react';

const Register = ({history}) => {
    const nameRef = React.createRef();
    const emailRef = React.createRef();
    const passwordRef = React.createRef();

    const registerUser = async (e) => {
        e.preventDefault();
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        await axios.post("/user/register", {name, email, password})
        .then((data) => {
            console.log(data)
            history.push("/login")
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className="card">
            <div className="cardHeader">Register</div>
            <div className="cardBody">
                <div className="inputGroup">
                    <label htmlFor="name">Name</label>
                    <input type="text" required="true" name="name" id="name" ref={nameRef} />
                </div>
                <div className="inputGroup">
                    <label htmlFor="email">Email</label>
                    <input type="email" required="true" name="email" id="email" ref={emailRef} />
                </div>
                <div className="inputGroup">
                    <label htmlFor="password">Password</label>
                    <input type="password" required="true" name="password" id="password" ref={passwordRef} />
                </div>
                <button onClick={(e) => registerUser(e)}>Register</button>
            </div>
        </div>
    )
}

export default Register
