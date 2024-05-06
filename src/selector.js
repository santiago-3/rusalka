import { React, useState, useEffect } from 'react'
import ShowOrLoading from './showOrLoading.js'
import config from './config.js'
import PreviousWord from './modules/previousWord.js'

const Selector = ({app}) => {

    const getWordsUrl   = 'get_next_selection_words'
    const sendResultUrl = 'update_word_priority'
    const { rusovUrl, requestOptions, states } = config

    const [word, setWord]                     = useState({})
    const [state_, setState_]                 = useState(states.WAITING)
    const [ stats, setStats ]                 = useState([])
    const [loading, setLoading]               = useState(true)
    const [options, setOptions]               = useState([])
    const [message, setMessage]               = useState(<></>)
    const [mistakes, setMistakes]             = useState(0)
    const [selectedWordId, setSelectedWordId] = useState(0)
    const [optionsDisplay, setOptionsDisplay] = useState(<></>)
    const [previousWord, setPreviousWord]     = useState(null)
    const [previousOption, setPreviousOption] = useState('')
    const [previousState, setPreviousState]   = useState(null)

    function requestWords(){
        setLoading(true)
        requestOptions.method = 'GET'
        requestOptions.body = null
        fetch(`${rusovUrl}/${getWordsUrl}/${app}`, requestOptions)
            .then ( response => response.json() )
            .then ( response => {
                setWord(response.word)
                setOptions(response.options)
                setStats(response.stats)
            })
    }

    const handleClick = () => {
        if (selectedWordId === word.id){
            setMessage(<div className="message good">Good!</div>)
            updateWordState('good')
            setState_(states.HAPPINES)
        }
        else{
            setMessage(<div className="message wrong">Wrong!</div>)
            updateWordState('bad')
            setState_( currentState => currentState + 1 )
        }
    }

    const sendResult = () => {
        requestOptions.method = 'POST'
        requestOptions.body   = JSON.stringify({
            app,
            wordId:word.id,
            wrongs:mistakes,
            program:app
        })
        fetch(`${rusovUrl}/${sendResultUrl}`, requestOptions)
            .then ( response => response.json() )
            .then ( response => {
                reset()
            })
    }

    const updateWordState = newState => {
        setOptions( oldOptions => oldOptions.map(option => {
            if (option.id === selectedWordId){
                option.state = newState
            }
            return option
        }))
    }

    const reset = () => {
        const pw = word.word
        const po = options.find(option => option.id == word.id).word
        console.log('pw', pw)
        console.log('po', po)
        setPreviousWord(word.word)
        setPreviousOption(options.find(option => option.id == word.id).word)
        setPreviousState(state_)
        setState_(states.WAITING)
        setMessage(<></>)
        setSelectedWordId(0)
        setMistakes(0)
        setOptionsDisplay([])
        requestWords()
    }

    useEffect(()=>{
        requestWords()
    }, [])

    useEffect(() => {
        let alreadySelected = options.some( option => { 
            return option.state !== 'clean' && option.id === selectedWordId 
        })
        if (selectedWordId > 0 && !alreadySelected){
            handleClick()
        }
    }, [selectedWordId])

    useEffect( () => {
        if (state_ < states.HAPPINES){
            setMistakes(state_)
        }
        else{
            sendResult()
        }
    }, [state_]) 

    useEffect(() => {
        if (mistakes === states.PANIC){
            sendResult()
            setOptions( options.filter( option => { 
                return option.state !== 'clean'
                    || option.id === word.id
            }))
        }
    }, [mistakes])

    useEffect( () => {
        setOptionsDisplay( options.map( option => {
            const definition = typeof option.word == 'object'
                           ? option.word.join(' / ')
                           : option.word

            return <div
                        key={option.id}
                        className={['option',option.state].join(' ')}
                        onClick={() => setSelectedWordId(option.id)}
                   >
                       <div className="display">{definition}</div>
                        { definition.length > 46 && <div class="tooltip">{definition}</div> }
                   </div>
                    
                   
        }))
    }, [options])

    useEffect( () => {
        if (optionsDisplay.length > 0){
            setLoading(false)
        }
    }, [optionsDisplay])

    return (
        <ShowOrLoading loading={loading}>
            <div className="word">
                {   
                    typeof word.word == 'object'
                        ? word.word.join(' / ')
                        : word.word
                }
            </div>
            <div className="stats flex-between">
                <div>{ stats.total }<br />learned</div>
                <div>{ stats.sessionTotal }<br />answered now</div>
                <div>{ stats.sessionGood }<br />good</div>
            </div>
            <div className="action">
                <div>
                    <div className="selector">
                        select an option >
                    </div>
                    { /*<Feedback
                        currentWord={words[currentWordI]?.word}
                        userWord={userWord}
                        attempts={attempts}
                    /> */}
                    { previousWord !== null && <PreviousWord
                            word={previousWord.word}
                            option={previousWord.meaning}
                            state={previousState}
                    /> }
                </div>
            </div>
            <div>
                <div class="go">
                    { /* options */ }
                </div>
            </div>
        </ShowOrLoading>
    )
}

export default Selector
