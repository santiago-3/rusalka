import config from '../config.js'

const { apps, states } = config

const PreviousWord = ({app,word,option,state}) => {
    let russianWord
    let definition
    let stateClass
    if (app == apps.selectEnglishToRussian) {
        russianWord = option
        definition = word
    }
    else {
        russianWord = word
        definition = option
    }
    switch (state) {
        case states.PANIC    : stateClass = 'wrong';    break
        case states.CRITICAL : stateClass = 'twotries'; break
        case states.HAPPINES : stateClass = 'ok'; break
    }
    return (
        <div className="previous-word">
            <div className={['state', stateClass].join(' ')}>{russianWord}</div> {definition.join(' / ')}
        </div>
    )
}

export default PreviousWord
