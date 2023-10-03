import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import Alertmsg from './Alertmsg'
import MainHeading from './MainHeading'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'

function Card(props) {
  const option_list = props.question.options.map((data, index) => {
    if (props.question.user_answer) {
      if (props.question.user_answer === data.o_id) {
        return (
          <>
            <li class="list-group-item" key={index}>
              <input class="form-check-input me-1" type="radio" name={props.question.q_id} value="" id={data.o_id} disabled checked />
              <label class="form-check-label w-auto" for={data.o_id}>{data.option}</label>
            </li>
          </>
        )
      } else {
        return (
          <>
            <li class="list-group-item" key={index}>
              <input class="form-check-input me-1" type="radio" name={props.question.q_id} value="" id={data.o_id} disabled />
              <label class="form-check-label w-auto" for={data.o_id}>{data.option}</label>
            </li>
          </>
        )
      }

    }

    return (
      <>
        <li class="list-group-item" key={index}>
          <input class="form-check-input me-1" type="radio" name={props.question.q_id} value="" id={data.o_id} onClick={() => props.handle_input_click(props.question_index, props.question.q_id, data.o_id)} />
          <label class="form-check-label w-auto" for={data.o_id}>{data.option}</label>
        </li>
      </>
    )
  })

  return (
    <div class="d-flex justify-content-center">
      <ul class="list-group col-md-6 pt-4">
        <li class="list-group-item">
          <div>{props.question.question}</div>
          <ul class="list-group">
            {option_list}
          </ul>
        </li>
        <li class="list-group-item">

        </li>
      </ul>
    </div>
  )
}

function Home(props) {
  const backend_url = process.env.REACT_APP_BACKEND_URL
  const [msg, setMsg] = useState("")
  const [answered_question, setAnswered_question] = useState([])
  const [unanswered_question, setUnanswered_question] = useState([])
  const cookies = new Cookies(null, { path: '/' });
  const Navigate = useNavigate()
  // let all_polls_data = {
  //   "status": "question got successfully",
  //   "answered_question": [
  //     {
  //       "q_id": 14,
  //       "question": "In which year you are",
  //       "options": [
  //         {
  //           "o_id": 7,
  //           "option": "1"
  //         },
  //         {
  //           "o_id": 8,
  //           "option": "2"
  //         },
  //         {
  //           "o_id": 9,
  //           "option": "3"
  //         },
  //         {
  //           "o_id": 10,
  //           "option": "4"
  //         }
  //       ],
  //       "user_answer": 9
  //     }
  //   ],
  //   "unanswered_question": [
  //     {
  //       "q_id": 12,
  //       "question": "This is my poll question",
  //       "options": [
  //         {
  //           "o_id": 1,
  //           "option": "option A"
  //         },
  //         {
  //           "o_id": 2,
  //           "option": "option B"
  //         },
  //         {
  //           "o_id": 3,
  //           "option": "option C"
  //         }
  //       ]
  //     },
  //     {
  //       "q_id": 13,
  //       "question": "This is my another poll question",
  //       "options": [
  //         {
  //           "o_id": 4,
  //           "option": "option A"
  //         },
  //         {
  //           "o_id": 5,
  //           "option": "option B"
  //         },
  //         {
  //           "o_id": 6,
  //           "option": "option C"
  //         }
  //       ]
  //     }
  //   ]
  // }
  useEffect(() => {
    if (!cookies.get('localcsrftoken')) {
      // Navigate("/login");
    }
    async function fetchdata() {
      const response = await fetch(`${backend_url}/apis/get_questions`, {
        method: "GET",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
      }).catch(error => console.log(error))
      const dataobj = await response.json();
      if (dataobj.status === 'Question got successfully') {
        setAnswered_question(dataobj.answered_question)
        setUnanswered_question(dataobj.unanswered_question)
      } else {
        setMsg(dataobj.error)
      }
    }
    fetchdata()
  }, [])


  async function handle_input_click(index, q_id, o_id) {
    // console.log(index, q_id, o_id);
    // add question to answered_questions 
    let temp_question = unanswered_question[index]
    // add users Response to object 
    temp_question.user_answer = o_id;
    setAnswered_question([...answered_question, temp_question])
    // remove answered_question from unanswered_question
    temp_question = unanswered_question
    delete temp_question[index]
    setUnanswered_question(temp_question)

    // submit response to backend
    let data = {
      "q_id": q_id,
      "o_id": o_id
    }
    const response = await fetch(`${backend_url}/apis/submit_response`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": cookies.get('localcsrftoken')
      },
      body: JSON.stringify(data),
    }).catch(error => console.log(error))
    const dataobj = await response.json();
    if (dataobj.status === 'Response not submitted successfully') {
      setMsg(`${dataobj.status}, ${dataobj.error}`)
    }
  }

  const unanswered_question_list = unanswered_question.map((ques, index) => {
    return (
      <Card question={ques} handle_input_click={handle_input_click} question_index={index} />
    )
  })
  const answered_question_list = answered_question.map((ques) => {
    return (
      <Card question={ques} />
    )
  })

  return (
    <>
      <NavBar setCsrftoken={props.setCsrftoken} />
      <Alertmsg msg={msg} setMsg={setMsg} />
      <MainHeading heading={"Today's Polls"} />
      {unanswered_question_list.length <= 0 ? <h1 className='text-center text-warning' style={{ "fontSize": "25px" }}>No polls available to answer</h1> : ""}
      {unanswered_question_list}
      {answered_question_list.length > 0 ? <h1 className='text-center fw-bold pt-4 text-info' style={{ "fontSize": "40px" }}>Answered Polls</h1> : ""}
      {answered_question_list}
    </>
  )
}

export default Home