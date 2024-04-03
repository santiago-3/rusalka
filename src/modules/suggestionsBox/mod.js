import {React, useState, useEffect, useRef} from 'react'
import SuggestionsList from './suggestionsList.js' 
import config from '../../config.js'

let fire = 0

const SuggestionsBox = (props) => {

    const {inputRef,targetUrl,word}              = props
    const {setSelected,setSearchWord,searchWord} = props
    const {requestOptions}                       = config

    const DISPLAY_MAX = 10

    const maxLettersAccum = 3
    const requestDelay    = 300

    const [ loading, setLoading ]                 = useState(false)
    const [ highlighted, setHighlighted ]         = useState(0)
    const [ suggestions, setSuggestions ]         = useState([])
    const [ blurEnabled, setBlurEnabled ]         = useState(true) 
    const [ justSelected, setJustSelected ]       = useState(-1)
    const [ actionsAccum, setActionsAccum ]       = useState(0)
    const [ nextRequestId, setNextRequestId ]     = useState(1)
    const [ pendingRequest, setPendingRequest ]   = useState(false)
    const [ hideSuggestions, setHideSuggestions ] = useState(false)

    const searchWordRef   = useRef( searchWord )
    searchWordRef.current = searchWord

    const nextRequestIdRef   = useRef( nextRequestId )
    nextRequestIdRef.current = nextRequestId

    const handleChange = (event) => {
        setSearchWord(event.target.value)
    }

    const handleKeyDown = (event) => {
        event.stopPropagation()
        let nextHighlighted = highlighted

        switch(event.keyCode){
            case 13 : setJustSelected(highlighted); break;
            case 38 : nextHighlighted--; break;
            case 40 : nextHighlighted++; break;
        }

        if (nextHighlighted < 0){
            nextHighlighted += DISPLAY_MAX
        }
        else if (nextHighlighted >= DISPLAY_MAX){
            nextHighlighted -= DISPLAY_MAX
        }
        setHighlighted(nextHighlighted)
    }

    const newRequest = () => {
        setLoading(true)
        let timeoutId = setTimeout(() => {
            sendRequest()
        }, requestDelay)
    }

    const sendRequest = () => {
        setHighlighted(0)
        setActionsAccum(0)

        const encodedSearchWord = encodeURIComponent(searchWordRef.current)

        setPendingRequest(true)
        fetch( `${targetUrl}/${encodedSearchWord}/${nextRequestId}`, requestOptions)
            .then( response => response.json() )
            .then( response => {
                setLoading(false)
                setPendingRequest(false)
                if (Number(response.requestId) === nextRequestId){
                    setSuggestions(response.result)
                }
            })
        .catch( err => {
            setPendingRequest(false)
        })

        setNextRequestId( previousRequesId => previousRequesId+1 )
    }

    useEffect(() => {
        if (suggestions.length > 0){
            if (justSelected > -1){
                setSelected(suggestions[justSelected].id)
                setSearchWord(suggestions[highlighted].meaning)
                setSuggestions([])
                setBlurEnabled(true)
            }
        }
        else{
            // show message stating thing
        }
    }, [justSelected])

    useEffect(() => {
        if (justSelected < 0){
            if (searchWord && searchWord != ''){
                setActionsAccum( prevActionsAccum => prevActionsAccum+1 )
            }
            else{
                setLoading(false)
                setSuggestions([])
            }
        }
        setJustSelected(-1)
    }, [searchWord])

    useEffect(() => {
        if (actionsAccum === maxLettersAccum){
            sendRequest()
        }
        else if (actionsAccum === 1){
            newRequest()
        }
    }, [actionsAccum])

    return(
        <>
            <input
                ref={inputRef}
                type="text"
                value={searchWord}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onBlur={() => {blurEnabled && setHideSuggestions(true)} }
                onFocus={() => {setHideSuggestions(false)} }
            />
            <div className='suggestions-list-container'>
                <SuggestionsList 
                    hideSuggestions={hideSuggestions}
                    list={suggestions}
                    displayMax={DISPLAY_MAX}
                    highlighted={highlighted}
                    pendingRequest={pendingRequest}
                    headActions={{ setHighlighted, setJustSelected, setBlurEnabled }}
                    loading={loading}
                />
            </div>
        </>
    )

}

export default SuggestionsBox
