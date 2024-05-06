import {React, useState, useEffect, useRef} from 'react'
import ShowOrMessage from './showOrMessage'
import ShowOrLog from './showOrLog'
import Feedback from './feedback.js'
import config from './config.js'
import PreviousWord from './modules/previousWord.js'

const nextWordsRoute  = '/get_next_words'
const updateWordRoute = '/update_word_priority'


const EngToRus = ({setProgram}) => {

    const inputRef  = useRef(null)
    const buttonRef = useRef(null)
    const {rusovUrl,wordsBatch,serverErrorMessage} = config
    const {requestOptions,apps} = config

    const [ serverError, setServerError ]   = useState(false)
    const [ words, setWords ]               = useState([])
    const [ stats, setStats ]               = useState([])
    const [ meaning, setMeaning ]           = useState([])
    const [ currentWordI, setCurrentWordI ] = useState(0)
    const [ attempts, setAttempts ]         = useState(0)
    const [ userWord, setUserWord ]         = useState('')
    const [ wrongWord, setWrongWord ]       = useState(false)
    const [ wordDone, setWordDone ]         = useState(false)
    const [ inputWord, setInputWord ]       = useState('')
    const [ initialLoad, setInitialLoad ]   = useState(true)

    const updateStats = () => {
        setStats( previousStats => {
            const sessionTotal = previousStats.sessionTotal + 1
            const sessionGood  = previousStats.sessionGood + ( attempts < 2 ? 1 : 0 )
            return {
                ...previousStats,
                sessionTotal,
                sessionGood,
            }
        })
    }

    const sendWordResult = () => {
        const postRequestOptions = {
            method: 'POST',
			headers : { 'Content-Type': 'application/json' },
            mode : 'no-cors',
            credentials : 'include',
            body : JSON.stringify({
                wrongs  : attempts,
                wordId  : words[currentWordI].id,
                program : apps.englishToRussian
            })
        }
        fetch(rusovUrl + updateWordRoute, postRequestOptions)
            .then(response => response )
            .then(data => {
                    if (data.status !== 0){
                    }
                })
            .catch( () => setServerError(true) )
    }

    const resetValues = () => {
        setInputWord('')
        setUserWord('')
        setWordDone(false)
        setAttempts(0)
        if (inputRef != null){
            inputRef.current.disabled = false
            inputRef.current.focus()
        }
    }

    const moveToNextWord = () => {
        updateStats()
        if (currentWordI < wordsBatch-1){
            setCurrentWordI(previousWord => previousWord+1)
            setAttempts(0)
        }
        else {
            requestWords()
        }
        inputRef.current.focus()
        resetValues()
    }

    const checkWord = () => {
        if (attempts === 2 || wordDone){
            moveToNextWord()
            return
        }
        else{
            setAttempts(previousAttempts => previousAttempts+1)
            if (inputWord === words[currentWordI].word){
                setWordDone(true)
                wordCorrect()
                buttonRef.current.focus()
            }
        }
        setUserWord(inputWord)
    }

    const handleKeyUp = (event) => {
        if (inputWord !== '' && event.keyCode === 13){
            checkWord()
        }
    }

    const handleChange = (event) => {
        if (wrongWord){
            setWrongWord(false)
        }
        setInputWord(event.target.value)
    }

    const requestWords = () => {
        fetch(rusovUrl + nextWordsRoute + '/' + apps.englishToRussian, requestOptions)
            .then( response => response.json() )
            .then( response => {
                setWords(response.words)
                setStats(response.stats)
                setCurrentWordI(0)
                resetValues()
            })
            .catch( () => setServerError(true) )
    }

    const wordCorrect = () => {
        sendWordResult()
        setWordDone(true)
        inputRef.current.disabled = true
    }

    useEffect(() => {
        if (inputRef.current != null){
            inputRef.current.focus()
        }
        requestWords()
    }, [])

    useEffect(() => {
        if (words.length > 0){
            setMeaning( words[currentWordI].meaning.map( meaning => <div>{meaning}</div> ) )
        }
    }, [words, currentWordI])

    useEffect(() => {
        if (attempts === 2 && inputWord !== words[currentWordI].word) {
            console.log('word incorrect')
            sendWordResult()
            // inputRef.current.disabled = true
        }
        else if (attempts === 1 && inputWord !== words[currentWordI].word){
            console.log('try again')
        }
    }, [attempts])

    useEffect(() => {
        if (initialLoad){
            setInitialLoad(false)
        }
    })

    return (
        <ShowOrLog off={!initialLoad}>
            <ShowOrMessage show={!serverError} message={serverErrorMessage}>
                <div className="content">
                    <div className="word">{ 
                        words.length === 0 
                            ? 'Loading...'
                            : meaning
                    }
                    </div>
                    <div className="stats">
                        <div>{ stats.total }<br />learned</div>
                        <div>{ stats.sessionTotal }<br />answered now</div>
                        <div>{ stats.sessionGood }<br />good</div>
                    </div>
                    <div className="action">
                        <div>
                            <div className="selector">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputWord}
                                    onChange={handleChange}
                                    onKeyUp={handleKeyUp}
                                />
                            </div>
                            <Feedback
                                currentWord={words[currentWordI]?.word}
                                userWord={userWord}
                                attempts={attempts}
                            />
                            { /* previousWord !== null && <PreviousWord
                                    app={apps.russianToEnglish}
                                    word={previousWord.word}
                                    option={previousWord.meaning}
                                    state={previousState}
                            /> */}
                        </div>
                        <div>
                            <div ref={buttonRef} onClick={checkWord} className="go button">
                                Go
                            </div>
                        </div>
                    </div>
                </div>
            </ShowOrMessage>
        </ShowOrLog>
    )
}
export default EngToRus

