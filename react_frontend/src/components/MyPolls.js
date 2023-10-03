import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import Alertmsg from './Alertmsg'
import MainHeading from './MainHeading'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'


function Card(props) {
  const option_list = props.question.options.map((data, index) => {
    if(data.poll_count===props.question.max_option_poll && data.poll_count>0){
      return (
        <>
          <li class="list-group-item d-flex justify-content-between flex-wrap text-light bg-secondary" key={index}>
            <label class="w-auto" for={data.o_id}>{data.option}</label>
            <label class="w-auto" for={data.o_id}>{data.poll_count} Votes</label>
          </li>
        </>
      )
    }
    return (
      <>
        <li class="list-group-item d-flex justify-content-between flex-wrap" key={index}>
          <label class="w-auto" for={data.o_id}>{data.option}</label>
          <label class="w-auto" for={data.o_id}>{data.poll_count} Votes</label>
        </li>
      </>
    )
  })

  return (
    <div class="d-flex">
      <ul class="list-group pt-4 question_card">
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

function MyPolls(props) {
  const backend_url = process.env.REACT_APP_BACKEND_URL
  const [msg, setMsg] = useState("")
  const [myquestions, setMyquestions] = useState([])
  const Navigate = useNavigate()
  const cookies = new Cookies(null, { path: '/' });
  // let data = {
  //   "status": "questions found",
  //   "data": [
  //     {
  //       "q_id": 9,
  //       "question": "This is my poll question",
  //       "options": [
  //         {
  //           "o_id": 11,
  //           "option": "1",
  //           "poll_count": 1
  //         },
  //         {
  //           "o_id": 12,
  //           "option": "2",
  //           "poll_count": 0
  //         }
  //       ],
  //       "total_poll": 1
  //     },
  //     {
  //       "q_id": 9,
  //       "question": "This is my poll question another and it is very importanat",
  //       "options": [
  //         {
  //           "o_id": 15,
  //           "option": "A",
  //           "poll_count": 6
  //         },
  //         {
  //           "o_id": 16,
  //           "option": "B",
  //           "poll_count": 10
  //         }
  //       ],
  //       "total_poll": 1
  //     }
  //   ]
  // }

  useEffect(() => {
    if(!cookies.get('localcsrftoken')){
      Navigate("/login");
    }
    async function fetchdata() {
      const response = await fetch(`${backend_url}/apis/my_questions`, {
        method: "GET",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
      }).catch(error => console.log(error))
      const dataobj = await response.json();
      if(dataobj.status ===  'Questions found'){
        setMyquestions(dataobj.data);
        console.log(dataobj)
      }else{
        setMsg(`${dataobj.status}, ${dataobj.error}`)
      }
    }
    fetchdata()
  }, [])
  

  const question_list = myquestions.map((ele) => {
    return (
      <Card question={ele} />
    )
  })

  return (
    <>
      <NavBar setCsrftoken={props.setCsrftoken} />
      <Alertmsg msg={msg} setMsg={setMsg} />
      <MainHeading heading="My Polls" />
      <div className='poll-container'>
        {question_list}
      </div>
    </>
  )
}

export default MyPolls