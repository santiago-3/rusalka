import config from '../config.js'

const { apps, states } = config

const PreviousWord = ({app,word,option,state}) => {
    let russianWord
    let definition
    let stateClass
    if (app == apps.selectEnglishToRussian || app.englishToRussian) {
        console.log('coso 1')
        russianWord = option
        definition = Array.isArray(word) ? word.join(' / ') : word
    }
    else {
        console.log('coso 2')
        russianWord = word
        definition = Array.isArray(option) ? option.join(' / ') : option
    }
    switch (state) {
        case states.PANIC    : stateClass = 'bad';    break
        case states.CRITICAL : stateClass = 'fine'; break
        case states.HAPPINES : stateClass = 'good'; break
    }
    return (
        <div title={`${russianWord} > ${definition}`} className={['previous', stateClass].join(' ')}>
            <div>
                <div className="title">previous word</div>
                <div className="word">{russianWord}</div>
            </div>
            <div>
                <div className="title">answer</div>
                <div className="answer">{definition}</div>
            </div>
        </div>
    )
}

export default PreviousWord
