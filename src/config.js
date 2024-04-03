const config = {
    rusovUrl : "http://localhost:7000",
    wordsBatch : 10,
    serverErrorMessage :  "Error connecting to server",
    requestOptions : { mode: 'cors', credentials : 'include' },
    apps : {
        englishToRussian       : 1,
        russianToEnglish       : 2,
        selectEnglishToRussian : 3,
        selectRussianToEnglish : 4
    },
    enums : {
        appStatus : {
            notLogged : 10,
            logged    : 20
        }
    },
    states : {
        WAITING  : 0, // nothing happened yet
        CRITICAL : 1, // user committed one mistake
        PANIC    : 2, // user committed two mistakes and lost
        HAPPINES : 3  // user selected the right word
    }
}

export default config
