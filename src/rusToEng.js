import {React, useState, useEffect, useRef} from 'react'
import ShowOrMessage from './showOrMessage'
import ShowOrLog from './showOrLog'
import Feedback from './feedbackRte.js'
import SuggestionsBox from './modules/suggestionsBox/mod.js'
import config from './config.js'
import PreviousWord from './modules/previousWord.js'

const nextWordsRoute  = '/get_next_words'
const updateWordRoute = '/update_word_priority'

const RusToEng = ({setProgram}) => {

    // setProgram("Russian to English")
    const inputRef  = useRef(null)

    const {rusovUrl,serverErrorMessage} = config
    const {requestOptions,apps, states} = config 

    const [ word, setWord ]                 = useState('')
    const [ words, setWords ]               = useState([])
    const [ stats, setStats ]               = useState([])
    const [ chosen, setChosen ]             = useState(0)
    const [ attempts, setAttempts ]         = useState(0)
    const [ selected, setSelected ]         = useState(0)
    const [ searchWord, setSearchWord ]     = useState()
    const [ serverError, setServerError ]   = useState(false)
    const [ currentWordI, setCurrentWordI ] = useState(0)
    const [ initialLoad, setInitialLoad ]   = useState(true)

    const [ previousWord, setPreviousWord ]   = useState(null)
    const [ previousState, setPreviousState ] = useState()

    const loadWords = () => {
        fetch(rusovUrl + nextWordsRoute + '/' + apps.russianToEnglish, requestOptions)
            .then( response => response.json() )
            .then( response => {
                setWords(response.words)
                setStats(response.stats)
                setCurrentWordI(0)
            })
            .catch( () => setServerError(true) )
    }

    const updateStats = () => {
        setStats( previousStats => {
            const sessionTotal = previousStats.sessionTotal + 1
            const sessionGood = previousStats.sessionGood + ( attempts < 3 ? 1 : 0 )
            return {
                ...previousStats,
                sessionTotal,
                sessionGood,
            }
        })
    }

    useEffect( () => {
        const handleClick = () => {
            setChosen(selected)
            setAttempts(previousAttempts => previousAttempts + 1)
        }
        if (selected !== 0) {
            handleClick()
        }
    }, [selected])

    const sendWordResult = wrongs => {
        const postRequestOptions = {
            method      : 'POST',
			headers     : { 'Content-Type': 'application/json' },
            mode        : 'no-cors',
            credentials : 'include',
            body : JSON.stringify({
                wrongs  : wrongs,
                wordId  : words[currentWordI].id,
                program : apps.russianToEnglish
            })
        }
        fetch(rusovUrl + updateWordRoute, postRequestOptions)
            .then(response => {
                // response.json()
            })
            .then(response => {
            })
            .catch( () => setServerError(true) )
    }

    useEffect( () => {
        loadWords()
        if (inputRef.current != null){
            inputRef.current.focus()
        }
    }, [])

    useEffect( () => {
        if (words && words.length > 0){
            if (currentWordI < words.length){
                setWord(words[currentWordI].word)
            }
            else{
                loadWords()
            }
        }
    }, [words,currentWordI])

    useEffect(() => {
        setSelected(0)
        setChosen(0)
        setSearchWord('')        
        if(inputRef.current != null){
            inputRef.current.focus()
        }
    }, [word])

    useEffect( () => {
        if (attempts > 0){
            let wrongs = attempts
            if( chosen == words[currentWordI].id ){
                wrongs--
            }
            if (attempts === 2 || attempts-1 === wrongs){
                sendWordResult(wrongs)

                // finish current word and show next
                updateStats()
                setAttempts(0)
                setPreviousWord(words[currentWordI])
                setCurrentWordI(previousWordI => previousWordI+1)
                setPreviousState(
                    attempts == 2
                        ?  wrongs == 1
                            ? states.CRITICAL
                            : states.PANIC
                        : states.HAPPINES
                )
            }
        }
    }, [attempts])

    useEffect(() => {
        if (initialLoad){
            setInitialLoad(false)
        }
    })

    let currentWordId = -1;
    let currentDef = ''
    if (words && words.length > 0 && currentWordI < words.length){
        currentWordId = words[currentWordI].id
        currentDef = words[currentWordI].meaning.reduce((accum, value) => {
            accum += ' ' + value
        })
    }

    return (
        <ShowOrLog off={!initialLoad} >
            <ShowOrMessage show={!serverError} message={serverErrorMessage}>
                <div className="content">
                    <div className="word">{word}</div>
                    <div className="stats flex-between">
                        <div>{ stats.total }<br />learned</div>
                        <div>{ stats.sessionTotal }<br />answered now</div>
                        <div>{ stats.sessionGood }<br />good</div>
                    </div>
                    <SuggestionsBox
                        inputRef={inputRef}
                        targetUrl={ `${rusovUrl}/search` }
                        setSelected={setSelected}
                        setSearchWord={setSearchWord}
                        searchWord={searchWord}
                    >
                        <>
                            <Feedback
                                currentDef={currentDef}
                                currentWordId={currentWordId}
                                userWordId={chosen}
                                attempts={attempts}
                            />
                            { previousWord !== null && <PreviousWord
                                    app={apps.russianToEnglish}
                                    word={previousWord.word}
                                    option={previousWord.meaning}
                                    state={previousState}
                            /> }
                        </>
                    </SuggestionsBox>
                </div>
            </ShowOrMessage>
        </ShowOrLog>
    )

}

export default RusToEng
