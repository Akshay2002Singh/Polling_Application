import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alertmsg from './Alertmsg'

function SignupUser() {
    const backend_url = 'http://127.0.0.1:8000'
    const Navigate = useNavigate()
    const [msg, setMsg] = useState("")

    async function handleSubmit(e) {
        e.preventDefault();
        // dummy_data = {
        //     "name" : "akshay",
        //     "email" : "tempx@gmail.com",
        //     "username" : "akshay",
        //     "password" : "7905363750"
        //   }
        let data = {
            "name": document.getElementById("name").value,
            "email": document.getElementById("email").value,
            "username": document.getElementById("username").value,
            "password": document.getElementById("password").value
        }
        const response = await fetch(`${backend_url}/apis/signup`, {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        }).catch(error => console.log(error))
        const dataobj = await response.json();
        if (dataobj.status === 'Signup successfull') {
            Navigate("/login");
        } else {
            setMsg(dataobj.error);
        }
    }

    return (
        <>
            <Alertmsg mst={msg} setMsg={setMsg} />
            <div class="form-container">
                <p class="title">Create Account</p>
                <form class="form" onSubmit={handleSubmit}>
                    <div class="input-group">
                        <label for="name">Name</label>
                        <input type="text" name="name" id="name" placeholder="Enter Your Name" />
                    </div>
                    <div class="input-group">
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="Enter Your Email" />
                    </div>
                    <div class="input-group">
                        <label for="username">Username</label>
                        <input type="text" name="username" id="username" placeholder="Enter Your Username" />
                    </div>
                    <div class="input-group">
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" placeholder="Your Password" />
                    </div>
                    <button class="sign">Sign up</button>
                </form>
                <p class="signup">Already have an account? <Link to="/login" class="">Sign in</Link>
                </p>
            </div>
        </>
    )
}

export default SignupUser