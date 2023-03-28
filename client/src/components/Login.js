import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import Sheet from '@mui/joy/Sheet'
import Typography from '@mui/joy/Typography'
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'
import Button from '@mui/joy/Button'
import Link from '@mui/joy/Link'

function Login({ updateUser }) {
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
        <Sheet
        sx={{
            width: 300,
            mx: 'auto', // margin left & right
            my: 13, // margin top & botom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',
          }}
          variant="outlined"> 
            <div>
                <Typography level="h4" component="h1">
                    <b>Welcome back!</b>
                </Typography>
                <Typography level="body2">Please log in to continue.</Typography>
            </div>
                <form onSubmit={onSubmit}>
                <FormControl>
                    <FormLabel>Username</FormLabel>
                    <Input
                        variant="plain"
                        name="username"
                        type="text"
                        value={username}
                        onChange={handleChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input
                        variant="plain"
                        name="password"
                        type="password"
                        value={password}
                        onChange={handleChange}
                    />
                </FormControl>
                <Button type="submit">Log in</Button>
                <Typography fontSize="sm">{errors? <div>{errors}</div>:null}</Typography>
                </form>
                <Typography
                    endDecorator={<Link href="/signup">Sign up</Link>}
                    fontSize="sm"
                    sx={{ alignSelf: 'center' }}
                >
                    Don't have an account?
                </Typography>
        </Sheet>
    )
}

export default Login