import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import "../css/login.css"

function Login({updateUser}) {
    const [formData, setFormData] = useState({
        username:'',
        password:''
    })
    const [errors, setErrors] = useState([])
    const history = useHistory()
    const {username, password} = formData

    function onSubmit(e){
        e.preventDefault()
        const user = {
            username,
            password
        }

        fetch('/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        })
        .then(resp => {
            if(resp.ok){
                resp.json().then(user => {
                    updateUser(user)
                    history.push('/dashboard')
                })
            } else {
                resp.json().then(json => setErrors(json.errors))
            }
        })
    }

    function handleChange(e){
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }

    return (
        <div className="login-container"> 
        <h1 className="h2">Welcome to ClubFlatiron</h1>
            <div className="login-form-container">
                <form className="login-form" onSubmit={onSubmit}>
                    <label for="username">Username: </label>
                    <input type='text' name='username' value={username} onChange={handleChange} />
                    <br/><br/>
                    <label for="password">Password: </label>
                    <input type='password' name='password' value={password} onChange={handleChange} />
                    <br/><br/>
                    {/* <input type='submit' value='Log in' /> */}
                    <button type="submit">Log in</button>
                </form>
                {errors? <div>{errors}</div>:null}
            </div>
        </div>
    )
}

export default Login