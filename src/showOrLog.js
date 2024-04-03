import { React, useState, useEffect } from 'react'
import Login from './login.js'
import config from './config.js'

const ShowOrLog = ({off,setIsLoggedOnParent,children}) => {

    const [loading, setLoading] = useState(true)
    const [logged, setLogged] = useState(false)
    const { rusovUrl, requestOptions } = config

    if (!off){
        fetch(`${rusovUrl}/is_logged`, requestOptions)
            .then( response =>  response.json() )
            .then( response => {
                if (response.status.code === 20){
                    setLogged(true)
                }
                setLoading(false)
            })
    }

    useEffect( () => {
        if (setIsLoggedOnParent){
            setIsLoggedOnParent(logged)
        }
    }, [logged])

    if (!loading){
        if (logged || off){ 
            return <>{children}</>
        }
        else{
            return <><Login /></>
        }
    }
    return <div>Loading...</div>
}

export default ShowOrLog
