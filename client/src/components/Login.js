import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import Container from '@mui/material/Container'
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

        <Container sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <h1>Login</h1>
            <Container sx={{ padding: 3}}>
                <form onSubmit={onSubmit}>
                    <Box
                        sx={{
                            marginTop: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <label>Username</label>
                        <input type='text' name='username' value={username} onChange={handleChange} />
                        <label>Password</label>
                        <input type='text' name='password' value={password} onChange={handleChange} />
                        <Button variant='contained' type='submit' value='Log In'>Log In</Button>
                    </Box>
                </form>
                {errors ? <div>{errors}</div> : null}
            </Container>
            <Button variant="outlined"><a href='/signup'>Sign Up</a></Button>
        </Container>
    )
}

export default Login;