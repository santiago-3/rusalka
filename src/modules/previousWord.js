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
        case states.PANIC    : stateClass = 'bad';    break
        case states.CRITICAL : stateClass = 'fine'; break
        case states.HAPPINES : stateClass = 'good'; break
    }
    return (
        <div className={['previous', stateClass].join(' ')}>
            <div>
                <div className="title">previous word</div>
                <div className="word">{russianWord}</div>
            </div>
            <div>
                <div className="title">answer</div>
                <div className="answer">{definition.join(' / ')}</div>
            </div>
        </div>
    )
}

export default PreviousWord
