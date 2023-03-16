import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'

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
        .then(res => {
            if(res.ok){
                res.json().then(user => {
                    updateUser(user)
                    history.push('/profile')
                })
            } else {
                res.json().then(json => setErrors(json.errors))
            }
        })
    }

    function handleChange(e){
        const {name, value} = e.target
        setFormData({...formData, [name]: value})
    }

    return (
        <div id="login-container"> 
            <div id="login-bg">
                <form onSubmit={onSubmit}>
                    <label >
                    Username
                    </label>
                    <input type='text' name='username' value={username} onChange={handleChange} />
                
                    <label className='text-white'>
                    Password
                    </label>
                    <input type='password' name='password' value={password} onChange={handleChange} />
                        
                    <input type='submit' value='Log in!' />
                </form>
                {errors? <div>{errors}</div>:null}
            </div>
        </div>
    )
}

export default Login;