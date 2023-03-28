import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
import Sheet from '@mui/joy/Sheet'
import Typography from '@mui/joy/Typography'
import FormControl from '@mui/joy/FormControl'
import FormLabel from '@mui/joy/FormLabel'
import Input from '@mui/joy/Input'
import Button from '@mui/joy/Button'
import Link from '@mui/joy/Link'

function Signup({ newUser }) {
    const [errors, setErrors] = useState([])
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [image, setImage] = useState('')
    const history = useHistory()

    const formHandler = (e) => {
        e.preventDefault()
        const user = {
            first_name: firstName,
            last_name: lastName,
            username: username,
            password: password,
            image: image
        }
        fetch('/users', {
            method: 'POST',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(user)
        })
        .then(resp => {
            if(resp.ok) {
                resp.json().then(user => {
                    newUser(user)
                    setFirstName('')
                    setLastName('')
                    setUsername('')
                    setPassword('')
                    setImage('')
                    history.push('/dashboard')
                })
            } else {
                resp.json().then(json => setErrors(json.errors))
            }
        })
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
                    <b>Welcome to Club Flatiron!</b>
                </Typography>
                <Typography level="body2">Please create an account to continue.</Typography>
            </div>
                <form onSubmit={formHandler}>
                <FormControl>
                    <FormLabel>First Name</FormLabel>
                    <Input
                        variant="plain"
                        type="text"
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}/> 
                </FormControl>
                <FormControl>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                        variant="plain"
                        type="text"
                        onChange={e => setLastName(e.target.value)}
                        value={lastName}/> 
                </FormControl>
                <FormControl>
                    <FormLabel>Username</FormLabel>
                    <Input
                        variant="plain"
                        type="text"
                        onChange={e => setUsername(e.target.value)}
                        value={username}/> 
                </FormControl>
                <FormControl>
                    <FormLabel >Password: </FormLabel>
                    <Input
                        variant="plain"
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}/> 
                </FormControl>
                <FormControl>
                    <FormLabel>Profile Image URL</FormLabel>
                    <Input
                        variant="plain"
                        type="text"
                        onChange={e => setImage(e.target.value)}
                        value={image}/> 
                </FormControl>
                <Button type='submit' sx={{ mt: 1 }}>Sign up</Button>
                <Typography fontSize="sm">{errors? <div>{errors}</div>:null}</Typography>
                </form>
                <Typography
                    endDecorator={<Link href="/login">Log in</Link>}
                    fontSize="sm"
                    sx={{ alignSelf: 'center' }}
                >
                    Already have an account?
                </Typography>
        </Sheet>
    )
}

export default Signup