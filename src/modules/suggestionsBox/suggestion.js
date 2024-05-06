import React from 'react'

const Suggestion = ({pos, id, meaning, highlighted, headActions}) => {

    const classes = [ 'option' ]
    if (pos === highlighted){
        classes.push('highlighted')
    }

    return(
        <div
            key={pos}
            className={classes.join(' ')}
            onMouseOver={() => {headActions.setHighlighted(pos)}}
            onMouseDown={() => {headActions.setBlurEnabled(false)}}
            onTouchStart={() => {headActions.setBlurEnabled(false)}}
            onClick={() => {headActions.setJustSelected(pos)}}
        >{meaning}</div>
    )
}

export default Suggestion
