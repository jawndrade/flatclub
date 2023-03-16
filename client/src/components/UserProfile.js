import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

function UserProfile({currentUser, onDeleteUser, onEditUserProfile}) {

    const [editFormOpen, setEditFormOpen] = useState(false)
    const [profilePic, setProfilePic] = useState()
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
            .then(res => res.json())
            .then(() => {
                onEditUserProfile(formData) 
                history.push("/profile")
                window.location.reload()
            })
    }

    const editForm = (
        <form className='edit-profile-form' onSubmit={handleEditFormSubmit}>
            <input type="text" placeholder="first name" name="first_name" value={first_name} onChange={handleFormData}/>
            <br />
            <input type="text" placeholder="last name" name="last_name" value={last_name} onChange={handleFormData}/>
            <br />
            <input type='text' placeholder="username" name="username" value={username} onChange={handleFormData}/>
            <br />
            <input type='password' placeholder="password" name="password" value={password} onChange={handleFormData}/>
            <br />
            <input type="text" placeholder="profile pic" name="image" value={image} onChange={handleFormData}/>
            <br />
            <button type="button" className="cancel-button" onClick={() => setEditFormOpen(false)}>Cancel</button>
            <button type="submit">Save</button>
        </form>
    )

    const editButton = <button onClick={()=> setEditFormOpen(true)}>Edit</button>

    const {id} = currentUser

    async function deleteAccount() {
        let user_id = currentUser.id

        await fetch("/logout", {
            method: "DELETE",
            mode:"cors",
            headers: {
            "Content-Type": "application/json"
            }
        })

        if (user_id) {
            fetch(`users/${user_id}`,
            { method: 'DELETE'})
            .then(() => onDeleteUser(id))
            alert("Your account has successfully been deactivated.")
        }

        history.push("/posts")
        window.location.reload();
    }
        if(!currentUser) {history.push("/posts")}
        return (
            <div className="max-w-max mx-auto">
                <div className='basic-box'>
                    {/* <input type="text" placeholder="Enter new image URL here" name="photo" id="profilePicInput" /> */}
                    <label htmlFor="profileImageInput" className='max-w-max mx-auto'>
                        <div className="profile-image" role="button" title="Click to edit photo">
                            <img src={currentUser.image} alt="profile" />
                        </div>
                    </label>

                    <div className="profile-info">
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
