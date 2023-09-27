import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'

function Card(props) {
  const option_list = props.question.options.map((data, index) => {
    if (props.question.user_answer) {
      if(props.question.user_answer === data.o_id){
        return (
          <>
            <li class="list-group-item" key={index}>
              <input class="form-check-input me-1" type="radio" name={props.question.q_id} value="" id={data.o_id} disabled checked />
              <label class="form-check-label w-auto" for={data.o_id}>{data.option}</label>
            </li>
          </>
        )
      }else{
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
          <input class="form-check-input me-1" type="radio" name={props.question.q_id} value="" id={data.o_id} onClick={()=>props.handle_input_click(props.question_index,props.question.q_id,data.o_id)}/>
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

function Home() {
  let data = {
    "status": "question got successfully",
    "answered_question": [
      {
        "q_id": 14,
        "question": "In which year you are",
        "options": [
          {
            "o_id": 7,
            "option": "1"
          },
          {
            "o_id": 8,
            "option": "2"
          },
          {
            "o_id": 9,
            "option": "3"
          },
          {
            "o_id": 10,
            "option": "4"
          }
        ],
        "user_answer": 9
      }
    ],
    "unanswered_question": [
      {
        "q_id": 12,
        "question": "This is my poll question",
        "options": [
          {
            "o_id": 1,
            "option": "option A"
          },
          {
            "o_id": 2,
            "option": "option B"
          },
          {
            "o_id": 3,
            "option": "option C"
          }
        ]
      },
      {
        "q_id": 13,
        "question": "This is my another poll question",
        "options": [
          {
            "o_id": 4,
            "option": "option A"
          },
          {
            "o_id": 5,
            "option": "option B"
          },
          {
            "o_id": 6,
            "option": "option C"
          }
        ]
      }
    ]
  }
  if (data.status === 'question got successfully') {

  } else {

  }
  const [answered_question, setAnswered_question] = useState(data.answered_question)
  const [unanswered_question, setUnanswered_question] = useState(data.unanswered_question)

  function handle_input_click(index,q_id,o_id){
    console.log(index, q_id, o_id);
    // add question to answered_questions 
    let temp_question = unanswered_question[index]
    // add users Response to object 
    temp_question.user_answer = o_id;
    setAnswered_question([...answered_question,temp_question])
    // remove answered_question from unanswered_question
    temp_question = unanswered_question
    delete temp_question[index]
    setUnanswered_question(temp_question)
  }

  const unanswered_question_list = unanswered_question.map((ques,index) => {
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
      <NavBar />
      {unanswered_question_list}
      {answered_question_list}
    </>
  )
}

export default Home