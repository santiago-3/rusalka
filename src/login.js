import { useState, useRef, useEffect } from 'react'
import config from './config.js'

const Login = () => {

    const [error, setError]                 = useState(<></>)
    const [username, setUsername]           = useState('')
    const [password, setPassword]           = useState('')
    const [buttonEnabled, setButtonEnabled] = useState('')

    const { requestOptions, rusovUrl, enums } = config

    const handleChange = e => {
        switch (e.target.name) {
            case 'username' : setUsername(e.target.value); break
            case 'password' : setPassword(e.target.value); break
            default         : break;
        }
    }

    const usernameRef = useRef(null)

    const handleSend = e => {
        console.log('send!')
        e.preventDefault()
        requestOptions.method = 'POST'
        requestOptions.body   = JSON.stringify({ username, password })
        fetch(`${rusovUrl}/login`, requestOptions)
            .then( response => response.json() )
            .then( response => {
                if (response.status.code == enums.appStatus.logged){
                    window.location = "/"
                }
                else{
                    setError(<div>Username or password incorrect</div>)
                }
            })
    }

    useEffect(() => {
        usernameRef.current.focus()
    }, [])

    useEffect(() => {
        if (password.length > 5 && username.length > 0){
            setButtonEnabled(true)
        }
        else{
            setButtonEnabled(false)
        }
    }, [username, password])

    return (
        <form className="login-form vertical-flex">
            <input
                type="text"
                name="username"
                value={username}
                placeholder="username"
                onChange={handleChange}
                ref={usernameRef}
            />
            <input
                type="password"
                name="password"
                value={password}
                placeholder="password"
                onChange={handleChange}
            />
            <button
                onClick={handleSend}
                disabled={!buttonEnabled}
            >Login</button>
            {error}
        </form>
    )
}

export default Login
