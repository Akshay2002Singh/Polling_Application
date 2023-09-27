import React from 'react'

function SignupUser() {
    return (
        <div class="form-container">
            <p class="title">Login</p>
            <form class="form">
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
            <p class="signup">Already have an account? <a href="#" class="">Sign in</a>
            </p>
        </div>
    )
}

export default SignupUser