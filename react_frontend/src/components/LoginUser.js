import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie';
import Alertmsg from './Alertmsg'

function LoginUser(props) {
    const backend_url = process.env.REACT_APP_BACKEND_URL
    const Navigate = useNavigate()
    const [msg, setMsg] = useState("")
    const cookies = new Cookies(null, { path: '/' });
    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
      );
    async function fetchdata() {
        const response = await fetch(`${backend_url}/apis/get_token`, {
          method: "GET",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json"
          },
        }).catch(error => console.log(error))
        const dataobj = await response.json();
        cookies.set('localcsrftoken', dataobj.cookies.csrftoken,{"maxAge" : 31449600});
      }
    async function handleSubmit(e) {
        e.preventDefault();
        // dummy_data = {
        //     "username": "elite",
        //     "password": "7905363750"
        // }
        let data = {
            "username": document.getElementById("username").value,
            "password": document.getElementById("password").value
        }
        const response = await fetch(`${backend_url}/apis/signin`, {
            method: "POST",
            credentials: "include",
            mode : 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        }).catch(error => {
            Alertmsg(error);
            console.log(error);
            return
        })
        const dataobj = await response.json();
        if (dataobj.status === 'Login successfull') {
            fetchdata()
            await delay(500);
            Navigate("/");
        } else {
            setMsg(dataobj.error);
        }
    }

    return (
        <>
        <Alertmsg msg={msg} setMsg={setMsg} />
        <div className="form-container">
            <p className="title">Login</p>
            <form className="form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label for="username">Username</label>
                    <input type="text" name="username" id="username" placeholder="Your Username" />
                </div>
                <div className="input-group">
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="Your Password" />
                </div>
                <button className="sign">Sign in</button>
            </form>
            <p className="signup">Don't have an account? <Link to="/signup" className="">Sign up</Link>
            </p>
        </div>
        </>
    )
}

export default LoginUser