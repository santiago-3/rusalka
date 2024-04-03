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
            <div className="definition flex-center">{definition.join(' - ')}</div>
            <div className="flex-between">
                <div className="word flex-center">{russianWord}</div>
                <div className={['state', 'flex-center', stateClass].join(' ')}>{state}</div>
            </div>
        </div>
    )
}

export default PreviousWord
