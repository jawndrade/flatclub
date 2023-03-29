import React, { useState } from 'react'
import Button from '@mui/material/Button'

function NewPostForm ({currentUser, setPosts, clubId}) {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        const newPost = {
            title: title,
            body: body,
            user_id: currentUser.id,
            club_id: clubId
        }
        
        fetch("/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPost),
        })
        .then(resp => {
            if(resp.status === 201) {
                fetch("/posts")
                .then((resp) => resp.json())
                .then((data) => setPosts(data))
                window.location.reload()
            } else {
                resp.json().then((errorData)=> alert(errorData.errors))
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Title:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <br />
            <label>
                Body:
                <textarea value={body} onChange={(e) => setBody(e.target.value)} />
            </label>
            <br />
            <Button type="submit" variant="outlined" sx={{ color: 'white' }}>Add Post</Button>
        </form>
    )
}

export default NewPostForm