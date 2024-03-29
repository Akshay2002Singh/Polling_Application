import React from 'react'

function Alertmsg(props) {
    if(props.msg)
    return (
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>{props.msg}</strong>
            <button type="button" class="btn-close" aria-label="Close" onClick={() => props.setMsg("")}></button>
        </div>
    )
}

export default Alertmsg