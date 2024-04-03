import React from 'react'

const ShowOrMessage = ({show, message, children}) => {
    return (
        <>
            {show ? children : <p>{message}</p> }
        </>
    )
}

export default ShowOrMessage
