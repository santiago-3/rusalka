import {React, useState} from 'react'
import Suggestion from './suggestion.js'
        
const SuggestionsList = (props) => {

    const {
        list,displayMax,highlighted,
        hideSuggestions,headActions,loading
    } = props

    if (loading){
        return (
            <div className="suggestions-list">
                <div className="suggestion">
					<div className="lds-ellipsis">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
				</div>
            </div>
        )
    }
    else if (list.length > 0 && !hideSuggestions){
        let displayList = null
        displayList = list.slice(0,displayMax).map( (suggestion, index) => {
            return(
                <Suggestion 
                    key={index}
                    highlighted={highlighted}
                    headActions={headActions}
                    {...suggestion}
                />
            )
        })
        return <div className="suggestions-list">{displayList}</div>
    }
    return ''

}

export default SuggestionsList
