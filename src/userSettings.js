import {React, useState, useEffect} from 'react'
import config from './config.js'
import ShowOrLog from './showOrLog'

const UserSettings = () => {

    const statsUrl = 'get_user_settings'
    const {rusovUrl, requestOptions}    = config
    const [isLogged,setIsLogged]        = useState(false)
    const [goodNumbers, setGoodNumbers] = useState({
        etr: 0, rte: 0, setr: 0, srte: 0
    })

    const getStats = () => {
        requestOptions.method = 'GET'
        fetch(`${rusovUrl}/${statsUrl}`, requestOptions)
            .then( response => response.json() )
            .then( response => {
                setGoodNumbers(response.goodNumbers)
            })
    }

    useEffect(() => {
        if (isLogged){
            getStats()
        }
    }, [isLogged])

    return (
        <ShowOrLog setIsLoggedOnParent={setIsLogged}>
            <div>
                <div>English to russian: {goodNumbers?.etr}</div>
                <div>Russian to english: {goodNumbers?.rte}</div>
                <div>Select english to russian: {goodNumbers?.setr}</div>
                <div>Select russian to english: {goodNumbers?.srte}</div>
            </div>
        </ShowOrLog>
    )
}

export default UserSettings
