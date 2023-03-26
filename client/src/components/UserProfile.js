import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import '../css/userprofile.css'

function UserProfile({currentUser, onDeleteUser, onEditUserProfile}) {

    const [editFormOpen, setEditFormOpen] = useState(false)
    const history = useHistory()

    const initialFormValues = {
        first_name: currentUser.first_name,
        last_name:currentUser.last_name,
        username:currentUser.username,
        password:currentUser.password,
        image: currentUser.image
    }

    const [ formData, setFormData] = useState(initialFormValues)
    const { first_name, last_name, username, password, image } = formData

    const handleFormData = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    async function handleEditFormSubmit(e) {
        e.preventDefault()
        setEditFormOpen(false)

        const editProfile = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }

    await fetch(`users/${currentUser.id}`, editProfile)
            .then(resp => resp.json())
            .then(() => {
                onEditUserProfile(formData) 
                history.push("/profile")
                window.location.reload()
            })
    }

    const editForm = (
        <form className='edit-profile-form' onSubmit={handleEditFormSubmit}>
            <input type="text" placeholder="First Name" name="first_name" value={first_name} onChange={handleFormData}/>
            <br />
            <input type="text" placeholder="Last Name" name="last_name" value={last_name} onChange={handleFormData}/>
            <br />
            <input type='text' placeholder="Username" name="username" value={username} onChange={handleFormData}/>
            <br />
            <input type="text" placeholder="Profile Image URL" name="image" value={image} onChange={handleFormData}/>
            <br />
            <input required type='Password' placeholder="Password" name="password" value={password} onChange={handleFormData}/>
            <br />
            <button type="button" className="cancel-button" onClick={() => setEditFormOpen(false)}>Cancel</button>
            <button type="submit">Save</button>
        </form>
    )

    const editButton = <button onClick={()=> setEditFormOpen(true)}>Edit Profile</button>

    const {id} = currentUser

    async function deleteAccount() {
        let user_id = currentUser.id

        if (user_id) {
            await fetch(`users/${user_id}`,
            { method: 'DELETE'})
            .then((resp) => {
                resp.json().then(resp=>console.log(resp))
                onDeleteUser(id)
                alert("Your account has successfully been deactivated.")
            })
        }
        history.push("/login")
        window.location.reload()
    }
        if(!currentUser) {history.push("/posts")}

        return (
            <div>
                <div className='container'>
                    {/* <input type="text" placeholder="Enter new image URL here" name="photo" id="profilePicInput" /> */}
                    <label htmlFor="profileImageInput" className='max-w-max mx-auto'>
                        <div className="profile-image" role="button" title="Click to edit photo">
                            <img src={currentUser.image} alt="profile" />
                        </div>
                    </label>

                    <div>
                        <p className="name">{currentUser.first_name} {currentUser.last_name}</p>
                        <p className="username">@{currentUser.username}</p>
                        {editFormOpen ? editForm : editButton}
                        <button className="cancel-button" onClick={deleteAccount}> Deactivate </button>
                    </div>
                </div>
            </div>
        )
}

export default UserProfile
