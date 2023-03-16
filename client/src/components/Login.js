import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

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
                    history.push('/')
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
        <div className="p-4"> 
            <form className='flex flex-col' onSubmit={onSubmit}>
                <label className='text-white'>
                Username
                </label>
                <input type='text' name='username' value={username} onChange={handleChange} />
            
                <label className='text-white'>
                Password
                </label>
                <input type='password' name='password' value={password} onChange={handleChange} />
                    
                <input className='border w-[150px] text-white' type='submit' value='Log in!' />
            </form>
            {errors? <div>{errors}</div>:null}
        </div>
    )
}

export default Login;