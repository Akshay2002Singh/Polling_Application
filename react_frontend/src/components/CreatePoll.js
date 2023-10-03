import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import Alertmsg from './Alertmsg'
import MainHeading from './MainHeading'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'


function CreatePoll(props) {
    const backend_url = process.env.REACT_APP_BACKEND_URL
    const [msg, setMsg] = useState("")
    const cookies = new Cookies(null, { path: '/' });
    const [inputOptions, setInputOptions] = useState({
        1: "",
        2: ""
    })
    const Navigate = useNavigate()
    useEffect(() => {
        if(!cookies.get('localcsrftoken')){
            Navigate("/login");
          }
    }, [])
    
  
    function handleInput(e) {
        setInputOptions({
            ...inputOptions,
            [e.target.name]: e.target.value
        })
        // console.log(inputOptions)
    }
    function handleAddOptions() {
        setInputOptions({
            ...inputOptions,
            [Object.keys(inputOptions).length + 1]: ""
        })
    }
    
    async function handleSubmit(e) {
        e.preventDefault();
        // dummy_data = {
        //     "question": "This is my poll question",
        //     "options": ["option A", "option B", "option C"]
        // }
        let data = {
            "question": document.getElementById("ques").value,
            "options": Object.values(inputOptions)
        }
        const response = await fetch(`${backend_url}/apis/create_question`, {
            method: "POST",
            mode:'cors',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken" : cookies.get('localcsrftoken')
            },
            body: JSON.stringify(data),
        }).catch(error => console.log(error))
        const dataobj = await response.json();
        // console.log(dataobj)
        if (dataobj.status === 'Question created successfully') {
            setMsg("Question created")
            document.getElementById("ques").value = ""
            setInputOptions({
                1: "",
                2: ""
            })
        } else {
            setMsg(`${dataobj.status}, ${dataobj.error}`)
        }
    }

    const optionList = Object.keys(inputOptions).map((value) => {
        const temp = value - '0'
        return (
            <div class="mb-3">
                <label for={value} class="form-label">Option {temp}</label>
                <input type="text" class="form-control" id={temp} name={temp} value={inputOptions[temp]} onChange={handleInput} required />
            </div>
        )
    })


    return (
        <>
            <NavBar setCsrftoken={props.setCsrftoken} />
            <Alertmsg msg={msg} setMsg={setMsg} />
            <MainHeading heading={"Create Poll"} />
            <div id='poll_container'>
                <form method="POST" id="poll_form" onSubmit={handleSubmit}>
                    <div class="mb-3">
                        <label for="ques" class="form-label">Question</label>
                        <input type="text" class="form-control" id="ques" name="ques" required />
                    </div>
                    <div id='options_container'>
                        {optionList}
                    </div>
                    <div class="d-flex justify-content-end" id="add">
                        <button type="button" class="btn btn-info" onClick={handleAddOptions}>Add Option +</button>
                    </div>
                    <button type="submit" class="btn btn-primary" id="submit_btn">Create poll</button>
                </form>
            </div>
        </>
    )
}

export default CreatePoll