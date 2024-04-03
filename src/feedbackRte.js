import React from 'react'

const Feedback = ({currentDef,currentWordId,userWordId,attempts}) => {
    const attemptSwitch = {
        0 : <span>&nbsp;</span>,
        1 : <span className="try-again">Try again!</span>,
        2 : <span className="word-reveak">{currentDef}</span>
    }
    let feedback
    if (currentWordId == userWordId){
        feedback = <span className="goodWord">Good!</span>
    }
    else{
        feedback = attemptSwitch[attempts]
    }
    return <div className="feedback">{feedback}</div>
}

export default Feedback

