import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';

function NavBar(props) {
    const backend_url = 'http://127.0.0.1:8000'
    const Navigate = useNavigate()
    const cookies = new Cookies(null, { path: '/' });
    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch(`${backend_url}/apis/signout`, {
            method: "GET",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        }).catch(error => {
            console.log(error);
            return
        })
        const dataobj = await response.json();
        // console.log(dataobj)
        if (dataobj.status === 'Logout successfull') {
            cookies.remove('localcsrftoken')
            Navigate("/login");
        }
    }

    return (
        <>
        <nav class="navbar navbar-dark bg-dark navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <Link class="navbar-brand" to="/">Navbar</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <Link class="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link active" aria-current="page" to="/createPoll">Create Poll</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link active" aria-current="page" to="/myPolls">My Polls</Link>
                        </li>
                        
                    </ul>
                    <form class="d-flex" role="search" onSubmit={handleSubmit}>
                        <button class="btn btn-outline-success" type="submit">Logout</button>
                    </form>
                </div>
            </div>
        </nav>
        </>
    )
}

export default NavBar