import React, { useState } from 'react'
import "../css/signup.css"

function Signup({newUser, setCurrentUser}) {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [image, setImage] = useState('')

    const formHandler = (e) => {
        e.preventDefault();
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

        .then(r => r.json())
        .then(aNewUser => {
            newUser(aNewUser)
            setFirstName('')
            setLastName('')
            setUsername('')
            setPassword('')
            setImage('')
        })
    }

    return (
        <div className="signup-container">
            <h2 className='h2'>Sign up for an account</h2>
            <div className="signup-form-container">
                <form className="signup-form" onSubmit={formHandler}>
                    <label>First Name: </label>
                        <input type="text" onChange={e => setFirstName(e.target.value)} value={firstName}/> 
                        <br/><br/>
                    <label>Last Name: </label>
                        <input type="text" onChange={e => setLastName(e.target.value)} value={lastName}/> 
                        <br/><br/>
                    <label>Username: </label>
                        <input type="text" onChange={e => setUsername(e.target.value)} value={username}/> 
                        <br/><br/>
                    <label>Password: </label>
                        <input type="password" onChange={e => setPassword(e.target.value)} value={password}/> 
                        <br/><br/>
                    <label>Profile Pic URL: </label>
                        <input type="text" onChange={e => setImage(e.target.value)} value={image}/> 
                        <br/><br/>
                    <input type='submit' value='Sign up' />
                </form>
            </div>
        </div>
    )
}

export default Signup