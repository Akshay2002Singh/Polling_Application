import React from 'react'

function MainHeading(props) {
  return (
    <h1 className='text-center fw-bold py-2 text-black' style={{"fontSize":"60px"}}>{props.heading}</h1>
  )
}

export default MainHeading