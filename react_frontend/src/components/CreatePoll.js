import React, { useState } from 'react'
import NavBar from './NavBar'



function CreatePoll() {
    const backend_url = 'http://127.0.0.1:8000'
    const [inputOptions, setInputOptions] = useState({
        1: "",
        2: ""
    })
    function handleInput(e) {
        setInputOptions({
            ...inputOptions,
            [e.target.name]: e.target.value
        })
        console.log(inputOptions)
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
            "question" : document.getElementById("ques").value,
            "options" : Object.values(inputOptions)
        }
        const response = await fetch(`${backend_url}/apis/create_question`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        }).catch(error => console.log(error))
        const dataobj = await response.json();
        if (data.status === 'question created successfully') {
            // setMsg("Data Submitted")
        }else{
            
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
            <NavBar />
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