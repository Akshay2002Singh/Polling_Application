import React from 'react'

function LoginUser() {
    return (
        <div className="form-container">
            <p className="title">Login</p>
            <form className="form">
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
            <p className="signup">Don't have an account? <a href="#" className="">Sign up</a>
            </p>
        </div>
    )
}

export default LoginUser